// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge } = require("electron");
import { getDevice } from "./devices/devices.js";

contextBridge.exposeInMainWorld("deviceAPI", {
  getDevice: getDevice,
});
