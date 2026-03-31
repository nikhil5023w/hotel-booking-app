// import { motion } from "framer-motion";
// import { FaSpa, FaUtensils, FaSwimmingPool } from "react-icons/fa";

// const container = {
//   hidden: {},
//   show: {
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

// const fadeUp = {
//   hidden: { opacity: 0, y: 60 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.9, ease: "easeOut" },
//   },
// };

// export default function HomeSection1() {
//   return (
//     <section className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden bg-white">

//       {/* Soft Background Gradient Glow */}
//       <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-[#907B60]/10 rounded-full blur-3xl" />
//       <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-[#907B60]/10 rounded-full blur-3xl" />

//       <motion.div
//         variants={container}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true }}
//         className="relative max-w-7xl mx-auto space-y-36"
//       >
//         {/* ================= SECTION 1 ================= */}
//         <div className="grid md:grid-cols-2 gap-16 items-center">

//           {/* Image with floating depth */}
//           <motion.div
//             variants={fadeUp}
//             className="relative group"
//           >
//             <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#907B60]/20 to-transparent blur-xl opacity-50 group-hover:opacity-70 transition duration-500" />

//             <motion.img
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.6 }}
//               src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
//               alt="Luxury Room"
//               className="relative rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.15)] h-[350px] sm:h-[450px] w-full object-cover"
//             />

//             {/* Glass Floating Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.8 }}
//               className="absolute -bottom-8 left-10 bg-white/60 backdrop-blur-lg px-6 py-4 rounded-2xl shadow-xl"
//             >
//               <p className="text-sm tracking-widest text-[#907B60] uppercase">
//                 5 Star Rated
//               </p>
//               <p className="text-gray-800 font-semibold">
//                 Award Winning Hospitality
//               </p>
//             </motion.div>
//           </motion.div>

//           {/* Text */}
//           <motion.div variants={fadeUp} className="space-y-8">
//             <span className="uppercase tracking-[4px] text-[#907B60] text-sm font-medium">
//               Exclusive Experience
//             </span>

//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-gray-900">
//               Discover a New <br />
//               Standard of Luxury
//             </h2>

//             <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
//               Every space is thoughtfully curated to deliver warmth, elegance,
//               and unforgettable comfort. From breathtaking interiors to serene
//               surroundings, your experience is our highest priority.
//             </p>

//             {/* Feature Highlights */}
//             <div className="grid grid-cols-3 gap-6 pt-6">
//               <motion.div whileHover={{ y: -5 }} className="space-y-3">
//                 <FaSpa className="text-[#907B60] text-2xl" />
//                 <p className="text-sm font-medium text-gray-700">Luxury Spa</p>
//               </motion.div>

//               <motion.div whileHover={{ y: -5 }} className="space-y-3">
//                 <FaUtensils className="text-[#907B60] text-2xl" />
//                 <p className="text-sm font-medium text-gray-700">
//                   Fine Dining
//                 </p>
//               </motion.div>

//               <motion.div whileHover={{ y: -5 }} className="space-y-3">
//                 <FaSwimmingPool className="text-[#907B60] text-2xl" />
//                 <p className="text-sm font-medium text-gray-700">
//                   Infinity Pool
//                 </p>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>

//         {/* ================= SECTION 2 ================= */}
//         <div className="grid md:grid-cols-2 gap-16 items-center">

//           {/* Text */}
//           <motion.div variants={fadeUp} className="space-y-8 order-2 md:order-1">
//             <span className="uppercase tracking-[4px] text-[#907B60] text-sm font-medium">
//               Premium Comfort
//             </span>

//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-gray-900">
//               Designed for <br />
//               Extraordinary Moments
//             </h2>

//             <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
//               From sunrise balcony views to midnight city lights, each detail
//               is designed to make your stay effortless and indulgent.
//             </p>

//             <div className="flex gap-10 pt-6">
//               <div>
//                 <p className="text-3xl font-semibold text-[#907B60]">120+</p>
//                 <p className="text-gray-600 text-sm">Luxury Suites</p>
//               </div>

//               <div>
//                 <p className="text-3xl font-semibold text-[#907B60]">50+</p>
//                 <p className="text-gray-600 text-sm">World Destinations</p>
//               </div>

//               <div>
//                 <p className="text-3xl font-semibold text-[#907B60]">98%</p>
//                 <p className="text-gray-600 text-sm">Guest Satisfaction</p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Image */}
//           <motion.div
//             variants={fadeUp}
//             className="relative group order-1 md:order-2"
//           >
//             <div className="absolute inset-0 rounded-3xl bg-gradient-to-bl from-[#907B60]/20 to-transparent blur-xl opacity-50 group-hover:opacity-70 transition duration-500" />

//             <motion.img
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.6 }}
//               src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
//               alt="Hotel Services"
//               className="relative rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.15)] h-[350px] sm:h-[450px] w-full object-cover"
//             />
//           </motion.div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiStar,
  FiMapPin,
  FiCoffee,
  FiWifi,
  FiDroplet,
  FiWind,
  FiNavigation,
  FiCalendar,
  FiThumbsUp,
} from "react-icons/fi";
import { FaStar, FaMapMarkerAlt, FaWifi, FaSwimmingPool } from "react-icons/fa";
import img1 from "../../assets/images/img1.webp";
import img2 from "../../assets/images/img2.webp";
import img3 from "../../assets/images/img3.webp";
import img4 from "../../assets/images/img4.webp";
import img5 from "../../assets/images/img5.webp";

export default function HomeSection1() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const scaleIn = {
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
  };

  // Features data
  const features = [
    { icon: FiStar, text: "5-Star Luxury", color: "text-amber-500" },
    { icon: FiMapPin, text: "Prime Locations", color: "text-emerald-500" },
    { icon: FiCoffee, text: "Gourmet Dining", color: "text-orange-500" },
    { icon: FiWifi, text: "High-Speed WiFi", color: "text-blue-500" },
    { icon: FiDroplet, text: "Infinity Pools", color: "text-cyan-500" },
    { icon: FiWind, text: "Spa & Wellness", color: "text-purple-500" },
  ];

  // Amenities data
  const amenities = [
    { icon: FiNavigation, text: "Local Experience Recommendations" },
    { icon: FiCalendar, text: "Personalized Itinerary Assistance" },
    { icon: FiThumbsUp, text: "Why Guests Love Us" },
  ];

  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden bg-gradient-to-b from-[#faf7f2] via-white to-[#faf7f2]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
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
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#907B60]/5 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-40">
        {/* ===== SECTION 1 - LUXURY DISCOVERY ===== */}
        <motion.div
          ref={ref1}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Image Gallery */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {/* LEFT LARGE IMAGE */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="relative group overflow-hidden rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.15)] h-[520px]"
              >
                <img
                  src={img1}
                  alt="Luxury Suite"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Hover Text */}
                <div className="absolute bottom-6 left-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white text-xl tracking-wide font-light">
                    Presidential Suite
                  </p>
                </div>
              </motion.div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-6">
                {/* TOP RIGHT IMAGE */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="relative group overflow-hidden rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.15)] h-2/3"
                >
                  <img
                    src={img2}
                    alt="Infinity Pool"
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                  <div className="absolute bottom-6 left-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white text-lg tracking-wide font-light">
                      Infinity Edge
                    </p>
                  </div>
                </motion.div>

                {/* BOTTOM GLASS CARD */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 border border-white/30 flex flex-col justify-center h-1/3"
                >
                  <p className="text-[#907B60] font-medium text-xs tracking-[3px]">
                    LUXURY REDEFINED
                  </p>

                  <p className="text-4xl font-semibold text-gray-900 mt-2">
                    15+
                  </p>

                  <p className="text-gray-600 text-sm mt-1">
                    Exclusive Locations Worldwide
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={fadeInUp} className="space-y-6">
            {/* Badge */}
            <motion.div variants={scaleIn} className="inline-block">
              <span className="px-5 py-2 bg-[#907B60]/10 text-[#907B60] rounded-full text-sm font-medium tracking-[3px] backdrop-blur-sm">
                ✦ CURATED EXPERIENCES ✦
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-gray-900"
            >
              Discover
              <span className="block font-serif italic text-[#907B60]">
                Extraordinary
              </span>
              Destinations
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 text-lg leading-relaxed max-w-lg"
            >
              Experience refined comfort in an intimate setting where thoughtful
              details and warm hospitality create a truly memorable stay.
              Designed for travelers who appreciate charm, character, and
              personalized service.
            </motion.p>

            {/* Feature Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-4"
            >
              {[
                { icon: FaStar, text: "Boutique Comfort" },
                { icon: FaMapMarkerAlt, text: "Prime Neighborhood Setting" },
                { icon: FaWifi, text: "Complimentary High-Speed WiFi" },
                { icon: FaSwimmingPool, text: "Scenic Relaxation Spaces" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="flex flex-col items-center text-center p-4 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-300"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#907B60]/10 mb-4">
                    <feature.icon className="w-5 h-5 text-[#907B60]" />
                  </div>

                  <span className="text-sm text-gray-800 font-medium tracking-wide">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ===== SECTION 2 - PREMIUM AMENITIES ===== */}
        <motion.div
          ref={ref2}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-10 items-center"
        >
          {/* Content */}
          <motion.div
            variants={fadeInUp}
            className="space-y-5 lg:order-1 order-2"
          >
            <motion.div variants={scaleIn} className="inline-block">
              <span className="px-4 py-2 bg-[#907B60]/10 text-[#907B60] rounded-full text-sm font-medium tracking-wider backdrop-blur-sm">
                ✦ BEYOND EXPECTATION ✦
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-gray-900"
            >
              Where
              <span className=" font-serif italic text-[#907B60]">
                {" "}
                Comfort{" "}
              </span>
              Meets
              <span className=" font-serif italic text-[#907B60]">
                {" "}
                Character{" "}
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-gray-600 text-lg leading-relaxed"
            >
              Indulge in a world of bespoke amenities designed to cater to your
              every whim. From Michelin-starred dining to private wellness
              sanctuaries, we've curated perfection in every corner.
            </motion.p>

            {/* Amenities list */}
            <motion.div variants={staggerContainer} className="space-y-4">
              {[
                "Homemade gourmet breakfast served daily",
                "Personalized host recommendations",
                "High-speed complimentary WiFi",
                "Peaceful and private atmosphere",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-[#907B60] rounded-full" />
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Signature experience */}
            <motion.div
              variants={scaleIn}
              className="relative p-6 bg-gradient-to-br from-[#907B60] to-[#6b5a45] rounded-2xl shadow-2xl mt-8 overflow-hidden group"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"
              />
              <div className="relative z-10">
                <p className="text-white/80 text-sm tracking-wider mb-2">
                  SIGNATURE EXPERIENCE
                </p>
                <p className="text-white text-xl font-light italic">
                  "The attention to detail and personalized service made our
                  stay truly unforgettable."
                </p>
                <p className="text-white/60 mt-4">
                  — Victoria Chen, Travel Connoisseur
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Image collage */}
          <motion.div
            variants={fadeInUp}
            className="relative lg:order-2 order-1"
          >
            <div className="relative h-[600px]">
              {/* Main image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="absolute top-0 right-0 w-3/4 h-[400px] rounded-3xl shadow-2xl overflow-hidden group z-10"
              >
                <img
                  src={img3}
                  alt="Luxury Hotel"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
              </motion.div>

              {/* Secondary image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="absolute bottom-0 left-0 w-2/3 h-[300px] rounded-3xl shadow-2xl overflow-hidden group border-4 border-white"
              >
                <img
                  src={img4}
                  alt="Spa Treatment"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="absolute -bottom-6 right-0 w-64 "
              >
                <img
                  src={img5}
                  alt="Spa Treatment"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
              </motion.div>

              {/* Floating amenities cards */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={inView2 ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="absolute top-20 -left-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-white/20 z-20"
              >
                {amenities.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-[#907B60]" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full h-px bg-gradient-to-r from-transparent via-[#907B60]/30 to-transparent"
        />
      </div>
    </section>
  );
}
