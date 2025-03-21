import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import BaseMap from "../components/layer/BaseMap";

function ChangeView({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.setView([latitude, longitude], map.getZoom());
    }
  }, [latitude, longitude, map]);

  return null;
}

function MapCanvasShow({ latitude = 13.736717, longitude = 100.523186 }) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={6}
      style={{ height: "400px", width: "100%" }}
    >
      <BaseMap />
      <ChangeView latitude={latitude} longitude={longitude} />
      <Marker position={[latitude, longitude]} />
    </MapContainer>
  );
}

export default MapCanvasShow;