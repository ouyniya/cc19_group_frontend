import React from "react";
import * as d3 from "d3";
import { GeoJSON } from "react-leaflet";
import data from "../data/province.json";

function Province() {
  const popularProvince = [
    { id: 1, province: "Bangkok", view: 100 },
    { id: 2, province: "Saraburi", view: 48 },
    { id: 3, province: "Sa Kaeo", view: 20 },
    { id: 4, province: "Tak", view: 10 },
  ];

  // หา min-max ของ view
  const minView = Math.min(...popularProvince.map((p) => p.view));
  const maxView = Math.max(...popularProvince.map((p) => p.view));

  // สร้าง gradient scale จากสีฟ้า → แดง
  const colorScale = d3
    .scaleSequential(d3.interpolate("white", "red")) // ไล่จาก Yellow → Orange → Red
    .domain([minView, maxView]);

  // ฟังก์ชันกำหนดสีตาม view
  const getColor = (view) => {
    return colorScale(view); // คืนค่าเป็นสี gradient
  };

  // สไตล์ GeoJSON
  const geoStyle = (feature) => {
    const provinceName = feature.properties.ADM1_EN;
    const province = popularProvince.find((p) => p.province === provinceName);
    const view = province ? province.view : 0;

    return {
      weight: 1,
      color: "gray",
      fillColor: getColor(view),
      fillOpacity: 0.5,
    };
  };


  return data && <GeoJSON data={data} style={geoStyle} />;
}

export default Province;
