import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AboutHero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax effect for background (optional)
  const bgY = scrolled ? 20 : 0;

  return (
    <div className="relative h-screen max-h-[800px] min-h-[600px] w-full overflow-hidden">
      {/* Premium Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out will-change-transform"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            transform: `translateY(${bgY}px)`,
          }}
        />
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        {/* Soft radial overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40" />
      </div>

      {/* Animated floating particles (subtle luxury touch) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.2,
            }}
            animate={{
              y: [null, -30, 30, -30],
              x: [null, 20, -20, 20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Premium badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-block"
          >
            <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-5 py-2 text-sm font-medium text-white border border-white/20 shadow-xl">
              <span className="mr-2 h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              B&B HOTEL · EST. 2024
            </span>
          </motion.div>

          {/* Main heading with word-by-word animation */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white"
          >
            <span className="inline-block overflow-hidden">
              {["Discover", "the ", "Charm", "of"].map((word, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block mr-3 last:mr-0"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5 + idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block bg-gradient-to-tr from-amber-200 via-white to-amber-200 bg-clip-text text-transparent pb-2"
            >
              ❝Wilton Manor❞
            </motion.span>
            Boutique B&B
          </motion.h1>

          {/* Description with fade-in and slide */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white font-light leading-relaxed tracking-wide"
          >
            Experience authentic hospitality, handcrafted comfort, and memorable
            stays in the heart of Beverly Hills.
          </motion.p>

          {/* CTA and stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-amber-200/50"
            >
              <span className="relative z-10">Explore Our Rooms</span>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-amber-200/50"
            >
              <span className="relative z-10">Book Your Stay</span>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </motion.button>

            <div className="flex gap-8 text-white/80">
              <div className="text-left">
                <div className="text-3xl font-bold text-white">150+</div>
                <div className="text-xs uppercase tracking-wider">
                  Luxury B&Bs
                </div>
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-white">12k</div>
                <div className="text-xs uppercase tracking-wider">
                  Happy guests
                </div>
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-white">4.9★</div>
                <div className="text-xs uppercase tracking-wider">
                 Guest Rating
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
      </div>

      {/* Bottom fade for smooth scroll transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
