import { discover } from "loupedeck";

export const getDevices = async () => {
  try {
    const devices = await discover();
    return devices;
  } catch (e) {
    return "Error!";
  }
};

// device is a loupdeck device to apply the program to
// program is a filepath to a node module that exports 'setup' and 'preview'
export const loadProgram = async (device, program) => {
  console.log("importing program setup...");
  await device.connect();
  import(program + "/index.mjs").then((p) => {
    p.setup(device);
  });
};

export const disconnect = async () => {};
