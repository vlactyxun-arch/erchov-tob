"use client";
import { divIcon, latLngBounds, type LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import places from "@/content/locations.json";

const points = places.flatMap((place) =>
  place.coords ? [{ ...place, coords: place.coords as LatLngTuple }] : [],
);
const regions = {
  tobolsk: latLngBounds(
    points
      .filter((point) => point.region === "tobolsk")
      .map((point) => point.coords),
  ),
  abalak: latLngBounds(
    points
      .filter((point) => point.region === "abalak")
      .map((point) => point.coords),
  ),
};
const boundsOptions = { padding: [32, 40] as [number, number], maxZoom: 17 };

function MapView({ region }: { region: keyof typeof regions }) {
  const map = useMap();
  useEffect(() => {
    map.attributionControl.setPrefix(false);
  }, [map]);
  useEffect(() => {
    map.fitBounds(regions[region], { ...boundsOptions, animate: false });
  }, [map, region]);
  return null;
}
export default function RouteMap({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const active = points.find((point) => point.id === activeId);
  const region = active?.region === "abalak" ? "abalak" : "tobolsk";
  return (
    <MapContainer
      bounds={regions[region]}
      boundsOptions={boundsOptions}
      scrollWheelZoom={false}
      className="map-frame"
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <MapView region={region} />
      {points.map((place, index) => (
        <Marker
          key={place.id}
          position={place.coords}
          title={place.title}
          alt={place.title}
          icon={divIcon({
            className: "map-pin" + (activeId === place.id ? " selected" : ""),
            html: String(index + 1),
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          })}
          zIndexOffset={activeId === place.id ? 1000 : 0}
          eventHandlers={{ click: () => onSelect(place.id) }}
        />
      ))}
      {active && (
        <Popup
          key={active.id}
          position={active.coords}
          offset={[0, -14]}
          closeButton={false}
          closeOnClick={false}
          closeOnEscapeKey={false}
        >
          {active.title}
        </Popup>
      )}
    </MapContainer>
  );
}
