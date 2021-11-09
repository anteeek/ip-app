export async function getMyIP(): Promise<string> {
  return await fetch("https://api.ipify.org?format=json")
    .then((res) => res.json())
    .then((result) => result.ip);
}
