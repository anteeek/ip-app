import React from "react";

export function SearchBox({
  onSearch,
}: {
  onSearch: (searchPhrase: string) => void;
}) {
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [error, setError] = React.useState<string>();

  const handleSearch = () => {
    if (isIpOrUrlValid(searchPhrase)) {
      onSearch(searchPhrase);
      setSearchPhrase("");
      setError(undefined);
    } else {
      setError("This IP address is invalid!");
    }
  };

  return (
    <div className="flex flex-col max-w-2xl">
      <div className="flex gap-5">
        <input
          className="border-4 border-primary text-xl px-2 w-full"
          value={searchPhrase}
          placeholder="8.8.8.8"
          onChange={(e) => setSearchPhrase(e.target.value)}
          onKeyDown={(e) => {
            const pressedKey = e.code || e.key;

            if (pressedKey === "Enter") {
              handleSearch();
            }
          }}
        />

        <button
          onClick={handleSearch}
          className="text-xl bg-primary px-5 py-2 text-primaryText"
        >
          Search
        </button>
      </div>
      {error && (
        <label aria-errormessage={error} className="text-error">
          {error}
        </label>
      )}
    </div>
  );
}

const IP_REGEX = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
const URL_REGEX =
  /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

function isIpOrUrlValid(candidateIp: string) {
  return !!candidateIp?.match(IP_REGEX) || !!candidateIp?.match(URL_REGEX);
}
