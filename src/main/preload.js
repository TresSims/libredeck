const { contextBridge, ipcRenderer } = require("electron");

// Context Bridge for Device Api
contextBridge.exposeInMainWorld("deviceAPI", {
  findDevices: () => ipcRenderer.invoke("findDevices"),
  getDevices: () => ipcRenderer.invoke("getDevices"),
  setDevice: (device_index) => ipcRenderer.invoke("setDevice", device_index),
  connect: () => ipcRenderer.invoke("connect", device_index),
  loadProgram: (program) => ipcRenderer.invoke("loadProgram", program),
});
