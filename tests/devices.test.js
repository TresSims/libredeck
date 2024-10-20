const { setDevice, connect } = require("../src/api/devices");

describe("Device API Tests", async () => {
  it("Can connect to an already connected device", async () => {
    // Use the default device
    setDevice(0);

    // Connect to a device
    let connection_state = await connect();
    await expect(connection_state).toBe({ result: "Success" });

    // Ensure We are able to re-connect to devices with existing open connections
    connection_state = await connect();
    await expect(connection_state).toBe({ result: "Success" });
  });
});
