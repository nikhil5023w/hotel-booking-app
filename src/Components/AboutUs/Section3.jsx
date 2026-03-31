// export default function AboutWhyChoose() {

//   const points = [
//     "Easy hotel search",
//     "Reliable hotel listings",
//     "Fast booking confirmation",
//     "Simple user interface",
//     "Trusted platform for travelers"
//   ];

//   return (
//     <div className="bg-white py-16">

//       <div className="max-w-6xl mx-auto px-6">

//         <h2 className="text-3xl font-bold text-center mb-10">
//           Why Choose Us
//         </h2>

//         <div className="grid md:grid-cols-2 gap-6">

//           {points.map((point, index) => (
//             <div
//               key={index}
//               className="bg-gray-50 p-4 rounded-lg shadow"
//             >
//               ✔ {point}
//             </div>
//           ))}

//         </div>

//       </div>

//     </div>
//   );
// }

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  CheckCircle2,
  Award,
  Users,
  Clock,
  MapPin,
  Coffee,
  Star,
  Heart,
  Shield,
} from "lucide-react";

export default function AboutWhyChoose() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Enhanced benefits with icons and descriptions
  const benefits = [
    {
      icon: CheckCircle2,
      title: "Curated Selection",
      desc: "Handpicked B&Bs, each with unique character and charm",
      color: "from-amber-400 to-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      icon: Shield,
      title: "Verified Listings",
      desc: "Every property personally inspected for quality",
      color: "from-emerald-400 to-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Clock,
      title: "Instant Confirmation",
      desc: "Book with confidence, receive confirmation immediately",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Users,
      title: "Local Hosts",
      desc: "Authentic hospitality from people who know the area",
      color: "from-rose-400 to-rose-600",
      bgColor: "bg-rose-50",
    },
    {
      icon: Coffee,
      title: "Gourmet Breakfast",
      desc: "Homemade meals featuring local specialties",
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      desc: "Best neighborhoods in town, from city to countryside",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  // Key statistics
  const stats = [
    { value: "15+", label: "Years of Excellence", icon: Award },
    { value: "12k+", label: "Happy Guests", icon: Heart },
    { value: "4.9/5", label: "Guest Rating", icon: Star },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-24 md:py-32 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl" />

        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Section label */}
            <span className="inline-block text-sm font-semibold tracking-wider text-amber-600 uppercase bg-amber-50 px-5 py-2 rounded-full mb-6">
              ✦ Why Travelers Trust Us ✦
            </span>

            {/* Heading */}
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              More Than a Stay,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                A Promise of Quality
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We believe every journey deserves an exceptional home base. That's
              why we personally vet each property and partner only with hosts
              who share our passion for genuine hospitality.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex p-2 bg-white rounded-xl shadow-sm mb-2">
                      <Icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="font-bold text-xl text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm text-gray-600">
                <Shield className="w-4 h-4 text-amber-500" />
                Verified Properties
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm text-gray-600">
                <Heart className="w-4 h-4 text-amber-500" />
                Best Price Guarantee
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm text-gray-600">
                <Clock className="w-4 h-4 text-amber-500" />
                24/7 Support
              </span>
            </div>
          </motion.div>

          {/* Right Column - Benefits Grid */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative">
                    <div
                      className={`inline-flex p-3 rounded-xl ${benefit.bgColor} mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Icon className="w-6 h-6 text-amber-600 group-hover:text-amber-700 transition-colors" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {benefit.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {benefit.desc}
                    </p>

                    {/* Decorative dot */}
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom testimonial snippet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="font-medium">
              Trusted by thousands of travelers worldwide
            </span>
            <Star className="w-4 h-4 text-amber-400 fill-current" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
