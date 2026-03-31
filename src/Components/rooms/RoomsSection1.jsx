import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import RoomCard from "./RoomCard";
import { FiFilter, FiGrid, FiList } from "react-icons/fi";
import { useState } from "react";

export default function RoomsSection1({ rooms }) {
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const headerVariants = {
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

  // Filter rooms based on selection
  const filteredRooms =
    filter === "all" ? rooms : rooms.filter((room) => room.type === filter);

  return (
    <section className="relative py-12 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#faf7f2] to-white opacity-50" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div variants={headerVariants} className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-[#907B60]/10 text-[#907B60] rounded-full text-sm font-medium tracking-wider mb-4"
          >
            ✦ OUR COLLECTION ✦
          </motion.span>

          <motion.h2
            variants={headerVariants}
            className="text-4xl md:text-5xl font-light text-gray-900"
          >
            Luxury Rooms & Suites
          </motion.h2>

          <motion.p
            variants={headerVariants}
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Choose from our carefully curated selection of rooms, each offering
            a unique experience tailored to your preferences.
          </motion.p>
        </motion.div>

        {/* Rooms Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredRooms.map((room) => (
            <div key={room._id}>
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
