describe("Main Application Tests", () => {
  it("should print application title", async () => {
    await expect(browser).toHaveTitle("Libredeck");
  });
});
