import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect, useRef } from "react";
import BaseMap from "../components/layer/BaseMap";
import Province from "../components/layer/Province";


// Custom marker icons
const createCustomIcon = (iconUrl, size = [50, 50]) => {
  return L.icon({
    iconUrl,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
    popupAnchor: [0, -size[1]],
  });
};

// Default icons for different place types
const defaultIcons = {
  attraction: createCustomIcon("https://cdn-icons-png.flaticon.com/128/3066/3066644.png"),
  eatery: createCustomIcon("https://cdn-icons-png.flaticon.com/128/10914/10914008.png"),
  shopping: createCustomIcon("https://cdn-icons-png.flaticon.com/128/3081/3081648.png"),
  nature: createCustomIcon("https://cdn-icons-png.flaticon.com/128/3175/3175209.png"),
  hotel: createCustomIcon("https://cdn-icons-png.flaticon.com/128/594/594106.png"),
  default: createCustomIcon("https://cdn-icons-png.flaticon.com/128/17476/17476823.png"),
  temple: createCustomIcon("https://cdn-icons-png.flaticon.com/128/3430/3430012.png"),
  hospital: createCustomIcon("https://cdn-icons-png.flaticon.com/128/4006/4006511.png")
};

// Sample place data - replace with your actual data source
const placesData = [
  // {
  //   id: 1,
  //   name: "Amazing Temple",
  //   position: [13.75, 100.51],
  //   type: "attraction",
  //   rating: 4.8,
  //   views: 1520,
  //   image: "https://smarthistory.org/wp-content/uploads/2020/12/Temple-complex-Wat-Phra-Kaew-1536x1024.jpg",
  //   highlights: ["Beautiful architecture", "Historical significance", "Peaceful atmosphere"],
  //   address: "123 Temple Road, Bangkok, Thailand",
  //   nearbyAttractions: [
  //     { id: 101, name: "City Museum", position: [15.75, 101.51], type: "attraction", distance: 0.5, image: "https://0983076341bell.wordpress.com/wp-content/uploads/2014/11/pic-13269059711.png" },
  //     { id: 102, name: "Central Park", position: [14.75, 103.51],type: "nature", distance: 0.8, image: "https://mediaim.expedia.com/destination/9/25fb0e3d86efa82d7f9ce56aae45c1aa.jpg" },
  //   ],
  //   nearbyPlaces: [
  //     { id: 201, name: "Luxury Hotel", type: "hotel", price: "$120", rating: 4.5, views: 980 },
  //     { id: 202, name: "Budget Inn", type: "hotel", price: "$45", rating: 3.8, views: 650 },
  //   ]
  // },
  // {
  //   id: 2,
  //   name: "Popular Night Market",
  //   position: [13.80, 100.55],
  //   type: "shopping",
  //   rating: 4.5,
  //   views: 2300,
  //   image: "https://www.centrepoint.com/Images/Korat-Save_One_Market.jpg",
  //   highlights: ["Local cuisine", "Handcrafted souvenirs", "Vibrant atmosphere"],
  //   address: "456 Market Street, Bangkok, Thailand",
  //   nearbyAttractions: [
  //     { id: 103, name: "Shopping Mall", type: "shopping", distance: 0.3, image: "https://www.central.co.th/adobe/dynamicmedia/deliver/dm-aid--a34fdadc-dd2d-4614-b6b4-8d4a24c35da1/10104-central-lardprao.jpg?preferwebp=true&quality=60&width=1024" },
  //     { id: 104, name: "Street Food Alley", type: "eatery", distance: 0.2, image: "https://alalanguage.com/wp-content/uploads/2023/08/Jodd-Fairs-DanNeramit-cover.jpeg" },
  //   ],
  //   nearbyPlaces: [
  //     { id: 203, name: "City Resort", type: "hotel", price: "$150", rating: 4.7, views: 1250 },
  //     { id: 204, name: "Backpacker Hostel", type: "hotel", price: "$25", rating: 4.2, views: 1890 },
  //   ]
  // },
  {
    id: 1,
    name: "Doi Phu Kha National Park",
    position: [19.200560, 101.080650],
    type: "nature",
    rating: 4.5,
    views: 1995,
    image: "https://f.tpkcdn.com/images-720/690c782e46c6c4f26e947f659424dfa1.jpg",
    highlights: ["Year-round stunning nature & fresh air", "Vibrant hues of pink blossoms (Bretschneidera sinensis, in Thai: ชมพูภูคา) in February", "Houses & campsite for tourists"],
    address: "632J+67C Phu Kha, Pua District, Nan, Thailand",
    nearbyAttractions: [
      { id: 101, name: "1715 Viewpoint", position: [19.167833, 101.111957], type: "attraction", distance: 8.8, image: "https://scontent.fbkk22-6.fna.fbcdn.net/v/t39.30808-6/480553644_122179722506259419_2068581369440649296_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGMJcPlJeAIYjznyUwcXR8AeOxPwpqFhKl47E_CmoWEqV1hOSKbTw0Pjgc1zvwsO_o&_nc_ohc=43rScYz4taUQ7kNvgEnQJyr&_nc_oc=Adlt0Le9BhnI3kuwQJUXvtL1URs9Gh-Fzu3LV-HNcZn49Ol2sDDCN3jC6bTGBbV8nybZlVM_IDBGyObPObwPm4dy&_nc_zt=23&_nc_ht=scontent.fbkk22-6.fna&_nc_gid=Sl5gdKsfSHM14b44xHuNWw&oh=00_AYEYMt9_7XSTvFm4gmiAzFe3W76QozHv-DCweisWMN5a6Q&oe=67E1FDC3" },
      { id: 102, name: "Doi Phu Kha Nature Walkway", position: [19.199815, 101.080982],type: "nature", distance: 0.1, image: "https://f.tpkcdn.com/review-source/70cd0113-21f2-b7c0-e71d-52a83d568b39.jpg" },
    ],
    nearbyPlaces: [
      { id: 201, name: "Phu Kha Accommodation", type: "hotel", price: "THB620", rating: 4.3, views: 78 },
      { id: 202, name: "Phu Kha 108 Motel", type: "hotel", price: "THB450", rating: 3.8, views: 650 },
    ]
  },
  {
    id: 2,
    name: "Wat Phra That Khao Noi",
    position: [18.769818, 100.750495],
    type: "temple",
    rating: 4.6,
    views: 3749,
    image: "https://www.prd.go.th/th/file/get/file/20240904e5b90d2ecf4bfd01d36c1b36343ff015144711.jpg",
    highlights: ["Gold icon of a walking Buddha", "The 15th-century temple", "Sunset-viewing spot"],
    address: "128 Moo 11 Du Tai, Mueang Nan District, Nan, Thailand",
    nearbyAttractions: [
      { id: 103, name: "King Naresuan Memorial Park", position: [18.769599, 100.750325], type: "attraction", distance: 0.14, image: "https://media-cdn.tripadvisor.com/media/photo-s/12/85/4b/d7/caption.jpg" },
      { id: 104, name: "Nan Youth Activity House", position: [18.768806, 100.743137], type: "attraction", distance: 2.6, image: "https://scontent.fbkk22-6.fna.fbcdn.net/v/t39.30808-6/344541209_128525353550139_3684129793762767014_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEQeePkk7tFvrkDJDIvp0BWnW3tRdqKQWydbe1F2opBbMggHRNQM-STwHPu8I4eXUA&_nc_ohc=hRzZe7Hr4OUQ7kNvgHv4c6B&_nc_oc=AdlDIvFiCk4HwOyOItlu4E6nMSNQyiPN2WCkG-adtERaChyZcgujB0rHzG7Ds7Z7HbXHM8CzbV_aOD_H4EI4zz-y&_nc_zt=23&_nc_ht=scontent.fbkk22-6.fna&_nc_gid=aA1Ec5zCgqr34CXj-Q0CMg&oh=00_AYFHLLAeK2-SO8BmPa_AUKkdVAVcAk0bDbbAbIpU7e_w-w&oe=67E230D8" },
    ],
    nearbyPlaces: [
      { id: 203, name: "Casa Foresta Nan", type: "hotel", price: "THB1,106", rating: 4.6, views: 116 },
      { id: 204, name: "Nan Green Lake View Resort", type: "hotel", price: "THB1,067", rating: 4.5, views: 364 },
    ]
  },
  {
    id: 3,
    name: "Sin Thao Rock Salt Pond",
    position: [19.150311, 101.154931],
    type: "attraction",
    rating: 3.8,
    views: 32,
    image: "https://img.wongnai.com/p/1920x0/2021/12/20/8fe0062008c940889982b07edf340048.jpg",
    highlights: ["The only one rock salt pond in the world", "The ancient rock salt pond"],
    address: "Bo Kluea Tai, Bo Kluea District, Nan, Thailand",
    nearbyAttractions: [
      { id: 105, name: "Ton Mang Klang Na Camping", position: [19.159880, 101.158347], type: "attraction", distance: 1.1, image: "https://scontent.fbkk6-1.fna.fbcdn.net/v/t39.30808-6/348703339_737363335062481_2042458407198846152_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGyBNJYuV5K9aOUx-C4CI7OzO5V71DbvQPM7lXvUNu9A7Jf429KZYJOZge3Id9OnCw&_nc_ohc=2bWP--d09nUQ7kNvgERMGDo&_nc_oc=AdmZGiNbA7gygvgeP-tr_gGKz_8PArbejDlRUu5L1j0A0C_pzVpeCugujVOjxa2Onf0&_nc_zt=23&_nc_ht=scontent.fbkk6-1.fna&_nc_gid=tNYUjdfYT4De4GYisYKY7A&oh=00_AYHngwdAeESy9O0ftDB4denm-4Q5jTjYYPn5kJDurogasQ&oe=67E2A6E3" },
      { id: 106, name: "Baanna Kham Salt Maker", position: [19.149452, 101.157014], type: "attraction", distance: 1.8, image: "https://resource.nationtv.tv/resource/photo_news/2021/02/15/640_5jfbe6abd658aeh6a6j5b.jpg?x-image-process=style/lg-webp" },
    ],
    nearbyPlaces: [
      { id: 205, name: "Bo Kluea Hospital", type: "hospital", price: "n/a", rating: 4.2, views: 12 },
      { id: 206, name: "Bo Kluea District Office", type: "default", price: "n/a", rating: 3.9, views: 9 },
    ]
  },
  {
    id: 4,
    name: "Wat Phra That Chae Haeng",
    position: [18.758243, 100.791668],
    type: "temple",
    rating: 4.4,
    views: 47,
    image: "https://www.matichonweekly.com/wp-content/uploads/2023/04/%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%98%E0%B8%B2%E0%B8%95%E0%B8%B8%E0%B9%81%E0%B8%8A%E0%B9%88%E0%B9%81%E0%B8%AB%E0%B9%89%E0%B8%87-cover-2227--1536x922.jpg",
    highlights: ["The Royal Temple of King Rama IX", "The ancient lanna temple", "Fascinating architecture"],
    address: "QQ5R+7MV Muang Tuet, Phu Phiang District, Nan, Thailand",
    nearbyAttractions: [
      { id: 107, name: "Baan Kru Kai Fabric Weave", position: [18.756747, 100.791868], type: "attraction", distance: 0.5, image: "https://mpics.mgronline.com/pics/Images/559000004113801.JPEG" },
      { id: 108, name: "Baan Nam Ngiew", position: [18.754629, 100.790222], type: "eatery", distance: 1.7, image: "https://img.wongnai.com/p/1968x0/2018/11/04/3ceccd73b8574f6da21e37203f62e714.jpg" },
    ],
    nearbyPlaces: [
      { id: 207, name: "Pagoda Sight Residence", type: "hotel", price: "THB1,084", rating: 4.5, views: 113 },
      { id: 208, name: "Wiang Kaew Hotel", type: "hotel", price: "THB1,252", rating: 4.3, views: 290 },
    ]
  },
  {
    id: 5,
    name: "Doi Phu Wae National Park",
    position: [19.385833, 101.116667],
    type: "nature",
    rating: 4.7,
    views: 3,
    image: "https://travel.mthai.com/app/uploads/2015/01/10599529_822619207794473_5549047632274721127_n.jpg",
    highlights: ["A land of majestic mountains and drifting mist.", "Unique local flora and rare plant species; Khor tree and the Dok Ku Lap Phan Pi (Thai Rose of the North)"],
    address: "Khun Nan, Chaloem Phra Kiat District, Nan, Thailand",
    nearbyAttractions: [
      { id: 109, name: "Doi Phu Kha National Park", position: [19.200560, 101.080650], type: "nature", distance: 54.3, image: "https://www.thailandguidebook.com/wp-content/uploads/2012/01/IMG_1487.jpg" },
      { id: 110, name: "Sapan Waterfall", position: [19.203184, 101.196357], type: "nature", distance: 28.9, image: "https://www.nanprovince.com/wp-content/uploads/2020/11/Sapan-Waterfall-7.jpg" },
    ],
    nearbyPlaces: [
      { id: 209, name: "Pagoda Sight Residence", type: "hotel", price: "THB1,084", rating: 4.5, views: 113 },
      { id: 210, name: "Wiang Kaew Hotel", type: "hotel", price: "THB1,252", rating: 4.3, views: 290 },
    ]
  },
  {
    id: 6,
    name: "Tambon Silapetch Farmstay Farmerschool",
    position: [19.108200, 100.943792],
    type: "attraction",
    rating: 4.7,
    views: 3,
    image: "https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.6435-9/73364256_146545126737094_5127476148606861312_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFfT1Nockrw2TtkPjp_D-mbh3MxfgETh6WHczF-AROHpZDNpWWtArYq8ANzbPolCVU&_nc_ohc=brYxinJ0ty8Q7kNvgFx8Uz2&_nc_oc=AdkHY5iZYMacejy8apcYISjPiCvjdsLwpgxNUnyj5IE6JUUl2s72Dl1X91JFzecpDB4&_nc_zt=23&_nc_ht=scontent.fbkk5-3.fna&_nc_gid=3VBgPBoJuV-EQke_58Qvgg&oh=00_AYEmFwjZN7kJU7S9U1dhtmn_CtdCRU00bauo8O7jbrZKeQ&oe=68047935",
    highlights: ["A place to explore the art of rice cultivation through the hands-on wisdom of local villagers."],
    address: "225 Moo 1 Baan Na Kam, Silapetch, Pua, Nan, Thailand",
    nearbyAttractions: [
      { id: 111, name: "Doi Phu Kha National Park", position: [19.200560, 101.080650], type: "nature", distance: 54.3, image: "https://www.thailandguidebook.com/wp-content/uploads/2012/01/IMG_1487.jpg" },
      { id: 112, name: "Sapan Waterfall", position: [19.203184, 101.196357], type: "nature", distance: 28.9, image: "https://www.nanprovince.com/wp-content/uploads/2020/11/Sapan-Waterfall-7.jpg" },
    ],
    nearbyPlaces: [
      { id: 211, name: "Pagoda Sight Residence", type: "hotel", price: "THB1,084", rating: 4.5, views: 113 },
      { id: 212, name: "Wiang Kaew Hotel", type: "hotel", price: "THB1,252", rating: 4.3, views: 290 },
    ]
  },
  {
    id: 7,
    name: "Tambon Silapetch Farmstay Farmerschool",
    position: [19.108200, 100.943792],
    type: "attraction",
    rating: 4.4,
    views: 4,
    image: "https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.6435-9/73364256_146545126737094_5127476148606861312_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFfT1Nockrw2TtkPjp_D-mbh3MxfgETh6WHczF-AROHpZDNpWWtArYq8ANzbPolCVU&_nc_ohc=brYxinJ0ty8Q7kNvgFx8Uz2&_nc_oc=AdkHY5iZYMacejy8apcYISjPiCvjdsLwpgxNUnyj5IE6JUUl2s72Dl1X91JFzecpDB4&_nc_zt=23&_nc_ht=scontent.fbkk5-3.fna&_nc_gid=3VBgPBoJuV-EQke_58Qvgg&oh=00_AYEmFwjZN7kJU7S9U1dhtmn_CtdCRU00bauo8O7jbrZKeQ&oe=68047935",
    highlights: ["A place to explore the art of rice cultivation through the hands-on wisdom of local villagers."],
    address: "225 Moo 1 Baan Na Kam, Silapetch, Pua, Nan, Thailand",
    nearbyAttractions: [
      { id: 111, name: "Wat Na Kham", position: [19.110275, 100.946816], type: "temple", distance: 0.65, image: "https://ak-d.tripcdn.com/images/1i6392224phibxbar2BC1_W_640_0_R5_Q80.jpg?proc=source/trip" },
      { id: 112, name: "Sila Phetch Reservoir", position: [19.112555, 100.952652], type: "attraction", distance: 1.4, image: "https://www.nanprovince.com/wp-content/uploads/2020/11/Sapan-Waterfall-7.jpg" },
    ],
    nearbyPlaces: [
      { id: 211, name: "Nan Niran Resort", type: "hotel", price: "THB2,800", rating: 4.4, views: 227 },
      { id: 212, name: "Saksila Resort", type: "hotel", price: "THB2,072", rating: 4.9, views: 22},
    ]
  },
  {
    id: 8,
    name: "Doi Samer Dao National Park",
    position: [18.376333, 100.827506],
    type: "nature",
    rating: 4.5,
    views: 3765,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/89/fb/36/caption.jpg?w=2000&h=-1&s=1",
    highlights: ["A popular camping site","Watching the stars at night", " Watching the sea of mist at the sunrise"],
    address: "Sisaket, Nanoi District, Nan, Thailand",
    nearbyAttractions: [
      { id: 113, name: "Si Nan National Park", position: [18.368378, 100.840017], type: "nature", distance: 3.4, image: "https://mychiangmaitour.com/wp-content/uploads/2019/04/si_nan_national_park08.jpg" },
      // { id: 114, name: "Sila Phetch Reservoir", position: [19.112555, 100.952652], type: "attraction", distance: 1.4, image: "https://www.nanprovince.com/wp-content/uploads/2020/11/Sapan-Waterfall-7.jpg" },
    ],
    nearbyPlaces: [
      // { id: 213, name: "Nan Niran Resort", type: "hotel", price: "THB2,800", rating: 4.4, views: 227 },
      // { id: 214, name: "Saksila Resort", type: "hotel", price: "THB2,072", rating: 4.9, views: 22},
    ]
  },
  {
    id: 9,
    name: "Phu Fa Pattana (Development) Center Accommodation",
    position: [19.024851, 101.205370],
    type: "attraction",
    rating: 4.7,
    views: 35,
    image: "https://ak-d.tripcdn.com/images/1mk3u2234c2mi3ots4C26_C_1200_800_Q70.jpg?proc=source%2ftrip&proc=source%2ftrip",
    highlights: ["A Royal Project of HRH Princess Maha Chakri Sirindhorn", "A conservation-focused destination offering opportunities to experience natural wonders and immerse in local culture."],
    address: "155 Moo 3 Phu Fa, Bo Kluea District, Nan, Thailand",
    nearbyAttractions: [
      { id: 115, name: "Phu Fa Pattana Palace", position: [19.019193, 101.210810], type: "attraction", distance: 0.75, image: "https://ak-d.tripcdn.com/images/0HJ1312000hc4inlx4AE1.jpg" },
      { id: 116, name: "Mlabri Tribe Village, Nan", position: [19.016107, 101.210666], type: "attraction", distance: 0.9, image: "https://static.wixstatic.com/media/85540c_77cc35b438bc4a41b49f9352a08030a1~mv2.jpg/v1/fill/w_959,h_958,al_c,q_85,enc_avif,quality_auto/Mlabri%20Village.jpg" },
    ],
    nearbyPlaces: [
      { id: 215, name: "Arbuya Homestay", type: "hotel", price: "THB3,500", rating: 4.9, views: 9 },
      { id: 216, name: "Naamwah Rafting", type: "attraction", price: "THB3,500", rating: 4.9, views: 12},
    ]
  },
  {
    id: 10,
    name: "Walking Street, Wat Phumin",
    position: [18.775341, 100.771599],
    type: "eatery",
    rating: 4.1,
    views: 33,
    image: "https://img.wongnai.com/p/1920x0/2023/01/07/25d994d81885413e959ec5948a317793.jpg",
    highlights: ["A lively street lined with food stalls, everyday goods, clothing, and souvenirs."],
    address: "QQGC+3M6 Nai Wiang, Mueang Nan District, Nan, Thailand",
    nearbyAttractions: [
      { id: 117, name: "Nan National Museum", position: [18.776455, 100.770775], type: "attraction", distance:0.27, image: "https://scontent.fbkk5-4.fna.fbcdn.net/v/t39.30808-6/315694480_511741720991177_5305468402889044031_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE8IWDswltPAKFiMzNwtiSuF6YxoWfjxYAXpjGhZ-PFgAQiqzCEOrgKEmaN4yxe1Sc&_nc_ohc=1dOZ1ZdIk9EQ7kNvgHR0jli&_nc_oc=Adlp4Kzmewo7kJpIcaZJzw1aCWcPVUpsfvEDuYJVhOplnfH17RyQF0r77eonW_jCfjk&_nc_zt=23&_nc_ht=scontent.fbkk5-4.fna&_nc_gid=3gYlrTfBkeccoU4lUU2aqg&oh=00_AYHaaYP2jzGmsusuO4WxGHcVUQcrk9R07hULudVR4Rf4XA&oe=67E2EC1B" },
      { id: 118, name: "Wat Phumin", position: [18.775141, 100.771615], type: "temple", distance: 0.16, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/ec/36/2c/caption.jpg?w=1200&h=-1&s=1" },
    ],
    nearbyPlaces: [
      { id: 217, name: "Nan Nakara Hotel", type: "hotel", price: "THB1,172", rating: 4.5, views: 517 },
      { id: 218, name: "Bua Place Nan", type: "hotel", price: "THB920", rating: 4.9, views: 46},
    ]
  },
];

function InteractiveMap() {
  const [position, setPosition] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [ selectedLocation, setSelectedLocation] = useState(null);
  const [isHovering, setIsHovering] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState(30); // Default sidebar width percentage
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);
  const mapRef = useRef(null);
  // Check screen size on component mount and window resize
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarWidth(mobile ? 100 : 30);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  // Handle sidebar resizing
  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const newWidth = ((window.innerWidth - e.clientX) / window.innerWidth) * 100;
    setSidebarWidth(Math.min(Math.max(newWidth, 20), 80)); // Restrict width between 20% and 80%
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Click handler for map
  function ClickHandler({ onClick }) {
    useMapEvents({
      click: (e) => {
        onClick(e.latlng);
        console.log(e.latlng);
        // On mobile, don't close sidebar on map click to prevent accidental closures
        if (!isMobile) {
          setSelectedPlace(null);
        }
      },
    });
    return null;
  }

  // Toggle place in wishlist
  const toggleWishlist = (placeId, e) => {
    if (e) {
      e.stopPropagation();
    }
    if (wishlist.includes(placeId)) {
      setWishlist(wishlist.filter(id => id !== placeId));
    } else {
      setWishlist([...wishlist, placeId]);
    }
  };

  // Custom hover component with improved containment
  const HoverInfo = ({ place }) => {
    return (
      <div className="hover-info bg-white p-2 rounded shadow-md max-w-xs">
        <img 
          src={place.image} 
          alt={place.name} 
          className="w-full h-24 object-cover mb-2 rounded" 
        />
        <h3 className="text-sm font-bold truncate">{place.name}</h3>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{place.rating}</span>
          </div>
          <div className="flex items-center">
            <span className="ml-2">👁️ {place.views}</span>
          </div>
        </div>
        <button 
          className="mt-1 p-1 rounded flex items-center text-xs"
          onClick={(e) => toggleWishlist(place.id, e)}
        >
          {wishlist.includes(place.id) ? "❤️" : "🤍"} Wishlist
        </button>
        <div className="mt-1">
          <strong className="text-xs">Highlights:</strong>
          <ul className="list-disc pl-4 text-xs">
            {place.highlights.slice(0, 2).map((point, idx) => (
              <li key={idx} className="truncate">{point}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Custom popup for basic information
  const CustomPopup = ({ place, onViewDetails }) => {
    return (
      <Popup className="custom-popup" maxWidth="200">
        <div className="popup-content">
          <h3 className="font-bold text-sm truncate">{place.name}</h3>
          <p className="text-xs truncate">{place.address}</p>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mt-2 text-xs"
            onClick={() => onViewDetails(place)}
          >
            View Details
          </button>
        </div>
      </Popup>
    );
  };

  // Dropdown component
const Dropdown = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <select 
      value={selectedOption} 
      onChange={handleChange}
      className="w-full p-2 border rounded"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

  // Sidebar content component with improved containment
  const SidebarContent = ({ place,onPlaceClick }) => {
    if (!place) return null;
    
    return (
      <div className="sidebar-content p-3 overflow-hidden">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold">{place.name}</h2>
          <button 
            className="p-1 rounded"
            onClick={(e) => toggleWishlist(place.id, e)}
          >
            {wishlist.includes(place.id) ? "❤️" : "🤍"}
          </button>
        </div>
        
        <img 
          src={place.image} 
          alt={place.name} 
          className="w-full h-32 object-cover my-2 rounded" 
        />
        
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{place.rating}</span>
          </div>
          <div className="flex items-center text-sm">
            <span>👁️ {place.views} views</span>
          </div>
        </div>
        
        <p className="text-sm mb-3 truncate">{place.address}</p>
        
        <div className="mb-3">
          <h3 className="font-semibold mb-1 text-sm">Highlights:</h3>
          <ul className="list-disc pl-4 text-sm">
            {place.highlights.map((point, idx) => (
              <li key={idx} className="mb-1">{point}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-3">
          <h3 className="font-semibold mb-1 text-sm">Nearby Attractions:</h3>
          <div className="flex flex-wrap gap-2">
            {place.nearbyAttractions.map((attraction) => (
              <div key={attraction.id} className="nearby-attraction flex flex-col items-center w-16">
                <div className="w-10 h-10 rounded-full overflow-hidden mb-1">
                  <img 
                    src={attraction.image} 
                    alt={attraction.name} 
                    className="w-full h-full object-cover" 
                    onClick={() => onPlaceClick(attraction)}
                  />
                </div>
                <span className="text-xs text-center truncate w-full">{attraction.name}</span>
                <span className="text-xs text-gray-500">{attraction.distance} km</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-1 text-sm">Nearby Places:</h3>
          <div className="overflow-x-auto max-w-full">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-xs">
                  <th className="pr-2 pb-1">Name</th>
                  <th className="pr-2 pb-1">Price</th>
                  <th className="pr-2 pb-1">Rating</th>
                  <th className="pb-1">Views</th>
                </tr>
              </thead>
              <tbody>
                {place.nearbyPlaces.map((nearbyPlace) => (
                  <tr key={nearbyPlace.id} className="text-xs">
                    <td className="pr-2 truncate max-w-xs">{nearbyPlace.name}</td>
                    <td className="pr-2">{nearbyPlace.price}</td>
                    <td className="pr-2">★ {nearbyPlace.rating}</td>
                    <td>{nearbyPlace.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Custom marker component for places
  const PlaceMarker = ({ place }) => {
    const icon = place.type in defaultIcons ? defaultIcons[place.type] : defaultIcons.default;
    
    return (
      <Marker 
        position={place.position} 
        icon={icon}
        iconSize={[100,100]}
        eventHandlers={{
          mouseover: () => setIsHovering(place.id),
          mouseout: () => setIsHovering(null),
          click: () => setSelectedPlace(place)
        }}
      >
        {isHovering === place.id ? (
          <Popup closeButton={false} autoPan={false} className="hover-popup" maxWidth="220">
            <HoverInfo place={place} />
          </Popup>
        ) : (
          <CustomPopup place={place} onViewDetails={setSelectedPlace} />
        )}
      </Marker>
    );
  };
  // Function to handle place click from the sidebar
  const handlePlaceClick = (place) => {
    console.log(place)
    setSelectedLocation(place);
    if (mapRef.current) {
      mapRef.current.flyTo(place.position, 15); // Center the map on the selected place
    }
  };
  return (
    <div className={`flex flex-col ${isMobile ? '' : 'flex-row'} `}>
      <div 
        className="map-container" 
        style={{ 
          width: isMobile ? "100%" : (selectedPlace ? `${100 - sidebarWidth}%` : "100%"), 
          height: isMobile ? (selectedPlace ? "50vh" : "50vh") : "50vh" 
        }}
      >
        <MapContainer
          // style={{ height: "100%", width: "100%" }}
          className="h-[400px]"
          center={[19.15, 101]}
          zoom={9}
          ref={mapRef}
        >
          <BaseMap />
          
          {/* User location marker */}
          {userLocation && (
            <Marker 
              position={[userLocation.lat, userLocation.lng]} 
              // icon={createCustomIcon("path/to/user-location.png", [30, 30])}
            >
              <Popup>You are here!</Popup>
            </Marker>
          )}
          {/* User Click Nearby location marker */}
          {selectedLocation && (
            <Marker 
              position={[selectedLocation.position[0], selectedLocation.position[1]]} 
              // icon={createCustomIcon("path/to/user-location.png", [30, 30])}
            >
              <Popup>
                <img src={selectedLocation.image} alt={selectedLocation.name} />
                {selectedLocation.name}
                </Popup>
            </Marker>
          )}
          
          {/* Clicked position marker */}
          {position && (
            <Marker position={position}>
              <Popup>
                You clicked here: <br /> {position.lat.toFixed(5)},{" "}
                {position.lng.toFixed(5)}
              </Popup>
            </Marker>
          )}
          
          {/* Place markers */}
          {placesData.map((place) => (
            <PlaceMarker key={place.id} place={place} />
          ))}
          
          {/* Click event handler */}
          {/* <ClickHandler onClick={(latlng) => setPosition(latlng)} /> */}
        </MapContainer>
      </div>
      
      {/* Side panel - adaptive based on screen size */}
      {selectedPlace && (
        <div 
          ref={sidebarRef}
          className="sidebar bg-white !h-[400px] shadow-lg overflow-y-auto"
          style={{ 
            width: isMobile ? "100%" : `${sidebarWidth}%`, 
            height: isMobile ? "50vh" : "100vh",
            maxHeight: isMobile ? "50vh" : "100vh"
          }}
        >
          <div className="flex justify-between items-center p-2 border-b sticky top-0 bg-white z-10">
            <h2 className="font-bold">Place Details</h2>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedPlace(null)}
            >
              ✕
            </button>
          </div>
          <SidebarContent place={selectedPlace} onPlaceClick={handlePlaceClick}/>
          <div 
            className="resize-handle w-2 bg-gray-300 cursor-ew-resize"
            onMouseDown={handleMouseDown}
          />
        </div>
      )}
      
      {/* Optional: Add CSS for popups */}
      <style jsx global>{`
        .leaflet-popup-content {
          margin: 8px;
          padding: 0;
          max-width: 100%;
        }
        .custom-popup .leaflet-popup-content {
          min-width: 120px;
          max-width: 200px;
        }
        .hover-popup .leaflet-popup-content {
          min-width: 180px;
          max-width: 220px;
        }
        .leaflet-popup-content-wrapper {
          padding: 0;
        }
        .resize-handle {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          cursor: ew-resize;
        }
      `}</style>
    </div>
  );
}

export default InteractiveMap;