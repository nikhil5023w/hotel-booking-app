// export default function RoomsList({ rooms, setEditingRoomId, setForm, deleteRoom }) {
//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-2">All Rooms</h3>

//       <div className="space-y-3">
//         {rooms.map((room) => (
//           <div
//             key={room._id}
//             className="border p-3 rounded flex justify-between items-center bg-white"
//           >
//             <div>
//               <p className="font-bold">{room.name}</p>
//               <p>{room.description}</p>
//               <p>£{room.price}</p>
//             </div>

//             <div>
//               <button
//                 onClick={() => {
//                   setEditingRoomId(room._id);
//                   setForm({
//                     name: room.name,
//                     description: room.description,
//                     subDescription: room.subDescription || "",
//                     price: room.price,
//                     capacity: room.capacity,
//                     coverImages: [],
//                     galleryImages: [],
//                     amenities: room.amenities || [],
//                   });
//                 }}
//                 className="bg-green-600 text-white px-3 py-1 rounded mr-2"
//               >
//                 Update
//               </button>

//               <button
//                 onClick={() => deleteRoom(room._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit2,
  FiTrash2,
  FiImage,
  FiUsers,
  FiDollarSign,
  FiStar,
  FiMapPin,
  FiChevronDown,
  FiChevronUp,
  FiWifi,
  FiCoffee,
  FiSun,
  FiAward,
  FiCamera,
  FiMoreHorizontal,
} from "react-icons/fi";

export default function RoomsList({
  rooms,
  setEditingRoomId,
  setForm,
  deleteRoom,
  setShowForm,
}) {
  const [expandedRoom, setExpandedRoom] = useState(null);
  const [hoveredRoom, setHoveredRoom] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  const getAmenityIcon = (amenity) => {
    const title = amenity.title?.toLowerCase() || amenity?.toLowerCase() || "";
    if (title.includes("wifi")) return <FiWifi className="w-4 h-4" />;
    if (title.includes("coffee")) return <FiCoffee className="w-4 h-4" />;
    if (title.includes("balcony")) return <FiSun className="w-4 h-4" />;
    return <FiAward className="w-4 h-4" />;
  };

  const handleUpdateClick = (room) => {
    setEditingRoomId(room._id);

    setForm({
      name: room.name || "",
      roomType: room.roomType || "",
      description: room.description || "",
      subDescription: room.subDescription || "",
      price: room.price || "",
      capacity: room.capacity || "",
      coverImages: room.coverImages || [],
      galleryImages: room.galleryImages || [],
      amenities: room.amenities || [],
    });

    setShowForm(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!rooms || rooms.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100"
      >
        <div className="w-20 h-20 bg-[#907B60]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiImage className="w-8 h-8 text-[#907B60]" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Rooms Yet
        </h3>
        <p className="text-gray-500">
          Get started by creating your first room above.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rooms Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence>
          {rooms.map((room) => (
            <motion.div
              key={room._id}
              variants={itemVariants}
              layout
              exit={{ opacity: 0, scale: 0.9 }}
              onHoverStart={() => setHoveredRoom(room._id)}
              onHoverEnd={() => setHoveredRoom(null)}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                {room.coverImages?.[0] ? (
                  <img
                    src={room.coverImages[0]}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#907B60]/20 to-[#b89e84]/20 flex items-center justify-center">
                    <FiCamera className="w-12 h-12 text-[#907B60]/40" />
                  </div>
                )}

                {/* Image Count Badge */}
                {(room.coverImages?.length > 0 ||
                  room.galleryImages?.length > 0) && (
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <FiImage className="w-3 h-3" />
                    <span>
                      {room.coverImages?.length +
                        (room.galleryImages?.length || 0)}{" "}
                      photos
                    </span>
                  </div>
                )}

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                  <p className="text-[#907B60] font-bold">£{room.price}</p>
                </div>

                {/* Hover Overlay Actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredRoom === room._id ? 1 : 0 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleUpdateClick(room)}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#907B60] hover:bg-[#907B60] hover:text-white transition-all"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteRoom(room._id)}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {room.roomType && (
                      <span className="px-2 py-1 bg-[#907B60]/10 text-[#907B60] text-xs font-medium rounded-full">
                        {room.roomType}
                      </span>
                    )}

                    <h4 className="text-xl font-semibold text-gray-900 group-hover:text-[#907B60] transition-colors">
                      {room.name}
                    </h4>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {room.description || "No description provided"}
                </p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {room.subDescription || "No subDescription provided"}
                </p>

                {/* Quick Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FiUsers className="w-4 h-4" />
                    <span>{room.capacity || 0} guests</span>
                  </div>
                  {room.size && (
                    <div className="flex items-center gap-1">
                      <FiMapPin className="w-4 h-4" />
                      <span>{room.size} m²</span>
                    </div>
                  )}
                </div>

                {/* Amenities Preview */}
                {room.amenities?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600"
                      >
                        {getAmenityIcon(amenity)}
                        <span>{amenity.title || amenity}</span>
                      </div>
                    ))}
                    {room.amenities.length > 3 && (
                      <div className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                        +{room.amenities.length - 3} more
                      </div>
                    )}
                  </div>
                )}

                {/* Expandable Details */}
                <div className="border-t border-gray-100 pt-4">
                  <button
                    onClick={() =>
                      setExpandedRoom(
                        expandedRoom === room._id ? null : room._id,
                      )
                    }
                    className="w-full flex items-center justify-between text-sm text-gray-500 hover:text-[#907B60] transition-colors"
                  >
                    <span>View details</span>
                    {expandedRoom === room._id ? (
                      <FiChevronUp className="w-4 h-4" />
                    ) : (
                      <FiChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedRoom === room._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-3">
                          {room.coverImages?.length > 0 && (
                            <div>
                              <p className="text-xs text-gray-500 mb-2">
                                CoverImages
                              </p>
                              <div className="grid grid-cols-4 gap-2">
                                {room.coverImages
                                  .slice(0, 4)
                                  .map((img, idx) => (
                                    <img
                                      key={idx}
                                      src={img}
                                      alt={`coverImages ${idx + 1}`}
                                      className="w-full h-16 object-cover rounded-lg"
                                    />
                                  ))}
                              </div>
                            </div>
                          )}

                          {/* Gallery Images */}
                          {room.galleryImages?.length > 0 && (
                            <div>
                              <p className="text-xs text-gray-500 mb-2">
                                Gallery
                              </p>
                              <div className="grid grid-cols-4 gap-2">
                                {room.galleryImages
                                  .slice(0, 4)
                                  .map((img, idx) => (
                                    <img
                                      key={idx}
                                      src={img}
                                      alt={`Gallery ${idx + 1}`}
                                      className="w-full h-16 object-cover rounded-lg"
                                    />
                                  ))}
                              </div>
                            </div>
                          )}

                          {/* All Amenities */}
                          {room.amenities?.length > 0 && (
                            <div>
                              <p className="text-xs text-gray-500 mb-2">
                                All Amenities
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {room.amenities.map((amenity, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600"
                                  >
                                    {amenity.title || amenity}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => handleUpdateClick(room)}
                              className="flex-1 px-4 py-2 bg-[#907B60] text-white rounded-xl text-sm font-medium hover:bg-[#7a6850] transition-colors"
                            >
                              Edit Room
                            </button>
                            <button
                              onClick={() => deleteRoom(room._id)}
                              className="px-4 py-2 border border-red-200 text-red-500 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#907B60] to-[#b89e84] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Summary Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-4 bg-gray-50 rounded-xl flex items-center justify-between text-sm text-gray-500"
      >
        <div className="flex items-center gap-4">
          <span>
            Total Rooms: <strong>{rooms.length}</strong>
          </span>
          <span>
            Total Capacity:{" "}
            <strong>
              {rooms.reduce((acc, room) => acc + (room.capacity || 0), 0)}
            </strong>
          </span>
          <span>
            Price Range:{" "}
            <strong>
              £{Math.min(...rooms.map((r) => r.price || 0))} - £
              {Math.max(...rooms.map((r) => r.price || 0))}
            </strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FiMoreHorizontal className="w-4 h-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </motion.div>
    </div>
  );
}
