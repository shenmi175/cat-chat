const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // System
  getSystemState: () => ipcRenderer.invoke('get-system-state'),

  // Drag (Wayland compatible delta mode)
  dragUpdate: (dx, dy) => ipcRenderer.send('drag-update', { dx, dy }),

  // Config
  getConfig:    () => ipcRenderer.invoke('get-config'),
  saveConfig:   (cfg) => ipcRenderer.invoke('save-config', cfg),
  appendMemories: (facts) => ipcRenderer.invoke('append-memories', facts),
  addToHistory:   (msg) => ipcRenderer.invoke('add-to-history', msg),
  openHistory:    () => ipcRenderer.send('open-history'),
  openSettings: () => ipcRenderer.send('open-settings'),

  resizeWindow: (w, h) => ipcRenderer.send('resize-window', w, h),

  setIgnoreMouseEvents: (ignore, options) => ipcRenderer.send('set-ignore-mouse-events', ignore, options),

  // Listen for config updates pushed from main process
  onConfigUpdated: (cb) => {
    const listener = (_e, cfg) => cb(cfg);
    ipcRenderer.on('config-updated', listener);
    return () => ipcRenderer.removeListener('config-updated', listener);
  },
});
