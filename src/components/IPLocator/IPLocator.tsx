import { SearchBox } from "./SearchBox";
import React from "react";
import { useQuery } from "react-query";
import { ipOrDomainToLocation } from "../../lib/IPLocation";
import { getHistory, saveSearch } from "../../lib/searchHistory";
import { SearchHistory } from "./SearchHistory";
import { getMyIP } from "../../lib/myIP";
import { IPInformation } from "./IPInformation";
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
    <main className="flex flex-col-reverse lg:flex-row gap-20 px-4 xl:max-h-screen">
      <div className="lg:w-1/3 py-4">
        <h2 className="text-4xl whitespace-nowrap pb-4">Search history</h2>
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
          {myIpLocationError && (
            <label
              aria-errormessage={myIpLocationError}
              className="text-error text-2xl font-bold"
            >
              {myIpLocationError}
            </label>
          )}
        </section>

        <SearchBox onSearch={handleSearch} />

        {searchedIp && (
          <section className="py-4">
            <h2 className="text-4xl pb-4">Location of IP/URL {searchedIp}</h2>
            {searchedIpLocationError ? (
              <label
                aria-errormessage={searchedIpLocationError}
                className="text-error text-2xl font-bold"
              >
                {searchedIpLocationError}
              </label>
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
        return ipOrDomainToLocation(myIp);
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
        return ipOrDomainToLocation(searchedIp);
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
