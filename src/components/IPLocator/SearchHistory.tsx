export function SearchHistory({
  searchHistory,
  onSelectHistoryEntry,
}: {
  searchHistory: string[];
  onSelectHistoryEntry: (entry: string) => void;
}) {
  const chronologicalSearchHistory = searchHistory.slice(0).reverse();

  return (
    <ul className="h-full divide-y-2 divide-primary md:max-h-full overflow-auto">
      {chronologicalSearchHistory.map((historyEntry, i) => (
        <li
          key={i}
          className="text-center text-2xl py-2 hover:bg-primary hover:text-primaryText cursor-pointer"
          onClick={() => onSelectHistoryEntry(historyEntry)}
        >
          {historyEntry}
        </li>
      ))}
    </ul>
  );
}
