import { Map } from "../UI/Map";
import { IPLocation } from "../../lib/IPLocation";
import { CircularProgress } from "../UI/CircularProgress";

export function IPInformation({
  ip,
  location,
}: {
  ip?: string;
  location?: IPLocation;
}) {
  return (
    <div>
      <div className="h-80">
        {location ? <Map location={location} /> : <CircularProgress />}
      </div>
    </div>
  );
}
