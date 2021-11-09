export async function ipOrDomainToLocation(
  ipOrDomain: string
): Promise<IPLocation> {
  const result = await fetch(
    `https://ipwhois.app/json/${ipOrDomain}?lang=en`
  ).then((res) => res.json());

  if (result?.error) {
    throw new Error(result.reason);
  }

  if (!result?.latitude || !result?.longitude) {
    throw new Error(`No location data for IP ${ipOrDomain}`);
  }

  return {
    city: result.city,
    country: result.country,
    latitude: result.latitude,
    longitude: result.longitude,
  };
}

export interface IPLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}
