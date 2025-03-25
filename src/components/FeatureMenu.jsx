import React, { useState } from "react";
import {
  Rocket,
  Camera,
  MessageCircle,
  Globe,
  ShieldCheck,
  MapPin,
  Zap,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const FeatureMenu = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const featureSections = [
    {
      icon: <Rocket className="w-12 h-12 text-sky-600" />,
      title: "Seamless User Experience",
      features: [
        "Google Login & Two-Factor Authentication (2FA)",
        "Personalized User Profiles",
      ],
      // bgGradient: "white"
    },
    {
      icon: <Camera className="w-12 h-12 text-sky-700" />,
      title: "Engaging Travel Content",
      features: ["Post & Share Travel Experiences", "Edit & Manage Posts"],
      // bgGradient: "from-blue-100 to-blue-200"
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-sky-800" />,
      title: "Interactive Community",
      features: ["Comment & Reply System", "Wishlist Feature"],
      // bgGradient: "from-blue-200 to-blue-300"
    },
    {
      icon: <Zap className="w-12 h-12 text-sky-900" />,
      title: "Smart AI-Powered Recommendations",
      features: [
        "AI-Driven Travel Suggestions",
        "Location Ideas Based on Budget & Preferences",
      ],
      // bgGradient: "from-blue-300 to-blue-400"
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-sky-600" />,
      title: "Admin & Moderation System",
      features: [
        "Content Moderation with AI",
        "User & Role Management",
        "Data Analytics Dashboard",
      ],
      // bgGradient: "from-blue-400 to-blue-500"
    },
    {
      icon: <Globe className="w-12 h-12 text-sky-700" />,
      title: "Heat Map of Popular Destinations",
      features: ["Visualize Trending Locations", "Dynamic Travel Hotspots"],
      // bgGradient: "from-blue-500 to-blue-600"
    },
  ];

  return (
    <div className="pt-20 pb-0 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl text-center mb-10 font-bold text-sky-900 tracking-tight">
          Travel Platform Features
        </h2>
        {/* <p className="text-center text-xl">
          This is a space where the spirit of adventure meets the art of
          storytelling, <br />inviting you to discover the world through our eyes.
        </p> */}

        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureSections.map((section, index) => (
            <div 
              key={index} 
              className={`
                relative bg-gradient-to-br ${section.bgGradient} 
                rounded-3xl p-6
                transform transition-all duration-300 
                ${activeFeature === index 
                  ? 'scale-105 shadow-2xl ring-2 ring-sky-500/50' 
                  : 'hover:scale-105 hover:shadow-xl hover:shadow-sky-500'}
                cursor-pointer
              `}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="flex items-center mb-4">
                {section.icon}
                <h2 className="ml-4 text-xl font-semibold text-sky-900">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-2">
                {section.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex} 
                    className="flex items-center text-sky-800 space-x-2 group"
                  >
                    <MapPin className="w-4 h-4 text-sky-600 group-hover:animate-pulse" />
                    <span className="group-hover:text-blue-950 transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-6 h-6 text-sky-900 animate-bounce" />
              </div>
            </div>
          ))}
        </div> */}

        {/* <div className="mt-16 text-center">
          <button className="
            bg-sky-600 text-white 
            px-10 py-4 
            rounded-full 
            text-lg font-semibold 
            hover:bg-sky-700 
            transition-colors 
            shadow-lg 
            hover:shadow-xl 
            hover:translate-y-[-5px]
            active:scale-95
          ">
            Explore More Features
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default FeatureMenu;
