// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import RoomCard from "../rooms/RoomCard";

// export default function FeaturedRooms() {
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       const { data } = await API.get("/rooms");
//       setRooms(data.slice(0, 3));
//     };
//     fetchRooms();
//   }, []);

//   return (
//     <section className="mt-20">
//       <h2 className="text-3xl font-bold mb-8">Featured Room Types</h2>

//       <div className="grid md:grid-cols-3 gap-6">
//         {rooms.map((room) => (
//           <RoomCard key={room._id} room={room} />
//         ))}
//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import API from "../../services/api";
import RoomCard from "../rooms/RoomCard";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import RoomImageSlider from "./RoomImageSlider";
import { useNavigate } from "react-router-dom";

export default function FeaturedRooms() {
  const navigate = useNavigate();
  const MotionLink = motion(Link);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await API.get("/rooms");
        setRooms(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  if (loading) {
    return (
      <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden bg-gradient-to-b from-white to-[#faf7f2]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#907B60]/20 border-t-[#907B60] rounded-full animate-spin" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 w-16 h-16 border-4 border-[#907B60]/10 rounded-full"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden bg-gradient-to-b from-white to-[#faf7f2]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#907B60]/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#907B60]/5 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <span className="px-4 py-2 bg-[#907B60]/10 text-[#907B60] rounded-full text-sm font-medium tracking-wider backdrop-blur-sm">
              ✦ CURATED SELECTION ✦
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-gray-900 mt-6"
          >
            Featured
            <span className="block font-serif italic text-[#907B60]">
              Luxury Accommodations
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-2xl mx-auto mt-4"
          >
            Discover our most sought-after rooms, each meticulously designed to
            provide an unforgettable stay with breathtaking views and premium
            amenities.
          </motion.p>
        </motion.div>

        {/* Room Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {rooms.map((room, index) => (
            <motion.div
              key={room._id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative"
            >
              {/* Premium card wrapper */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#907B60]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl" />
              {/* Room Card with enhanced styling */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 group-hover:shadow-3xl">
                {/* Image container with overlay */}
                <div className="relative h-64 overflow-hidden">
                  <RoomImageSlider images={room.coverImages} alt={room.name} />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#907B60] text-xs font-semibold rounded-full shadow-lg"
                    >
                      FEATURED
                    </motion.span>
                    {room.isPremium && (
                      <motion.span
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="px-3 py-1 bg-[#907B60] text-white text-xs font-semibold rounded-full shadow-lg"
                      >
                        PREMIUM
                      </motion.span>
                    )}
                  </div>
                  {/* Price tag */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-xl"
                  >
                    <p className="text-xs text-gray-600">Starting from</p>
                    <p className="text-xl font-bold text-[#907B60]">
                      ${room.price}{" "}
                      <span className="text-xs text-gray-500 font-normal">
                        /night
                      </span>
                    </p>
                  </motion.div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-xl font-semibold text-gray-900 group-hover:text-[#907B60] transition-colors"
                    >
                      {room.name}
                    </motion.h3>
                    {/* Rating */}
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                      <FiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-gray-600 text-sm mb-4 line-clamp-2"
                  >
                    {room.description ||
                      "Experience unparalleled luxury in this meticulously designed space featuring premium amenities and breathtaking views."}
                  </motion.p>
                  {/* Amenities preview */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex flex-wrap gap-2 mb-4"
                  >
                    {room.amenities?.slice(0, 3).map((amenity, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                      >
                        {amenity.title || amenity}
                      </span>
                    ))}
                    {room.amenities?.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </motion.div>
                  {/* View details button */}
                  <MotionLink
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    to={`/room-preview/${room._id}`}
                    className="flex items-center gap-2 text-[#907B60] font-medium group/btn"
                  >
                    <span>View Details</span>
                    <FiArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </MotionLink>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/rooms")}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-theme-accent text-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            <span className="relative font-medium tracking-wide">
              Explore All Rooms
            </span>

            <FiArrowRight className="relative w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>

          <p className="text-sm text-gray-500 mt-4">
            Book directly for best rates and exclusive benefits
          </p>
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-[#907B60]/30 to-transparent mt-20"
        />
      </div>
    </section>
  );
}
