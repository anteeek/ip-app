export async function translateIPToLocation(
  ipAddress: string
): Promise<IPLocationSearchResult> {
  const result = await fetch(`https://ipapi.co/${ipAddress}/json`).then((res) =>
    res.json()
  );

  return {
    city: result.city,
    country: result.country_name,
    latitude: result.latitude,
    longitude: result.longitude,
  };
}

export interface IPLocationSearchResult {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}
