const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("deviceAPI", {
  getDevices: () => ipcRenderer.invoke("getDevices"),
});
