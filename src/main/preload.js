const { contextBridge, ipcRenderer } = require("electron");

// Context Bridge for Device Api
contextBridge.exposeInMainWorld("deviceAPI", {
  findDevices: () => ipcRenderer.invoke("findDevices"),
  listDevices: () => ipcRenderer.invoke("listDevices"),
  setDevice: (device_index) => ipcRenderer.invoke("setDevice", device_index),
  connect: () => ipcRenderer.invoke("connect"),
  loadProgram: (program) => ipcRenderer.invoke("loadProgram", program),
  disconnect: () => ipcRenderer.invoke("disconnect"),
});
