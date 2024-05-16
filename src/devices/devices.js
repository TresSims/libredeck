import { discover } from "loupedeck";

export const getDevice = async () => {
  try {
    let device = await discover();
    console.log(device);
    return device;
  } catch (e) {
    console.log(e);
    setTimeout(getDevice, 3000);
  }
};
