import { nativeImage, Tray, Menu, app } from "electron";
import { findWindow } from "./main.js";
const path = require("node:path");

export const setupTray = () => {
  let tray;

  const icon = nativeImage.createFromPath(
    path.join(__dirname, "../../resources/icon_16x.png"),
  );
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: "Open", type: "normal", click: openTrayAction },
    { label: "Quit", type: "normal", click: quitApplicationAction },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip("manage Libredeck application state");
  tray.setTitle("Libredeck");
};

const openTrayAction = () => {
  findWindow();
};

const quitApplicationAction = () => {
  app.quit();
};
