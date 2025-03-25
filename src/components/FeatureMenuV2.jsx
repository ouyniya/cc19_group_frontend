import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef } from "react";
import { ChevronRight, Key, MapPin } from "lucide-react";

export const FeatureMenuV2 = () => {
  return (
    <div className="bg-white mb-100">
      {/* <Nav /> */}
      <Hero />
      {/* <Schedule /> */}
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 text-white">
      <SiSpacex className="text-3xl mix-blend-difference" />
      <button
        onClick={() => {
          document.getElementById("launch-schedule")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="flex items-center gap-1 text-xs text-zinc-400"
      >
        LAUNCH SCHEDULE <FiArrowRight />
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 " />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();
  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;
  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(https://images.unsplash.com/photo-1673627115025-31540e7f4042?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Space launch"
        start={-500}
        end={200}
        className="w-2/4"
        title={"Engaging Travel Content"}
        content1={"Post & Share Travel Experiences"}
        content2={"Edit & Manage Posts"}
      />
      <ParallaxImg
        src="https://plus.unsplash.com/premium_photo-1700830452546-96547de21071?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Space launch"
        start={-500}
        end={-200}
        className="w-2/4 ml-[53%]"
        title={"Seamless User Experience"}
        content1={"Google Login & Two-Factor Authentication (2FA)"}
        content2={"Personalized User Profiles"}
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Space launch"
        start={-500}
        end={-250}
        className="w-2/4 "
        title={"Interactive Community"}
        content1={"Comment & Reply System"}
        content2={"Wishlist Feature"}
      />
      <ParallaxImg
        src="https://plus.unsplash.com/premium_photo-1676637656166-cb7b3a43b81a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Space launch"
        start={-800}
        end={-400}
        className="w-2/4 ml-[53%]"
        title={"Smart AI-Powered Recommendations"}
        content1={"AI-Driven Travel Suggestions"}
        content2={"Location Ideas Based on Budget & Preferences"}
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1489702932289-406b7782113c?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Space launch"
        start={-800}
        end={-600}
        className="w-2/4"
        title={"Heat Map of Popular Destinations"}
        content1={"Visualize Trending Locations"}
        content2={"Dynamic Travel Hotspots"}
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end, title, content1, content2 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${-end}px`],
  });
  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.div
      title={title}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    >
      <div className="card bg-base-100 shadow-sm">
        <figure>
          <img src={src} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <li
            className="flex items-center text-sky-800 space-x-2 group"
          >
            <MapPin className="w-4 h-4 text-sky-600 group-hover:animate-pulse" />
            <span className="group-hover:text-blue-950 transition-colors">
              {content1}
            </span>
          </li>
          <li
            className="flex items-center text-sky-800 space-x-2 group"
          >
            <MapPin className="w-4 h-4 text-sky-600 group-hover:animate-pulse" />
            <span className="group-hover:text-blue-950 transition-colors">
              {content2}
            </span>
          </li>
        </div>
      </div>

      {/* <div
        className={`
                relative bg-white 
                rounded-lg p-6
                transform transition-all duration-300 
                shadow-md
              `}
        // onMouseEnter={() => setActiveFeature(index)}
        // onMouseLeave={() => setActiveFeature(null)}
      >
        <div className="flex items-center mb-4">
          <h2 className="ml-4 text-xl font-semibold text-sky-900">{title}</h2>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center text-sky-800 space-x-2 group">
            <MapPin className="w-4 h-4 text-sky-600 group-hover:animate-pulse" />
            <span className="group-hover:text-blue-950 transition-colors">
              ;;;;;;;
            </span>
          </li>
        </ul>
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-6 h-6 text-sky-900 animate-bounce" />
        </div>
        <motion.img src={src} alt={alt} />
      </div> */}
    </motion.div>
  );
};

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-zinc-50"
      >
        Launch Schedule
      </motion.h1>
      <ScheduleItem title="NG-21" date="Dec 9th" location="Florida" />
      <ScheduleItem title="Starlink" date="Dec 20th" location="Texas" />
    </section>
  );
};

const ScheduleItem = ({ title, date, location }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
        <p className="text-sm uppercase text-zinc-500">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
        <p>{location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};
