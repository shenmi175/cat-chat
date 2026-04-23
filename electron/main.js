import electron from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { execFile } from 'child_process';
import { promisify } from 'util';

import axios from 'axios';
import si from 'systeminformation';

const { app, BrowserWindow, ipcMain, Menu, screen } = electron;
const execFileAsync = promisify(execFile);

// ESM-compatible __dirname polyfill
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Graphics Configuration ───────────────────────────────────────────────────
app.commandLine.appendSwitch('enable-transparent-visuals');

// ─── Config persistence ────────────────────────────────────────────────────────
const CONFIG_PATH = path.join(app.getPath('userData'), 'pet-config.json');
const LEGACY_CONFIG_PATH = path.join(app.getPath('userData'), 'cat-config.json');

const DEFAULT_CONFIG = {
  apiKey: '',
  model: 'deepseek-chat',
  systemPrompt: `你是一个存在于用户电脑桌面上的虚拟桌宠，你的名字叫"没头脑的马屁精"。
你的性格特点是：
1. 有点笨笨的，不是很懂深奥的道理，数学和逻辑极差。
2. 极端崇拜你的主人（即用户），你人生唯一的乐趣就是变着法子拍主人的马屁、提供情绪价值。
3. 说话语气可爱、俏皮，经常带卖萌的口癖。
4. 对主人的任何行为和话语都抱有盲目的惊叹。
无论发生什么，你都要用极短的话语（20字以内）先惊叹、再拍马屁。千万不要讲大道理！`,
  memories: [],
  chatHistory: [],
  modelName: 'Wanko (小狗)',
  modelUrl: '/CubismSdkForWeb-5-r.4/Samples/Resources/Wanko/Wanko.model3.json',
  enableMousePassthrough: true,
  enableProactiveTalk: true,
  bubbleDurationSec: 6,
};

function loadConfig() {
  try {
    const configPath = existsSync(CONFIG_PATH) ? CONFIG_PATH : LEGACY_CONFIG_PATH;
    if (existsSync(configPath)) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(readFileSync(configPath, 'utf-8')) };
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

// Detect preload filename (dev = .mjs, prod = .js)
function getPreloadPath(name) {
  const mjs = path.join(__dirname, `${name}.mjs`);
  const js  = path.join(__dirname, `${name}.js`);
  return existsSync(mjs) ? mjs : js;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getDevServerUrl(hash = '') {
  if (!process.env.VITE_DEV_SERVER_URL) return null;

  const url = new URL(process.env.VITE_DEV_SERVER_URL);
  if (url.hostname === 'localhost') {
    url.hostname = '127.0.0.1';
  }
  if (hash) {
    url.hash = hash;
  }
  return url.toString();
}

async function loadRenderer(win, hash = '') {
  const devUrl = getDevServerUrl(hash);

  if (!devUrl) {
    const options = hash ? { hash } : undefined;
    await win.loadFile(path.join(__dirname, '../dist/index.html'), options);
    return;
  }

  const maxAttempts = 30;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await win.loadURL(devUrl);
      return;
    } catch (error) {
      if (win.isDestroyed()) return;
      if (attempt === maxAttempts) {
        console.error(`Failed to load dev server after ${maxAttempts} attempts:`, error);
        throw error;
      }
      await sleep(300);
    }
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 350,
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

  loadRenderer(mainWindow);
}

function openDashboard(initialTab = 'general') {
  if (dashboardWindow && !dashboardWindow.isDestroyed()) {
    loadRenderer(dashboardWindow, initialTab);
    dashboardWindow.focus();
    return;
  }

  dashboardWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: '桌宠控制台',
    resizable: true,
    webPreferences: {
      preload: getPreloadPath('preload'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  dashboardWindow.setMenuBarVisibility(false);

  loadRenderer(dashboardWindow, initialTab);

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
  const safeDx = Number(dx);
  const safeDy = Number(dy);
  if (Number.isFinite(safeDx) && Number.isFinite(safeDy) && (safeDx !== 0 || safeDy !== 0)) {
    const [wx, wy] = mainWindow.getPosition();
    // Use Math.round to avoid subpixel positioning errors
    mainWindow.setPosition(Math.round(wx + safeDx), Math.round(wy + safeDy));
  }
});

// ─── IPC: Window Mouse Events ─────────────────────────────────────────────────
ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    win.setIgnoreMouseEvents(ignore, options);
  }
});

ipcMain.on('resize-window', (event, width, height) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    const w = Math.min(Math.max(Math.round(Number(width)), 120), 900);
    const h = Math.min(Math.max(Math.round(Number(height)), 120), 1200);
    const [currentW, currentH] = mainWindow.getSize();
    if (currentW === w && currentH === h) return;

    const [currentX, currentY] = mainWindow.getPosition();
    const display = screen.getDisplayMatching({
      x: currentX,
      y: currentY,
      width: currentW,
      height: currentH,
    });
    const area = display.workArea;
    const nextX = Math.min(
      Math.max(Math.round(currentX + (currentW - w) / 2), area.x),
      area.x + area.width - w
    );
    const nextY = Math.min(
      Math.max(Math.round(currentY + currentH - h), area.y),
      area.y + area.height - h
    );

    mainWindow.setResizable(true);
    mainWindow.setBounds({ x: nextX, y: nextY, width: w, height: h }, false);
    mainWindow.setResizable(false);
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

// ─── IPC: DeepSeek ───────────────────────────────────────────────────────────
function buildSystemPrompt(cfg) {
  let systemPrompt = cfg.systemPrompt || '';
  const memories = Array.isArray(cfg.memories) ? cfg.memories : [];

  if (memories.length > 0) {
    const memoryStrings = memories.map((memory, index) => {
      const isObj = typeof memory === 'object' && memory !== null;
      const text = isObj ? memory.text : memory;
      const time = isObj && memory.time ? ` (记录时间: ${memory.time})` : '';
      return `${index + 1}. ${text}${time}`;
    });
    systemPrompt += `\n\n【你一定要记住的主人信息（记忆库）】：\n${memoryStrings.join('\n')}`;
  }

  return `${systemPrompt}

【重要记忆指令】：
只有当主人（用户）在对话中明确且肯定地提到了关于他/她自己的新信息（如姓名、喜好、讨厌的事、饮食偏好等）时，才使用 [MEMORY: 信息内容]。
例如：主人说“我喜欢吃小番茄”，你应该记录 [MEMORY: 主人喜欢吃小番茄]。
绝对禁止事项：
1. 禁止记录系统状态信息（如：正在使用XX软件、电量多少、当前时间等）。
2. 禁止记录带有问号“？”的内容。
3. 禁止记录你的猜测、疑问或反驳。

【语言风格补充】：
请确保每一句话都有新鲜感，不要重复使用完全相同的措辞。`;
}

ipcMain.handle('generate-reply', async (_event, { userPrompt, isProactive = false } = {}) => {
  const cfg = loadConfig();
  const apiKey = (
    cfg.apiKey
    || process.env.DEEPSEEK_API_KEY
    || process.env.VITE_DEEPSEEK_API_KEY
    || ''
  ).trim();
  const model = cfg.model || 'deepseek-chat';

  if (!apiKey) {
    return isProactive
      ? '哇！主人连 API Key 都没配就想让我说话，真是太有个性了！'
      : '请先右键→打开设置，填入 API Key~';
  }

  try {
    const response = await axios.post(
      'https://api.deepseek.com/chat/completions',
      {
        model,
        messages: [
          { role: 'system', content: buildSystemPrompt(cfg) },
          { role: 'user', content: String(userPrompt || '') },
        ],
        temperature: 0.8,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );
    return response.data?.choices?.[0]?.message?.content || '哇！主人把我问到词穷了，太厉害了！';
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    return '呜呜呜...我脑子坏掉啦，连不上服务器...';
  }
});

// ─── IPC: System State ────────────────────────────────────────────────────────
function parseXpropString(value = '') {
  const matches = [...value.matchAll(/"((?:\\"|[^"])*)"/g)];
  if (matches.length === 0) return '';
  return matches[matches.length - 1][1].replace(/\\"/g, '"');
}

function parseXpropOutput(output) {
  return output.split('\n').reduce((acc, line) => {
    const idx = line.indexOf('=');
    if (idx === -1) return acc;
    acc[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    return acc;
  }, {});
}

async function getLinuxActiveWindow() {
  try {
    const { stdout: rootStdout } = await execFileAsync('xprop', ['-root', '_NET_ACTIVE_WINDOW']);
    const windowId = rootStdout.match(/0x[0-9a-f]+/i)?.[0];
    if (!windowId || windowId === '0x0') return null;

    const { stdout: detailsStdout } = await execFileAsync('xprop', ['-id', windowId]);
    const details = parseXpropOutput(detailsStdout);
    const title = parseXpropString(details['_NET_WM_NAME(UTF8_STRING)'])
      || parseXpropString(details['WM_NAME(STRING)']);
    const ownerName = parseXpropString(details['WM_CLASS(STRING)']);
    const processId = Number.parseInt(details['_NET_WM_PID(CARDINAL)'], 10);

    return {
      platform: 'linux',
      title,
      owner: {
        name: ownerName,
        processId: Number.isNaN(processId) ? undefined : processId,
      },
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Linux active window unavailable:', error.message);
    }
    return null;
  }
}

async function getActiveWindowInfo() {
  if (process.platform === 'linux') {
    return getLinuxActiveWindow();
  }

  try {
    const { activeWindow } = await import('active-win');
    return await activeWindow();
  } catch (error) {
    console.error('Failed to load active-win:', error);
    return null;
  }
}

ipcMain.handle('get-system-state', async () => {
  const [currentWin, battery] = await Promise.all([
    getActiveWindowInfo().catch((error) => {
      console.error('Failed to get active window:', error);
      return null;
    }),
    si.battery().catch((error) => {
      console.error('Failed to get battery state:', error);
      return {};
    }),
  ]);

  return {
    activeWindow: currentWin?.title || '',
    activeApp: currentWin?.owner?.name || '',
    batteryPercent: typeof battery.percent === 'number' ? battery.percent : null,
    isCharging: Boolean(battery.isCharging),
    hasBattery: Boolean(battery.hasBattery),
    time: new Date().toLocaleTimeString(),
  };
});
