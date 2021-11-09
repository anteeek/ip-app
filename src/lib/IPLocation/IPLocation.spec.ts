import { translateIPToLocation } from "./IPLocation";

describe("IP location service", () => {
  it("Should match 8.8.8.8 with Mountain View, California", async () => {
    const result = await translateIPToLocation("8.8.8.8");

    expect(result.city).toEqual("Mountain View");
    expect(result.country).toEqual("United States");
  });
});
