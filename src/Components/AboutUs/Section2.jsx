// // export default function AboutFeatures() {

// //   const features = [
// //     {
// //       title: "Wide Range of Hotels",
// //       desc: "Explore hotels from budget stays to luxury resorts."
// //     },
// //     {
// //       title: "Easy Booking",
// //       desc: "Search, compare, and book hotels quickly."
// //     },
// //     {
// //       title: "Trusted Listings",
// //       desc: "We provide verified hotel listings."
// //     },
// //     {
// //       title: "User Friendly",
// //       desc: "Clean interface designed for smooth booking."
// //     }
// //   ];

// //   return (
// //     <div className="bg-white py-16">

// //       <div className="max-w-6xl mx-auto px-6 text-center">

// //         <h2 className="text-3xl font-bold mb-12">What We Offer</h2>

// //         <div className="grid md:grid-cols-4 gap-8">

// //           {features.map((item, index) => (
// //             <div
// //               key={index}
// //               className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition"
// //             >
// //               <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
// //               <p className="text-gray-600">{item.desc}</p>
// //             </div>
// //           ))}

// //         </div>

// //       </div>

// //     </div>
// //   );
// // }

// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import {
//   Building2,
//   CalendarCheck,
//   ShieldCheck,
//   Sparkles,
//   Coffee,
//   MapPin,
//   Heart,
//   Star,
// } from "lucide-react";

// export default function AboutFeatures() {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   // Enhanced features with B&B-focused content and icons
//   const features = [
//     {
//       title: "Curated Boutique Stays",
//       desc: "Handpicked B&Bs and boutique hotels, each with unique character and charm.",
//       icon: Building2,
//       color: "from-amber-400 to-amber-600",
//       bgColor: "bg-amber-50",
//     },
//     {
//       title: "Seamless Booking",
//       desc: "Instant confirmation and flexible reservations designed for peace of mind.",
//       icon: CalendarCheck,
//       color: "from-blue-400 to-blue-600",
//       bgColor: "bg-blue-50",
//     },
//     {
//       title: "Verified Excellence",
//       desc: "Every property is personally vetted for quality, comfort, and hospitality.",
//       icon: ShieldCheck,
//       color: "from-emerald-400 to-emerald-600",
//       bgColor: "bg-emerald-50",
//     },
//     {
//       title: "Personalized Service",
//       desc: "Local hosts, homemade breakfasts, and experiences you won't find anywhere else.",
//       icon: Heart,
//       color: "from-rose-400 to-rose-600",
//       bgColor: "bg-rose-50",
//     },
//   ];

//   // Additional premium features for the bottom row
//   const premiumFeatures = [
//     {
//       title: "Gourmet Breakfast",
//       desc: "Start your day with homemade local specialties",
//       icon: Coffee,
//     },
//     {
//       title: "Prime Locations",
//       desc: "The best neighborhoods, from city centers to countryside",
//       icon: MapPin,
//     },
//     {
//       title: "Guest Love",
//       desc: "4.9 average rating from thousands of happy travelers",
//       icon: Star,
//     },
//     {
//       title: "Curated Experiences",
//       desc: "Exclusive access to local activities and events",
//       icon: Sparkles,
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
//     },
//   };

//   return (
//     <section className="relative bg-gradient-to-b from-white to-gray-50/50 py-24 md:py-32 overflow-hidden">
//       {/* Decorative background elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-amber-100/20 to-transparent" />
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
//         <div className="absolute top-40 left-20 w-72 h-72 bg-amber-100/20 rounded-full blur-3xl" />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//           className="text-center max-w-3xl mx-auto mb-16"
//         >
//           <span className="inline-block text-sm font-semibold tracking-wider text-amber-600 uppercase bg-amber-50 px-5 py-2 rounded-full mb-6">
//             ✦ The B&B Difference ✦
//           </span>
//           <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             Beyond a Stay,
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
//               An Experience
//             </span>
//           </h2>
//           <p className="text-lg text-gray-600 leading-relaxed">
//             Every detail is thoughtfully curated to ensure your stay is
//             comfortable, memorable, and authentically local.
//           </p>
//         </motion.div>

//         {/* Main features grid */}
//         <motion.div
//           ref={ref}
//           variants={containerVariants}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16"
//         >
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             return (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 whileHover={{ y: -8, transition: { duration: 0.3 } }}
//                 className="group relative"
//               >
//                 {/* Card background with gradient hover effect */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-amber-100/50" />

//                 {/* Content */}
//                 <div className="relative p-8">
//                   {/* Icon with gradient background */}
//                   <div
//                     className={`inline-flex p-4 rounded-2xl ${feature.bgColor} mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
//                   >
//                     <Icon
//                       className="w-8 h-8 text-amber-600"
//                       strokeWidth={1.5}
//                     />{" "}
//                   </div>

//                   {/* Title */}
//                   <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
//                     {feature.title}
//                   </h3>

//                   {/* Description */}
//                   <p className="text-gray-600 leading-relaxed">
//                     {feature.desc}
//                   </p>

//                   {/* Decorative corner accent */}
//                   <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-300 rounded-tr-lg" />
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </motion.div>

//         {/* Premium features banner */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
//           className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden"
//         >
//           {/* Background pattern */}
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
//           </div>

//           <div className="relative z-10">
//             <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
//               The Signature Collection
//             </h3>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
//               {premiumFeatures.map((feature, index) => {
//                 const Icon = feature.icon;
//                 return (
//                   <motion.div
//                     key={index}
//                     whileHover={{ scale: 1.05 }}
//                     className="text-center"
//                   >
//                     <div className="inline-flex p-3 bg-white/10 rounded-xl mb-3 backdrop-blur-sm">
//                       <Icon className="w-5 h-5 md:w-6 md:h-6 text-amber-300" />
//                     </div>
//                     <h4 className="text-sm md:text-base font-semibold text-white mb-1">
//                       {feature.title}
//                     </h4>
//                     <p className="text-xs md:text-sm text-gray-300">
//                       {feature.desc}
//                     </p>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>
//         </motion.div>

//         {/* Trust indicators */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1, delay: 1 }}
//           className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
//         >
//           <span className="flex items-center gap-2">
//             <ShieldCheck className="w-4 h-4 text-amber-500" />
//             Verified by B&B Hotel
//           </span>
//           <span className="flex items-center gap-2">
//             <Star className="w-4 h-4 text-amber-500" />
//             4.9/5 Guest Satisfaction
//           </span>
//           <span className="flex items-center gap-2">
//             <Heart className="w-4 h-4 text-amber-500" />
//             15k+ Happy Stays
//           </span>
//         </motion.div>
//       </div>
//     </section>
//   );
// }



import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Building2,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  Coffee,
  MapPin,
  Heart,
  Star,
} from "lucide-react";

export default function AboutFeatures() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      title: "Curated Boutique Stays",
      desc: "Handpicked B&Bs and boutique hotels with unique character and charm.",
      icon: Building2,
      bg: "from-amber-400/20 to-amber-500/10",
      iconColor: "text-amber-600",
    },
    {
      title: "Seamless Booking",
      desc: "Instant confirmation and flexible reservations for peace of mind.",
      icon: CalendarCheck,
      bg: "from-blue-400/20 to-blue-500/10",
      iconColor: "text-blue-600",
    },
    {
      title: "Verified Excellence",
      desc: "Every property personally inspected for comfort and hospitality.",
      icon: ShieldCheck,
      bg: "from-emerald-400/20 to-emerald-500/10",
      iconColor: "text-emerald-600",
    },
    {
      title: "Personalized Service",
      desc: "Local hosts, homemade breakfasts, and authentic experiences.",
      icon: Heart,
      bg: "from-rose-400/20 to-rose-500/10",
      iconColor: "text-rose-600",
    },
  ];

  const premiumFeatures = [
    {
      title: "Gourmet Breakfast",
      desc: "Fresh homemade local specialties",
      icon: Coffee,
    },
    {
      title: "Prime Locations",
      desc: "Best neighborhoods from city to countryside",
      icon: MapPin,
    },
    {
      title: "Guest Love",
      desc: "4.9 average rating from travelers",
      icon: Star,
    },
    {
      title: "Curated Experiences",
      desc: "Exclusive local activities",
      icon: Sparkles,
    },
  ];

  return (
    <section className="relative py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden">

      {/* soft gradient blobs */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-amber-200/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-200/30 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="px-5 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
            The B&B Difference
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Beyond a Stay,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              An Experience
            </span>
          </h2>
          <p className="mt-5 text-gray-600 text-lg">
            Every detail is thoughtfully curated to ensure your stay is comfortable,
            memorable, and authentically local.
          </p>
        </motion.div>
        {/* FEATURE CARDS */}
        <div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-2xl bg-white/70 backdrop-blur-xl p-8 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* gradient glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-amber-100/40 to-transparent rounded-2xl"></div>
                <div className="relative">
                  {/* ICON */}
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.bg} mb-6`}
                  >
                    <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        {/* SIGNATURE COLLECTION */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-12 text-center text-white shadow-2xl"
        >
          <h3 className="text-3xl font-bold mb-10">
            The Signature Collection
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {premiumFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.08 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 backdrop-blur">
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="font-semibold text-lg">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300 text-sm mt-1">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* TRUST BADGES */}
        <div className="mt-20 flex flex-wrap justify-center gap-10 text-gray-600 text-sm">

          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            Verified by B&B Hotel
          </span>

          <span className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            4.9 / 5 Guest Satisfaction
          </span>

          <span className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-amber-500" />
            15k+ Happy Stays
          </span>

        </div>

      </div>
    </section>
  );
}