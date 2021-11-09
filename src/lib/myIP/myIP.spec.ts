import { getMyIP } from "./myIP";

describe("IP location service", () => {
  it("Should return a valid IP address", async () => {
    const result = await getMyIP();

    expect(result).toMatch(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/);
  });
});
