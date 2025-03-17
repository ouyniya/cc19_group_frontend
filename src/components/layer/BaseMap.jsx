import React from "react";
import { LayersControl, TileLayer } from "react-leaflet";

function BaseMap() {
  return (
    <LayersControl position="topright">
      <LayersControl.BaseLayer name="mapTravel" checked>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Real" >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>
    </LayersControl>
  );
}

export default BaseMap;
