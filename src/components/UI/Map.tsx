import { TileLayer, Marker, Popup, MapContainer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export interface MapProps {
  location: {
    latitude: number;
    longitude: number;
  };
}

export function Map(props: MapProps) {
  const { latitude, longitude } = props.location;

  return (
    <MapContainer zoom={13} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapLocation location={props.location} />
      <Marker position={[latitude, longitude]}>
        <Popup>Location of the IP/URL</Popup>
      </Marker>
    </MapContainer>
  );
}

function MapLocation(props: MapProps) {
  const map = useMap();
  const { latitude, longitude } = props.location;

  map.setView([latitude, longitude], 13);
  return null;
}
