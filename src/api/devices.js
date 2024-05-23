import * as ALL_DEVICES from "loupedeck";

// filter modules in loupedeck to a list of device types
const deviceTypes = Object.values(ALL_DEVICES).filter((d) => d.productId);

export const getDevices = async () => {
  // Get all connected devices
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
  return connectedDevices
    .filter(({ productId }) => types[productId])
    .map(
      ({ productId, ...args }) =>
        new types[productId]({ ...args, autoConnect: false }),
    );
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
