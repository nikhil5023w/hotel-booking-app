import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AboutHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
        alt="Hotel"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-white"
        >
          <p className="text-sm tracking-widest text-theme-accent mb-4">
            WELCOME TO WILTON MANOR
          </p>

          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6">
            Where Luxury
            <span className="block font-serif italic text-theme-accent">
              Meets Comfort
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Experience timeless elegance, warm hospitality, and beautifully
            designed rooms crafted for unforgettable stays.
          </p>
        </motion.div>
      </div>

    </section>
  );
}