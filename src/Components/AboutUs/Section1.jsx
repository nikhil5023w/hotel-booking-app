// export default function AboutIntro() {
//   return (
//     <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

//       <img
//         src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
//         alt="hotel"
//         className="rounded-lg shadow-lg"
//       />

//       <div>
//         <h2 className="text-3xl font-bold mb-4">Who We Are</h2>

//         <p className="text-gray-600 mb-4">
//           Our hotel booking platform is designed to simplify travel planning.
//           We connect travelers with trusted hotels and provide a seamless
//           booking experience.
//         </p>

//         <p className="text-gray-600">
//           Whether you're planning a vacation, business trip, or weekend getaway,
//           we help you find the perfect place to stay.
//         </p>
//       </div>

//     </div>
//   );
// }

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AboutIntro() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative bg-white py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Image Column with Premium Frame */}
          <motion.div variants={imageVariants} className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Luxury B&B interior with warm ambiance"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl" />
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl" />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
            >
              <span className="text-sm font-medium text-gray-800">
                ✦ Since 2012
              </span>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div variants={containerVariants} className="space-y-6">
            {/* Section label */}
            <motion.div variants={itemVariants}>
              <span className="inline-block text-sm font-semibold tracking-wider text-amber-600 uppercase bg-amber-50 px-4 py-2 rounded-full">
                Boutique Comfort
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              Boutique Comfort,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                Timeless Hospitality
              </span>
            </motion.h2>

            {/* Description */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 text-gray-600 text-lg leading-relaxed"
            >
              <p>
                Wilton Manor is more than just a place to stay. It’s a
                destination where warm hospitality meets boutique luxury.
              </p>
              <p>
                Each room is carefully designed to offer comfort, elegance, and
                a sense of home — whether you’re visiting for business, romance,
                or a relaxing getaway.
              </p>
            </motion.div>

            {/* Feature List */}
            <motion.div variants={itemVariants} className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Curated boutique rooms with unique character  ",
                  "Fresh homemade breakfast every morning ",
                  "Local host recommendations & hidden gems ",
                  "Personalized guest experiences",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <div className="w-1.5 h-1.5 rounded-full text-amber-500">
                      ✓
                    </div>
                    <span className="text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Decorative line and subtle CTA */}
            <motion.div variants={itemVariants} className="pt-6">
              <div className="h-px w-20 bg-amber-200 mb-6" />
              <p className="text-sm text-gray-500 italic">
                "Experience the difference of genuine hospitality."
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
