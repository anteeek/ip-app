const LOCAL_STORAGE_KEY = "SEARCH_HISTORY";

export function getHistory(): string[] {
  const stringifiedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);

  return stringifiedHistory ? JSON.parse(stringifiedHistory) : [];
}

export function saveSearch(searchText: string) {
  const history = getHistory();

  history.push(searchText);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
}
