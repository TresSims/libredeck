export const preview = async () => {};

export const setup = async (loupedeck) => {
  const empty_color = "rgba(0, 0, 0, 0)";

  // Clear physical buttons
  loupedeck.buttons.map((idx) => {
    const id = loupedeck.buttons[idx];
    loupedeck.setButtonColor({ id, color: empty_color });
  });

  // Clear touch screen buttons
  for (let i = 0; i < loupedeck.rows * loupedeck.columns; i++) {
    await loupedeck.drawKey(i, (ctx, w, h) => {
      ctx.fillStyle = empty_color;
      ctx.fillRect(0, 0, w, h);
    });
  }

  // Clear displays
  if (loupedeck.displays.left) {
    await loupedeck.drawScreen("left", (ctx, w, h) => {
      ctx.fillStyle = empty_color;
      ctx.fillRect(0, 0, w, h);
    });
  }

  if (loupedeck.displays.right) {
    await loupedeck.drawScreen("right", (ctx, w, h) => {
      ctx.fillStyle = empty_color;
      ctx.fillRect(0, 0, w, h);
    });
  }

  if (loupedeck.displays.knob) {
    await loupedeck.drawScreen("knob", (ctx, w, h) => {
      ctx.fillStyle = empty_color;
      ctx.fillRect(0, 0, w, h);
    });
  }
};
