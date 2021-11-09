import { Map } from "../UI/Map";
import { SearchBox } from "./SearchBox";
import React from "react";
import { useQuery } from "react-query";
import { translateIPToLocation } from "../../lib/IPLocation";
import { CircularProgress } from "../UI/CircularProgress";
import { getHistory, saveSearch } from "../../lib/searchHistory";
import { SearchHistory } from "./SearchHistory";

export function IPLocator() {
  const [currentSearchPhrase, setSearchPhrase] = React.useState<string>();
  const [searchHistory, setSearchHistory] = React.useState<string[]>(
    getHistory()
  );

  React.useEffect(() => {
    setSearchHistory(getHistory());
  }, [currentSearchPhrase]);

  const { data: currentSearchLocation } = useQuery(
    ["current-ip-location", currentSearchPhrase],
    () => translateIPToLocation(currentSearchPhrase!),
    { enabled: !!currentSearchPhrase }
  );

  const previousHistoryEntry =
    searchHistory.length > 1 && searchHistory[searchHistory.length - 2];

  const { data: previousHistoryEntryLocation } = useQuery(
    ["last-ip-location", previousHistoryEntry],
    () => {
      if (previousHistoryEntry) {
        return translateIPToLocation(previousHistoryEntry!);
      }
    },
    { enabled: !!previousHistoryEntry }
  );

  const handleSearch = (newSearchPhrase: string) => {
    setSearchPhrase(newSearchPhrase);
    saveSearch(newSearchPhrase);
  };
  const handleSelectHistoryEntry = (historyEntry: string) => {
    handleSearch(historyEntry);
  };

  return (
    <main className="flex gap-2">
      <SearchHistory
        searchHistory={searchHistory}
        onSelectHistoryEntry={handleSelectHistoryEntry}
      />

      <div className="flex flex-col gap-2">
        {previousHistoryEntry ? (
          previousHistoryEntryLocation ? (
            <Map location={previousHistoryEntryLocation} />
          ) : (
            <CircularProgress />
          )
        ) : (
          ""
        )}

        <SearchBox onSearch={handleSearch} />

        {currentSearchPhrase ? (
          currentSearchLocation ? (
            <Map location={currentSearchLocation} />
          ) : (
            <CircularProgress />
          )
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
