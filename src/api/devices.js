import { discover } from "loupedeck";

export const getDevices = async () => {
  try {
    const device = await discover();
    return device;
  } catch (e) {
    return "Error!";
  }
};
