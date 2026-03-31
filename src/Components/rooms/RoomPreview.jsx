// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import API from "../../services/api";
// import {
//   FiUsers,
//   FiMaximize,
//   FiWifi,
//   FiCoffee,
//   FiStar,
//   FiMapPin,
//   FiArrowLeft,
//   FiHeart,
//   FiShare2,
//   FiSun,
//   FiWind,
//   FiDroplet,
//   FiCheckCircle,
//   FiCalendar,
//   FiClock,
//   FiAward
// } from "react-icons/fi";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// export default function RoomPreview() {
//   const { id } = useParams();
//   const [room, setRoom] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

//   useEffect(() => {
//     const fetchRoom = async () => {
//       try {
//         const { data } = await API.get(`/rooms/${id}`);
//         setRoom(data);
//       } catch (error) {
//         console.error("Failed to fetch room:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRoom();
//   }, [id]);

//   const images = room?.coverImages?.length > 0
//     ? room.coverImages
//     : [
//         "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
//         "https://images.unsplash.com/photo-1590490360182-c33d57733433",
//         "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
//       ];

//   const amenities = [
//     { icon: FiWifi, name: "High-Speed WiFi", description: "Complimentary high-speed internet" },
//     { icon: FiCoffee, name: "Coffee Machine", description: "Nespresso with premium capsules" },
//     { icon: FiSun, name: "Private Balcony", description: "With stunning views" },
//     { icon: FiWind, name: "Air Conditioning", description: "Individual climate control" },
//     { icon: FiDroplet, name: "Rain Shower", description: "Luxury bathroom fixtures" },
//     { icon: FiAward, name: "Premium Toiletries", description: "Designer brands" },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#faf7f2]">
//         <div className="relative">
//           <div className="w-20 h-20 border-4 border-[#907B60]/20 border-t-[#907B60] rounded-full animate-spin" />
//           <motion.div
//             animate={{ scale: [1, 1.2, 1] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="absolute inset-0 w-20 h-20 border-4 border-[#907B60]/10 rounded-full"
//           />
//         </div>
//       </div>
//     );
//   }

//   if (!room) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500">Room not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-[#faf7f2]">
//       {/* Hero Section */}
//       <section className="relative h-[70vh] overflow-hidden">
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 5000 }}
//           className="h-full"
//         >
//           {images.map((image, index) => (
//             <SwiperSlide key={index}>
//               <div className="relative h-full">
//                 <img
//                   src={image}
//                   alt={`${room.name} - View ${index + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Back button */}
//         <Link to="/rooms">
//           <motion.button
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             whileHover={{ scale: 1.05 }}
//             className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
//           >
//             <FiArrowLeft className="w-5 h-5" />
//             <span>Back to Rooms</span>
//           </motion.button>
//         </Link>

//         {/* Action buttons */}
//         <div className="absolute top-8 right-8 z-20 flex gap-3">
//           <motion.button
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             whileHover={{ scale: 1.05 }}
//             onClick={() => setIsLiked(!isLiked)}
//             className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
//           >
//             <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
//           </motion.button>
//           <motion.button
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.1 }}
//             whileHover={{ scale: 1.05 }}
//             className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
//           >
//             <FiShare2 className="w-5 h-5 text-gray-600" />
//           </motion.button>
//         </div>

//         {/* Room info overlay */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent"
//         >
//           <div className="max-w-7xl mx-auto">
//             <div className="flex items-center gap-2 text-white/80 mb-2">
//               <FiMapPin className="w-4 h-4" />
//               <span className="text-sm">{room.location || 'Prime Location'}</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
//               {room.name}
//             </h1>
//             <div className="flex items-center gap-6">
//               <div className="flex items-center gap-2">
//                 <FiStar className="w-5 h-5 fill-amber-400 text-amber-400" />
//                 <span className="text-white font-semibold">4.9</span>
//                 <span className="text-white/60">(128 reviews)</span>
//               </div>
//               <div className="flex items-center gap-2 text-white/80">
//                 <FiUsers className="w-5 h-5" />
//                 <span>Up to {room.capacity || 2} guests</span>
//               </div>
//               <div className="flex items-center gap-2 text-white/80">
//                 <FiMaximize className="w-5 h-5" />
//                 <span>{room.size || 45} m²</span>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </section>

//       {/* Content Section */}
//       <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
//         <div className="grid lg:grid-cols-3 gap-12">
//           {/* Main content */}
//           <div className="lg:col-span-2 space-y-12">
//             {/* Description */}
//             <motion.div
//               ref={ref}
//               initial={{ opacity: 0, y: 30 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.2 }}
//             >
//               <h2 className="text-2xl font-semibold text-gray-900 mb-4">About this room</h2>
//               <p className="text-gray-600 leading-relaxed">
//                 {room.description || "Experience unparalleled luxury in this meticulously designed space. Featuring premium amenities, breathtaking views, and thoughtful details that ensure an unforgettable stay."}
//               </p>
//             </motion.div>

//             {/* Amenities */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.3 }}
//             >
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6">Amenities</h2>
//               <div className="grid sm:grid-cols-2 gap-4">
//                 {amenities.map((amenity, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={inView ? { opacity: 1, x: 0 } : {}}
//                     transition={{ delay: 0.4 + index * 0.1 }}
//                     className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
//                   >
//                     <amenity.icon className="w-6 h-6 text-[#907B60] flex-shrink-0" />
//                     <div>
//                       <h3 className="font-medium text-gray-900">{amenity.name}</h3>
//                       <p className="text-sm text-gray-500">{amenity.description}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Policies */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.5 }}
//               className="bg-gray-50 rounded-2xl p-6"
//             >
//               <h2 className="text-2xl font-semibold text-gray-900 mb-4">House Rules</h2>
//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div className="flex items-center gap-3">
//                   <FiClock className="w-5 h-5 text-[#907B60]" />
//                   <div>
//                     <p className="text-sm text-gray-500">Check-in</p>
//                     <p className="font-medium">From 3:00 PM</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <FiClock className="w-5 h-5 text-[#907B60]" />
//                   <div>
//                     <p className="text-sm text-gray-500">Check-out</p>
//                     <p className="font-medium">Until 11:00 AM</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <FiUsers className="w-5 h-5 text-[#907B60]" />
//                   <div>
//                     <p className="text-sm text-gray-500">Max guests</p>
//                     <p className="font-medium">{room.capacity || 2} guests</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <FiCheckCircle className="w-5 h-5 text-[#907B60]" />
//                   <div>
//                     <p className="text-sm text-gray-500">Cancellation</p>
//                     <p className="font-medium">Free cancellation</p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Sidebar - Booking Card */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ delay: 0.4 }}
//             className="lg:col-span-1"
//           >
//             <div className="sticky top-24 bg-white rounded-3xl shadow-2xl p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <p className="text-3xl font-bold text-[#907B60]">£{room.price}</p>
//                   <p className="text-sm text-gray-500">per night</p>
//                 </div>
//                 <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
//                   <FiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
//                   <span className="font-medium">4.9</span>
//                 </div>
//               </div>

//               {/* Booking form */}
//               <div className="space-y-4 mb-6">
//                 <div>
//                   <label className="text-sm text-gray-600 mb-1 block">Check-in</label>
//                   <div className="relative">
//                     <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="date"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#907B60] transition-colors"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600 mb-1 block">Check-out</label>
//                   <div className="relative">
//                     <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="date"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#907B60] transition-colors"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600 mb-1 block">Guests</label>
//                   <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#907B60] transition-colors">
//                     {[1,2,3,4].map(num => (
//                       <option key={num}>{num} Guest{num > 1 ? 's' : ''}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Price breakdown */}
//               <div className="border-t border-gray-100 pt-4 mb-6">
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">£{room.price} x 1 night</span>
//                     <span className="font-medium">£{room.price}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Cleaning fee</span>
//                     <span className="font-medium">£25</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Service fee</span>
//                     <span className="font-medium">£15</span>
//                   </div>
//                   <div className="flex justify-between font-semibold pt-2 border-t">
//                     <span>Total</span>
//                     <span className="text-[#907B60]">£{room.price + 40}</span>
//                   </div>
//                 </div>
//               </div>

//               <Link to={`/room/${room._id}`}>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full py-4 bg-[#907B60] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
//                 >
//                   Proceed to Book
//                 </motion.button>
//               </Link>

//               <p className="text-xs text-center text-gray-500 mt-4">
//                 You won't be charged yet
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import API from "../../services/api";
import {
  FiArrowLeft,
  FiHeart,
  FiShare2,
  FiMapPin,
  FiUsers,
  FiMaximize,
  FiStar,
  FiCheckCircle,
  FiChevronRight,
} from "react-icons/fi";
import {
  FaWifi,
  FaCar,
  FaSnowflake,
  FaSwimmingPool,
  FaTv,
  FaCoffee,
  FaDumbbell,
  FaSpa,
  FaHome,
  FaStar,
} from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

export default function RoomPreview() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [allRooms, setAllRooms] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const iconMap = {
    wifi: <FaWifi />,
    car: <FaCar />,
    snowflake: <FaSnowflake />,
    pool: <FaSwimmingPool />,
    tv: <FaTv />,
    coffee: <FaCoffee />,
    gym: <FaDumbbell />,
    spa: <FaSpa />,
    balcony: <FaHome />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get(`/rooms/${id}`);
        setRoom(data);

        const all = await API.get("/rooms");
        setAllRooms(all.data.filter((r) => r._id !== id));
      } catch (error) {
        console.error("Failed to fetch room:", error);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#faf7f2]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#907B60]/20 border-t-[#907B60] rounded-full animate-spin" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 w-20 h-20 border-4 border-[#907B60]/10 rounded-full"
          />
        </div>
      </div>
    );
  }

  const images =
    room.coverImages?.length > 0
      ? room.coverImages
      : ["https://images.unsplash.com/photo-1618773928121-c32242e63f39"];

  const galleryImages =
    room.galleryImages?.length > 0
      ? room.galleryImages
      : [
          "https://images.unsplash.com/photo-1590490360182-c33d57733433",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
        ];

  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Absolutely stunning room! The view was breathtaking and the service impeccable.",
      date: "March 2024",
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment:
        "Best B&B experience I've ever had. The attention to detail is remarkable.",
      date: "February 2024",
    },
    {
      name: "Emma Williams",
      rating: 4,
      comment:
        "Beautiful property with amazing amenities. Will definitely return.",
      date: "January 2024",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#faf7f2]">
      {/* Hero Section with Main Image */}
      <section className="relative h-[70vh] overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Thumbs]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          thumbs={{ swiper: thumbsSwiper }}
          className="h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  src={image}
                  alt={`${room.name} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail gallery */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full max-w-3xl px-4">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            className="thumb-swiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-[#907B60] transition-all">
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Back button */}
        <Link to="/rooms">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            className="absolute top-8 left-8 z-30 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white transition-all"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back to Rooms</span>
          </motion.button>
        </Link>

        {/* Action buttons */}
        <div className="absolute top-8 right-8 z-30 flex gap-3">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsLiked(!isLiked)}
            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
          >
            <FiHeart
              className={`w-5 h-5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
          >
            <FiShare2 className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>

        {/* Room info overlay */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 z-20 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-white/80 mb-2">
              <FiMapPin className="w-4 h-4" />
              <span className="text-sm">
                {room.location || "Prime B&B Location"}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
              {room.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-white font-semibold">5.0</span>
                <span className="text-white/60">(128 reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <FiUsers className="w-5 h-5" />
                <span>Up to {room.capacity || 2} guests</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <FiMaximize className="w-5 h-5" />
                <span>{room.size || 45} m²</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 border-b border-gray-200 mb-8"
        >
          {["overview", "amenities", "images", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 capitalize font-medium transition-all relative ${
                activeTab === tab
                  ? "text-[#907B60]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#907B60]"
                />
              )}
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  {/* Description */}
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      About this room
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {room.description ||
                        "Experience the charm of our beautifully appointed B&B room, where modern comfort meets traditional hospitality. Wake up to stunning views, enjoy a homemade breakfast, and relax in thoughtfully designed spaces that make you feel right at home."}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {room.subDescription ||
                        "Experience the charm of our beautifully appointed B&B room, where modern comfort meets traditional hospitality. Wake up to stunning views, enjoy a homemade breakfast, and relax in thoughtfully designed spaces that make you feel right at home."}
                    </p>
                    {/* Gallery Preview */}
                    <div className="mt-6 grid grid-cols-3 md:grid-cols-4 gap-3">
                      {galleryImages.map((img, i) => (
                        <div
                          key={i}
                          onClick={() => setSelectedImage(img)}
                          className="cursor-pointer overflow-hidden rounded-lg"
                        >
                          <img
                            src={img}
                            alt="Gallery"
                            className="w-full h-24 object-cover hover:scale-110 transition"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === "amenities" && (
                <motion.div
                  key="amenities"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Amenities
                  </h2>

                  {/* API Amenities only */}
                  {room.amenities?.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {room.amenities.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        >
                          {/* Icon */}
                          <div className="w-6 h-6 text-[#907B60] flex-shrink-0 text-lg">
                            {iconMap[item.icon] || <FaStar />}
                          </div>

                          <div>
                            <h3 className="font-medium text-gray-900">
                              {item.title}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {item.description ||
                                `Premium ${item.title} included`}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-xl">
                      <p className="text-gray-500">
                        No amenities information available
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
              {activeTab === "images" && (
                <motion.div
                  key="images"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Room Images
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[...images, ...galleryImages].map((img, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className="cursor-pointer overflow-hidden rounded-xl"
                      >
                        <img
                          src={img}
                          alt="Room"
                          className="w-full h-48 object-cover hover:scale-110 transition"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Guest Reviews
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FiStar
                            key={star}
                            className="w-5 h-5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <span className="font-semibold">5.0 · 128 reviews</span>
                    </div>
                  </div>

                  {reviews.map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl p-6 shadow-md"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#907B60]/20 rounded-full flex items-center justify-center">
                            <span className="text-[#907B60] font-semibold">
                              {review.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {review.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {review.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </motion.div>
                  ))}

                  <button className="text-[#907B60] font-medium hover:underline">
                    Read all 128 reviews →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-white rounded-3xl shadow-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold text-[#907B60]">
                    £{room.price}
                  </p>
                  <p className="text-sm text-gray-500">per night</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                  <FiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium">5.0</span>
                </div>
              </div>

              {/* Booking form */}

              <Link to={`/room/${room._id}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[#907B60] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  Proceed to Book
                </motion.button>
              </Link>

              <p className="text-xs text-center text-gray-500 mt-4">
                You won't be charged yet
              </p>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                  <span>Free cancellation up to 48 hours before check-in</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Other Rooms Section */}
        {allRooms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            ref={ref}
            className="mt-20"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-light text-gray-900">
                Explore Other{" "}
                <span className="font-serif italic text-[#907B60]">Rooms</span>
              </h2>
              <Link
                to="/rooms"
                className="flex items-center gap-2 text-[#907B60] hover:gap-3 transition-all"
              >
                <span>View all</span>
                <FiChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allRooms.slice(0, 3).map((r, index) => (
                <motion.div
                  key={r._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/room-preview/${r._id}`}>
                    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={
                            r.coverImages?.[0] ||
                            "https://images.unsplash.com/photo-1618773928121-c32242e63f39"
                          }
                          alt={r.name}
                          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#907B60] transition-colors">
                          {r.name}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-[#907B60] font-bold">£{r.price}</p>
                          <p className="text-sm text-gray-500">per night</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="preview"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-white/60 hover:text-white text-4xl"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
