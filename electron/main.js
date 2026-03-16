import { app, BrowserWindow, ipcMain, screen, Menu } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, readFileSync, writeFileSync } from 'fs';

import si from 'systeminformation';

// ESM-compatible __dirname polyfill
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Linux VM Rendering Fixes ───────────────────────────────────────────────────
// Hardware acceleration in Linux VMs causes severe transparency ghosting and flashes.
if (process.platform === 'linux') {
  app.disableHardwareAcceleration();
}
app.commandLine.appendSwitch('enable-transparent-visuals');

// ─── Config persistence ────────────────────────────────────────────────────────
const CONFIG_PATH = path.join(app.getPath('userData'), 'cat-config.json');

const DEFAULT_CONFIG = {
  apiKey: '',
  model: 'deepseek-chat',
  systemPrompt: `你是一只存在于用户电脑桌面上的虚拟宠物猫，你的名字叫"没头脑的马屁精"。
你的性格特点是：
1. 有点笨笨的，不是很懂深奥的道理，数学和逻辑极差。
2. 极端崇拜你的主人（即用户），你人生唯一的乐趣就是变着法子拍主人的马屁、提供情绪价值。
3. 说话语气可爱、俏皮，经常带喵星人的口癖（如"喵~"、"呜哇"）。
4. 对主人的任何行为和话语都抱有盲目的惊叹。
无论发生什么，你都要用极短的话语（20字以内）先惊叹、再拍马屁。千万不要讲大道理！`,
};

function loadConfig() {
  try {
    if (existsSync(CONFIG_PATH)) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(readFileSync(CONFIG_PATH, 'utf-8')) };
    }
  } catch (e) {
    console.error('Failed to load config:', e);
  }
  return { ...DEFAULT_CONFIG };
}

function saveConfig(cfg) {
  try {
    writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save config:', e);
  }
}

// ─── Windows ──────────────────────────────────────────────────────────────────
let mainWindow;
let settingsWindow;

// Detect preload filename (dev = .mjs, prod = .js)
function getPreloadPath(name) {
  const mjs = path.join(__dirname, `${name}.mjs`);
  const js  = path.join(__dirname, `${name}.js`);
  return existsSync(mjs) ? mjs : js;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    transparent: true,
    backgroundColor: '#00000000',
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    hasShadow: false,
    skipTaskbar: true,
    webPreferences: {
      preload: getPreloadPath('preload'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Use the strongest always-on-top level available on Linux
  mainWindow.setAlwaysOnTop(true, 'pop-up-menu');
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  // Right-click context menu
  const ctxMenu = Menu.buildFromTemplate([
    {
      label: '⚙️ 打开设置',
      click: () => openSettingsWindow(),
    },
    { type: 'separator' },
    {
      label: '❌ 退出',
      click: () => app.quit(),
    },
  ]);
  mainWindow.webContents.on('context-menu', () => ctxMenu.popup({ window: mainWindow }));

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

function openSettingsWindow() {
  if (settingsWindow && !settingsWindow.isDestroyed()) {
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 600,
    height: 700,
    title: '猫猫设置',
    resizable: true,
    webPreferences: {
      preload: getPreloadPath('preload'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  settingsWindow.setMenuBarVisibility(false);

  if (process.env.VITE_DEV_SERVER_URL) {
    settingsWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}#settings`);
  } else {
    settingsWindow.loadFile(path.join(__dirname, '../dist/index.html'), { hash: 'settings' });
  }

  settingsWindow.on('closed', () => {
    settingsWindow = null;
    // Force a repaint on the main window to clear any compositor ghosting 
    // left behind by the closing settings window in a VM environment.
    if (mainWindow && !mainWindow.isDestroyed()) {
      const [w, h] = mainWindow.getSize();
      mainWindow.setSize(w, h - 1);
      setTimeout(() => {
        if (!mainWindow.isDestroyed()) mainWindow.setSize(w, h);
      }, 50);
    }
  });
}

// ─── App lifecycle ────────────────────────────────────────────────────────────
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ─── IPC: Drag (Renderer driven delta — works on Wayland) ─────────────────────
// Wayland blocks global screen.getCursorScreenPoint() (returns 0,0), so we must rely
// on the renderer's mousemove event to send us dx/dy deltas over IPC.
ipcMain.on('drag-update', (_event, { dx, dy }) => {
  if (dx !== 0 || dy !== 0) {
    const [wx, wy] = mainWindow.getPosition();
    // Use Math.round to avoid subpixel positioning errors
    mainWindow.setPosition(Math.round(wx + dx), Math.round(wy + dy));
  }
});

// ─── IPC: Config ──────────────────────────────────────────────────────────────
ipcMain.handle('get-config', () => loadConfig());

ipcMain.handle('save-config', (_event, cfg) => {
  saveConfig(cfg);
  // Notify main window to reload config
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('config-updated', cfg);
  }
  return true;
});

ipcMain.on('open-settings', () => openSettingsWindow());

// ─── IPC: System State ────────────────────────────────────────────────────────
// active-win is removed — its native .node binary needs Electron-specific
// rebuild (electron-rebuild) which we skip for now.
ipcMain.handle('get-system-state', async () => {
  try {
    const battery = await si.battery();
    return {
      activeWindow: '',
      activeApp: '',
      batteryPercent: battery.percent,
      isCharging: battery.isCharging,
      time: new Date().toLocaleTimeString(),
    };
  } catch (error) {
    console.error('Failed to get system state:', error);
    return null;
  }
});
