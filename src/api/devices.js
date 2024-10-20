import * as ALL_DEVICES from "loupedeck";
const { ipcMain } = require("electron");

// filter modules in loupedeck to a list of device types
const deviceTypes = Object.values(ALL_DEVICES).filter((d) => d.productId);
export var devices = [];
export var device = -1;

// Set Up IPC Hooks
export const setupIPC = () => {
  ipcMain.handle("findDevices", findDevices);
  ipcMain.handle("listDevices", listDevices);
  ipcMain.handle("setDevice", (event, index) => setDevice(index));
  ipcMain.handle("connect", connect);
  ipcMain.handle("loadProgram", (event, program) => loadProgram(program));
  ipcMain.handle("disconnect", disconnect);
};

// Get all connected devices
export const findDevices = async () => {
  const connectedDevices = await ALL_DEVICES.LoupedeckDevice.list();

  // Get connected types of supported devices
  const types = connectedDevices.reduce(
    (acc, d) => ({
      ...acc,
      [d.productId]: deviceTypes.find((dev) => dev.productId === d.productId),
    }),
    {},
  );

  // convert device serial connections to device objects and return without connecting
  devices = connectedDevices
    .filter(({ productId }) => types[productId])
    .map(
      ({ productId, ...args }) =>
        new types[productId]({ ...args, autoConnect: false }),
    );

  if (device < 0 || device > devices.length) {
    setDevice(0);
  }
  return { result: "Success" };
};

// Get name and port of each device
export const listDevices = () => {
  var device_info_list = devices.map((device) => getDeviceInfo(device));
  var device_info = { current_device: device, devices: device_info_list };
  return device_info;
};

// Get inforamtion about a specific device by index
const getDeviceInfo = (d) => {
  var device_info = [d.type, d.path];
  return device_info;
};

// Set device
export const setDevice = (d) => {
  if (d < devices.length) {
    device = d;
    return { result: "Success" };
  } else {
    return { result: "No device " + d };
  }
};

// connect to the device and load a default program
export const connect = async () => {
  const retries = 3;

  if (device < 0 || device > devices.length) {
    return { result: "No Device" + device };
  }

  let new_connection_device = devices[device];
  let success = false;
  let tries = 0;
  while (!success && tries <= retries) {
    await new_connection_device.close();
    await Promise.race([
      new_connection_device.connect(),
      new Promise((_r, rej) => setTimeout(rej, 3000)),
    ])
      .then(() => {
        success = true;
      })
      .catch(() => {
        tries += 1;
      });
  }

  // Load Simple Program
  if (success) {
    await loadProgram("../../examples/simple/", device);
    return { result: "Success" };
  } else {
    return { result: "Could not connect to device " + device };
  }
};

// Load a program on a device
export const loadProgram = async (program, index) => {
  console.log("importing program setup...");
  // #TODO: Check if device is connected

  let new_program_device = devices[index];
  import(program + "/index.mjs").then((p) => {
    p.setup(new_program_device);
  });
};

export const disconnect = async () => {
  await loadProgram("../../examples/empty/", device);
  devices[device].close();
};
