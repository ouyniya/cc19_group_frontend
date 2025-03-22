import { MapContainer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect, useRef } from "react";
import BaseMap from "../components/layer/BaseMap";
import axios from "axios";

// Category icons
const iconMap = {
  temple: "https://www.svgrepo.com/show/215358/great-buddha-of-thailand-thailand.svg",               
  nationalPark: "https://www.svgrepo.com/show/513475/tree-evergreen.svg",         
  historicalSite: "https://www.svgrepo.com/show/296635/castle-beach.svg",    
  beachIsland: "https://www.svgrepo.com/show/295677/wave.svg",                 
  marketShopping: "https://cdn-icons-png.flaticon.com/128/3081/3081648.png",     
  zooWildlife: "https://www.svgrepo.com/show/485149/lion.svg",          
  viewpointScenic: "https://www.svgrepo.com/show/383774/binocular-market-watch.svg",      
  default: "https://cdn-icons-png.flaticon.com/128/9128/9128984.png",           
}

// Get Leaflet icon by category
const getCategoryIcon = (category) => {
  const iconUrl = iconMap[category] || iconMap.default;
  return new L.Icon({
    iconUrl,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [35, 35],
    shadowAnchor: [10, 35],
  });
};

function InteractiveMap() {
  const [posts, setPosts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:8899/api/posts")
      .then((res) => {
        console.log("Fetched posts:", res.data.posts);
        setPosts(res.data.posts);
      })
      .catch((err) => console.error("Failed to fetch posts", err));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  return (
    <div className="w-full h-[600px]">
      <MapContainer
        center={[19.15, 101]}
        zoom={9}
        className="w-full h-full rounded-xl shadow-lg"
        ref={mapRef}
      >
        <BaseMap />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>Your Current Location</Popup>
          </Marker>
        )}

        {posts.map((post) => {
          const lat = post.latitude;
          const lng = post.longitude;
          const category = post.category;

          if (!lat || !lng) return null;

          return (
            <Marker
              key={post.id}
              position={[lat, lng]}
              icon={getCategoryIcon(category)}
            >
              <Popup>
                <div className="w-60">
                  <h3 className="font-semibold text-base mb-1">{post.placeName}</h3>
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.placeName}
                      className="w-full h-32 rounded-lg object-cover mb-1"
                    />
                  )}
                  <p className="text-sm mb-1">{post.description}</p>
                  <p className="text-xs font-medium">{post.province}, {post.district}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default InteractiveMap;
