"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
  // System
  getSystemState: () => ipcRenderer.invoke("get-system-state"),
  // Drag (Wayland compatible delta mode)
  dragUpdate: (dx, dy) => ipcRenderer.send("drag-update", { dx, dy }),
  // Config
  getConfig: () => ipcRenderer.invoke("get-config"),
  saveConfig: (cfg) => ipcRenderer.invoke("save-config", cfg),
  openSettings: () => ipcRenderer.send("open-settings"),
  // Listen for config updates pushed from main process
  onConfigUpdated: (cb) => ipcRenderer.on("config-updated", (_e, cfg) => cb(cfg))
});
