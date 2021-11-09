import { ipOrDomainToLocation } from "./IPLocation";

describe("IP location service", () => {
  it("Should match 8.8.8.8 with Mountain View, California", async () => {
    const result = await ipOrDomainToLocation("8.8.8.8");

    expect(result.city).toEqual("Mountain View");
    expect(result.country).toEqual("United States");
  });

  it("Should also work for domain names", async () => {
    expect(ipOrDomainToLocation("wikipedia.org")).resolves.not.toThrowError();
  });

  it("Should throw an error on invalid IP address", async () => {
    const invalidIps = ["453.345.345.345", "ddddddddddd"];

    for (const invalidIp in invalidIps) {
      expect(ipOrDomainToLocation(invalidIp)).rejects.toThrowError(
        "Invalid IP Address"
      );
    }
  });
});
