import { discover } from "loupedeck";

export const getDevices = async () => {
  try {
    let device = await discover();
    return device;
  } catch (e) {
    return "Error!";
  }
};
