export function SearchHistory({
  searchHistory,
  onSelectHistoryEntry,
}: {
  searchHistory: string[];
  onSelectHistoryEntry: (entry: string) => void;
}) {
  return (
    <div>
      <h2>Search history</h2>
    </div>
  );
}
