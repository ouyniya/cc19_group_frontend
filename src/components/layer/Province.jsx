import React, { useEffect } from "react";
import * as d3 from "d3";
import { GeoJSON } from "react-leaflet";
import data from "../data/province.json";
import useAdminStores from "../../stores/useAdminStores";

function Province() {
  const store = useAdminStores();
  const {
    actionTopDestination,
    topDestination,
  } = store;
  
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        await actionTopDestination();
      } catch (error) {
        console.error("Failed to fetch top destinations:", error);
      }
    };
    
    fetchAllUsers();
  }, [actionTopDestination]);
  
  // Extract popular provinces safely
  const popularProvince = topDestination?.topProvinces || [];

  // Fix: Only calculate min and max if popularProvince array exists and has items
  const calculateColors = () => {
    // Check if popularProvince exists and has items
    if (!popularProvince || popularProvince.length === 0) {
      // Return default style function if no data
      return () => ({
        weight: 1,
        color: "red",
        fillColor: "white",
        fillOpacity: 0.5,
      });
    }

    // console.log(popularProvince)

    // Calculate min-max views safely
    const minView = Math.min(...popularProvince.map(p => p.totalViews));
    const maxView = Math.max(...popularProvince.map(p => p.totalViews));

    // Create color scale
    const colorScale = d3
      .scaleSequential(d3.interpolate("white", "red"))
      .domain([minView, maxView]);

    // Return the style function
    return (feature) => {
      const provinceName = feature.properties.ADM1_EN;
      const province = popularProvince.find(p => p.name === provinceName);
      const view = province ? province.totalViews : 0;

      return {
        weight: 1,
        color: "gray",
        fillColor: colorScale(view),
        fillOpacity: 0.5,
      };
    };
  };

  // Get the style function based on current data state
  const geoStyle = calculateColors();

  // Only render GeoJSON if data is available
  return data ? <GeoJSON data={data} style={geoStyle} /> : null;
}

export default Province;