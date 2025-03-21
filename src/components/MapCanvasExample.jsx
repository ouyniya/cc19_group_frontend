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

function MapCanvasExample() {
  function ClickHandler({ onClick }) {
    useMapEvents({
      click: (e) => {
        onClick(e.latlng);
        console.log(e.latlng);
      },
    });
    return null;
  }

  const [position, setPosition] = useState(null);

  return (
    <div>
      <MapContainer
        style={{ height: "400px", width: "100vw" }}
        center={[13, 101]}
        zoom={5}
      >
        <BaseMap />
        {/* <LocationMarker /> */}
        {position && (
          <Marker position={position}>
            <Popup>
              You clicked here: <br /> {position.lat.toFixed(5)},{" "}
              {position.lng.toFixed(5)}
            </Popup>
          </Marker>
        )}

        {/* <Marker position={[13.5, 101]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[15, 101]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}

        <Province />
        {/* Click event handler */}
        <ClickHandler onClick={(latlng) => setPosition(latlng)} />
      </MapContainer>

      {position && (
        <div
          style={{ marginTop: "10px", padding: "10px", borderRadius: "5px" }}
        >
          <strong>Clicked Position:</strong> <br />
          Latitude: {position.lat}, Longitude: {position.lng}
        </div>
      )}
    </div>
  );
}

export default MapCanvasExample;
