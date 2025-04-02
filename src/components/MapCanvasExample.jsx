import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
  GeoJSON, // Import GeoJSON here
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import BaseMap from "../components/layer/BaseMap";
import Province from "../components/layer/Province";

function MapCanvasExample() {
  // function ClickHandler({ onClick }) {
  //   useMapEvents({
  //     click: (e) => {
  //       onClick(e.latlng);
  //       // console.log(e.latlng);
  //     },
  //   });
  //   return null;
  // }

  function ClickHandler({ onClick }) {
    const map = useMap();

    useMapEvents({
      click: (e) => {
        onClick(e.latlng);

        // Iterate over map layers
        map.eachLayer((layer) => {
          if (layer.options && layer.feature) {
            // Check if the clicked point is inside the province boundary
            if (layer.getBounds?.().contains(e.latlng)) {
              const provinceName = layer.feature.properties?.ADM1_EN;
              if (provinceName) {
                console.log("Province Name:", provinceName);
                window.location.href = `/filter-page?placeName=&province=${provinceName}&district=&page=1`;
              }
            }
          }
        });
      },
    });

    return null;
  }

  const [position, setPosition] = useState(null);

  return (
    <div>
      <MapContainer
        style={{ height: "400px", width: "100vw" }}
        center={[12, 101]}
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
