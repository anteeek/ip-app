import React from "react";

export function SearchBox({
  onSearch,
}: {
  onSearch: (searchPhrase: string) => void;
}) {
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [error, setError] = React.useState<string>();

  const handleSearch = () => {
    if (isIpValid(searchPhrase)) {
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

function isIpValid(candidateIp: string) {
  return !!candidateIp?.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/);
}
