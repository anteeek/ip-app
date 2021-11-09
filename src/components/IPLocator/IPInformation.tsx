import { Map } from "../UI/Map";
import { IPLocation } from "../../lib/IPLocation";
import { CircularProgress } from "../UI/CircularProgress";
import { LabeledEntry } from "../UI/LabeledValue";

export function IPInformation({
  ip,
  location,
}: {
  ip?: string;
  location?: IPLocation;
}) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center align-center h-96 xl:flex-1 xl:h-80">
        {location ? (
          <Map location={location} />
        ) : (
          <div className="flex-grow-0 m-auto">
            <CircularProgress />
          </div>
        )}
      </div>

      <article className="border-primary border-2 flex-1 flex flex-col justify-evenly">
        <h3 className="text-4xl text-center">
          Location information for IP address/URL <br />
          <span className="font-bold">{ip}</span>
        </h3>

        {location ? (
          <div className="divide-y-2 divide-primary">
            <LabeledEntry label="Country" value={location.country} />
            <LabeledEntry label="City" value={location.city} />
            <LabeledEntry
              label="Longitude"
              value={location.longitude.toString()}
            />
            <LabeledEntry
              label="Latitude"
              value={location.latitude.toString()}
            />
          </div>
        ) : (
          <div className="m-auto">
            <CircularProgress />
          </div>
        )}
      </article>
    </div>
  );
}
