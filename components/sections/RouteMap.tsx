"use client";
import { divIcon, latLngBounds, type LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import places from "@/content/locations.json";

const points = places.flatMap((place, index) =>
  place.coords
    ? [{ ...place, coords: place.coords as LatLngTuple, number: index + 1 }]
    : [],
);
const fullRoute = latLngBounds(points.map((point) => point.coords));
const tobolsk = latLngBounds(
  points
    .filter((point) => point.region === "tobolsk")
    .map((point) => point.coords),
);
const boundsOptions = { padding: [32, 40] as [number, number], maxZoom: 17 };

function MapView({ activeId }: { activeId: string }) {
  const map = useMap();
  useEffect(() => {
    map.attributionControl.setPrefix(false);
  }, [map]);
  useEffect(() => {
    const selected = points.find((point) => point.id === activeId);
    if (selected) map.setView(selected.coords, 17, { animate: false });
    else
      map.fitBounds(activeId ? tobolsk : fullRoute, {
        ...boundsOptions,
        animate: false,
      });
  }, [map, activeId]);
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
  return (
    <MapContainer
      bounds={fullRoute}
      boundsOptions={boundsOptions}
      scrollWheelZoom={false}
      className="map-frame"
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <MapView activeId={activeId} />
      {points.map((place) => (
        <Marker
          key={place.id}
          position={place.coords}
          title={place.title}
          alt={place.title}
          icon={divIcon({
            className: "map-pin" + (activeId === place.id ? " selected" : ""),
            html: String(place.number),
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
          <strong>{active.title}</strong>
          <br />
          {active.area}
          {active.mapNote && (
            <>
              <br />
              {active.mapNote}
            </>
          )}
        </Popup>
      )}
    </MapContainer>
  );
}
