import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUsers,
  FiMaximize,
  FiWifi,
  FiCoffee,
  FiStar,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
} from "react-icons/fi";

export default function RoomCard({ room }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const images =
    room.coverImages?.length > 0
      ? room.coverImages
      : ["https://images.unsplash.com/photo-1618773928121-c32242e63f39"];

  // Auto slide every 5 sec if multiple images and not hovered
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  const nextSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer"
    >
      {/* Premium badge */}
      {room.isPremium && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute top-4 left-4 z-20"
        >
          <span className="px-4 py-2 bg-gradient-to-r from-[#907B60] to-[#6b5a45] text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm">
            ✦ PREMIUM SUITE ✦
          </span>
        </motion.div>
      )}
      {/* Like button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.preventDefault();
          setIsLiked(!isLiked);
        }}
        className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
      >
        <FiHeart
          className={`w-5 h-5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
        />
      </motion.button>
      {/* Image Slider */}
      <div className="relative h-64 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={room.name}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg z-10"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-800" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg z-10"
            >
              <FiChevronRight className="w-5 h-5 text-gray-800" />
            </motion.button>
          </>
        )}
        {/* Image counter */}
        {images.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full z-10"
          >
            {currentIndex + 1} / {images.length}
          </motion.div>
        )}
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Location and rating */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <FiMapPin className="w-4 h-4 text-[#907B60]" />
            <span>{room.location || "Prime Location"}</span>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
            <FiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-gray-700">
              {room.rating || "4.9"}
            </span>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#907B60] transition-colors">
          {room.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {room.description ||
            "Experience unparalleled comfort in this beautifully appointed room with modern amenities and stunning views."}
        </p>
        {/* Features */}
        <div className="flex items-center gap-4 mb-4 text-gray-500">
          <div className="flex items-center gap-1">
            <FiUsers className="w-4 h-4" />
            <span className="text-sm">{room.capacity || 2} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <FiMaximize className="w-4 h-4" />
            <span className="text-sm">{room.size || 35} m²</span>
          </div>
        </div>
        <div className="flex gap-3 mb-4">
          <FiWifi className="w-4 h-4 text-gray-400" />
          <FiCoffee className="w-4 h-4 text-gray-400" />
          {room.amenities?.slice(0, 2).map((amenity, i) => (
            <span key={i} className="text-xs text-gray-400">
              •
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#907B60]">
                £{room.price}
              </span>
              <span className="text-sm text-gray-500">/night</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to={`/room-preview/${room._id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-[#907B60] text-[#907B60] rounded-xl text-sm font-medium hover:bg-[#907B60] hover:text-white transition-all"
              >
                Details
              </motion.button>
            </Link>
            <Link to={`/room/${room._id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#907B60] text-white rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Book Now
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
