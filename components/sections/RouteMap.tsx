"use client";
import { divIcon, latLngBounds, type LatLngTuple } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
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
const popupPadding: [number, number] = [10, 10];

function MapMarkers({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const map = useMap();
  const [zoom, setZoom] = useState(() => map.getZoom());
  useMapEvents({ zoomend: () => setZoom(map.getZoom()) });
  const projected = points
    .filter((point) => point.id !== activeId)
    .map((point) => ({ point, pixel: map.project(point.coords, zoom) }));
  const groups: (typeof projected)[] = [];
  for (const entry of projected) {
    const group = groups.find(
      ([first]) => first.pixel.distanceTo(entry.pixel) < 34,
    );
    if (group) group.push(entry);
    else groups.push([entry]);
  }
  const selected = points.find((point) => point.id === activeId);
  const markers = groups
    .filter((group) => group.length === 1)
    .map(([entry]) => entry.point);
  if (selected) markers.push(selected);

  return (
    <>
      {markers.map((place) => (
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
      {groups
        .filter((group) => group.length > 1)
        .map((group) => (
          <Marker
            key={group.map(({ point }) => point.id).join("-")}
            position={group[0].point.coords}
            title={`Остановок рядом: ${group.length}`}
            icon={divIcon({
              className: "map-pin map-pin-group",
              html: `+${group.length}`,
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            })}
          >
            <Popup
              className="route-point-popup"
              maxWidth={220}
              maxHeight={128}
              autoPanPadding={popupPadding}
            >
              <div className="map-group-stops">
                {group.map(({ point }) => (
                  <button
                    key={point.id}
                    type="button"
                    onClick={() => onSelect(point.id)}
                  >
                    {point.number}. {point.title}
                  </button>
                ))}
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
}

function MapView({ activeId }: { activeId: string }) {
  const map = useMap();
  useEffect(() => {
    map.attributionControl.setPrefix(false);
  }, [map]);
  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)");
    const syncDragging = () => {
      if (touch.matches) map.dragging.disable();
      else map.dragging.enable();
    };
    syncDragging();
    touch.addEventListener("change", syncDragging);
    return () => touch.removeEventListener("change", syncDragging);
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
      <MapMarkers activeId={activeId} onSelect={onSelect} />
      {active && (
        <Popup
          key={active.id}
          position={active.coords}
          offset={[0, -14]}
          className="route-point-popup"
          maxWidth={220}
          autoPanPadding={popupPadding}
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
