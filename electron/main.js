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
let settingsWindow;
let docWindow;
let historyWindow;
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
    { label: '功能使用文档', click: () => openDocWindow() },
    { label: '查看历史记录', click: () => openHistoryWindow() },
    { label: '打开设置', click: () => openSettingsWindow() },
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
  });
}

function openDocWindow() {
  if (docWindow && !docWindow.isDestroyed()) {
    docWindow.focus();
    return;
  }

  docWindow = new BrowserWindow({
    width: 500,
    height: 600,
    title: '功能文档',
    resizable: true,
    webPreferences: {
      preload: getPreloadPath('preload'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  docWindow.setMenuBarVisibility(false);

  if (process.env.VITE_DEV_SERVER_URL) {
    docWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}#doc`);
  } else {
    docWindow.loadFile(path.join(__dirname, '../dist/index.html'), { hash: 'doc' });
  }

  docWindow.on('closed', () => {
    docWindow = null;
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

ipcMain.on('open-settings', () => openSettingsWindow());

// ─── IPC: Chat History ────────────────────────────────────────────────────────
ipcMain.handle('add-to-history', (_event, msgObj) => {
  const cfg = loadConfig();
  const history = cfg.chatHistory || [];
  
  // msgObj: { text, sender, time }
  const newHistory = [...history, msgObj].slice(-15);
  
  saveConfig({ ...cfg, chatHistory: newHistory });
  return true;
});

ipcMain.on('open-history', () => openHistoryWindow());

function openHistoryWindow() {
  if (historyWindow) {
    historyWindow.focus();
    return;
  }

  historyWindow = new BrowserWindow({
    width: 400,
    height: 600,
    title: '对话历史',
    backgroundColor: '#1a1b26',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });

  const url = isDev ? 'http://localhost:5173/#history' : `file://${path.join(__dirname, '../dist/index.html')}#history`;
  historyWindow.loadURL(url);

  historyWindow.on('closed', () => {
    historyWindow = null;
  });
}

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
