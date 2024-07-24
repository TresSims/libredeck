const { contextBridge, ipcRenderer } = require("electron");

// Context Bridge for Device Api
contextBridge.exposeInMainWorld("deviceAPI", {
  getDevices: () => ipcRenderer.invoke("getDevices"),
  connect: (device_index) => ipcRenderer.send("connect", device_index),
  loadProgram: (program) => ipcRenderer.send("loadProgram", program),
  // getDevice: (device) => ipcRenderer.invoke("getDevice", device),
});
