import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, readFileSync, writeFileSync } from 'fs';

import si from 'systeminformation';
import { activeWindow } from 'active-win';

// ESM-compatible __dirname polyfill
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Graphics Configuration ───────────────────────────────────────────────────
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
  memories: [],
  chatHistory: [],
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
let dashboardWindow; // Unified window for Settings, Doc, History, Sensory
let isDev;

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
      webSecurity: false,
    },
  });

  mainWindow.setAlwaysOnTop(true, 'pop-up-menu');
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  // Right-click context menu
  const ctxMenu = Menu.buildFromTemplate([
    { label: '👁️ 开启感知中心', click: () => openDashboard('sensory') },
    { type: 'separator' },
    { label: '功能使用文档', click: () => openDashboard('doc') },
    { label: '查看历史记录', click: () => openDashboard('history') },
    { label: '打开设置', click: () => openDashboard('general') },
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

function openDashboard(initialTab = 'general') {
  if (dashboardWindow && !dashboardWindow.isDestroyed()) {
    // If already open, just redirect to the tab
    if (process.env.VITE_DEV_SERVER_URL) {
      dashboardWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}#${initialTab}`);
    } else {
      dashboardWindow.loadFile(path.join(__dirname, '../dist/index.html'), { hash: initialTab });
    }
    dashboardWindow.focus();
    return;
  }

  dashboardWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: '猫猫控制台',
    resizable: true,
    webPreferences: {
      preload: getPreloadPath('preload'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  dashboardWindow.setMenuBarVisibility(false);

  if (process.env.VITE_DEV_SERVER_URL) {
    dashboardWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}#${initialTab}`);
  } else {
    dashboardWindow.loadFile(path.join(__dirname, '../dist/index.html'), { hash: initialTab });
  }

  dashboardWindow.on('closed', () => {
    dashboardWindow = null;
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

ipcMain.handle('append-memories', async (_event, newFacts) => {
  const cfg = loadConfig();
  const currentMemories = cfg.memories || [];
  
  const now = new Date();
  const timeStr = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  let addedCount = 0;
  newFacts.forEach(text => {
    // Check for duplicates (case-insensitive and trimmed)
    const exists = currentMemories.some(m => {
      const mText = typeof m === 'object' ? m.text : m;
      return mText.toLowerCase().trim() === text.toLowerCase().trim();
    });
    
    if (!exists) {
      currentMemories.push({ text, time: timeStr });
      addedCount++;
    }
  });
  
  if (addedCount > 0) {
    saveConfig({ ...cfg, memories: currentMemories });
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('config-updated', { ...cfg, memories: currentMemories });
    }
  }
  return addedCount;
});

ipcMain.on('open-settings', () => openDashboard('general'));

// ─── IPC: Chat History ────────────────────────────────────────────────────────
ipcMain.handle('add-to-history', (_event, msgObj) => {
  const cfg = loadConfig();
  const history = cfg.chatHistory || [];
  
  // msgObj: { text, sender, time }
  const newHistory = [...history, msgObj].slice(-15);
  
  const newCfg = { ...cfg, chatHistory: newHistory };
  saveConfig(newCfg);
  
  // Notify all windows (especially History window)
  BrowserWindow.getAllWindows().forEach(win => {
    if (!win.isDestroyed()) {
      win.webContents.send('config-updated', newCfg);
    }
  });
  
  return true;
});

ipcMain.on('open-history', () => openDashboard('history'));

// ─── IPC: System State ────────────────────────────────────────────────────────
ipcMain.handle('get-system-state', async () => {
  try {
    const currentWin = await activeWindow();
    const battery = await si.battery();
    return {
      activeWindow: currentWin ? currentWin.title : '',
      activeApp: currentWin ? currentWin.owner.name : '',
      batteryPercent: battery.percent,
      isCharging: battery.isCharging,
      hasBattery: battery.hasBattery,
      time: new Date().toLocaleTimeString(),
    };
  } catch (error) {
    console.error('Failed to get system state:', error);
    return null;
  }
});
