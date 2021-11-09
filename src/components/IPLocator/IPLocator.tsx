import { SearchBox } from "./SearchBox";
import React from "react";
import { useQuery } from "react-query";
import { translateIPToLocation } from "../../lib/IPLocation";
import { getHistory, saveSearch } from "../../lib/searchHistory";
import { SearchHistory } from "./SearchHistory";
import { getMyIP } from "../../lib/myIP";
import { IPInformation } from "./IPInformation";
import { ErrorMessage } from "../UI/ErrorMessage";
import { toast } from "react-toastify";

export function IPLocator() {
  const {
    searchedIp,
    searchedIpLocation,
    searchedIpLocationError,
    handleSearch,
  } = useSearchedIP();

  const { myIp, myIpLocation, myIpLocationError } = useMyIPLocation();

  const { searchHistory, reloadSearchHistory } = useSearchHistory();

  const handleSelectHistoryEntry = (historyEntry: string) => {
    if (historyEntry !== searchedIp) {
      handleSearch(historyEntry);
      reloadSearchHistory();
    }
  };

  return (
    <main className="flex gap-2 sm:max-h-screen">
      <div className="w-1/3">
        <SearchHistory
          searchHistory={searchHistory}
          onSelectHistoryEntry={handleSelectHistoryEntry}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <section className="py-4">
          <h2 className="text-4xl pb-4">
            {myIp ? `Your IP (${myIp}) location` : `Your IP location`}
          </h2>
          <IPInformation ip={myIp} location={myIpLocation} />
          {myIpLocationError && <ErrorMessage error={myIpLocationError} />}
        </section>

        <SearchBox onSearch={handleSearch} />

        {searchedIp && (
          <section className="py-4">
            <h2 className="text-4xl pb-4">Location of IP {searchedIp}</h2>
            {searchedIpLocationError ? (
              <ErrorMessage error={searchedIpLocationError} />
            ) : (
              <IPInformation ip={searchedIp} location={searchedIpLocation} />
            )}
          </section>
        )}
      </div>
    </main>
  );
}

function useMyIPLocation() {
  const { data: myIp } = useQuery("my-ip", getMyIP);

  const { data: myIpLocation, error } = useQuery(
    ["my-ip-location", myIp],
    async () => {
      if (myIp) {
        return translateIPToLocation(myIp);
      }
    },
    {
      onError: (err?: Error) => {
        if (err?.message === "Invalid IP Address") {
          toast.error(
            "We had a problem determining your IP address location. Sorry for inconvenience."
          );
        }
      },
    }
  );

  return {
    myIp,
    myIpLocation,
    myIpLocationError: error instanceof Error && error.message,
  };
}

function useSearchedIP() {
  const [searchedIp, setSearchedIP] = React.useState<string>();

  const handleSearch = (newSearchPhrase: string) => {
    setSearchedIP(newSearchPhrase);
    saveSearch(newSearchPhrase);
  };

  const { data: searchedIpLocation, error } = useQuery(
    ["searched-ip-location", searchedIp],
    () => {
      if (searchedIp) {
        return translateIPToLocation(searchedIp);
      }
    },
    {
      retry: 1,
      onError: (err?: Error) => {
        if (err?.message === "Invalid IP Address") {
          toast.error(`Invalid IP Address searched!`);
        }
      },
    }
  );

  return {
    searchedIp,
    handleSearch,
    searchedIpLocation,
    searchedIpLocationError: error instanceof Error && error.message,
  };
}

function useSearchHistory() {
  const [searchHistory, setSearchHistory] = React.useState<string[]>(
    getHistory()
  );

  const reloadSearchHistory = () => setSearchHistory(getHistory());

  return {
    searchHistory,
    reloadSearchHistory,
  };
}
