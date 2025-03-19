import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import BaseMap from "../components/layer/BaseMap";
import Province from "../components/layer/Province";

function MapCanvas({ latitude, longitude, setLatitude, setLongitude }) {
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLatitude(lat);
        setLongitude(lng);
      },
    });

    return latitude && longitude ? (
      <Marker position={[latitude, longitude]} />
    ) : null;
  };

  return (
    <MapContainer
      center={[latitude || 13.736717, longitude || 100.523186]}
      zoom={6}
      style={{ height: "400px", width: "100%" }}
    >
      <BaseMap />

      <LocationMarker />
    </MapContainer>
  );
}

export default MapCanvas;
