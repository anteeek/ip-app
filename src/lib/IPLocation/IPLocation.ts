export async function translateIPToLocation(
  ipAddress: string
): Promise<IPLocation> {
  const result = await fetch(`https://ipapi.co/${ipAddress}/json`).then((res) =>
    res.json()
  );

  if (result.error) {
    throw new Error(result.reason);
  }

  return {
    city: result.city,
    country: result.country_name,
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
