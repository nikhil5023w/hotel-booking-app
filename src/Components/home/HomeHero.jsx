import { Link } from "react-router-dom";
import img from "../../assets/images/Home_Hero.webp";

export default function HomeHero() {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
      {" "}
      {/* Background Image */}
      <img
        src={img}
        alt="Luxury Hotel"
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-[slowZoom_20s_linear_infinite]"
      />
      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div> */}
      {/* Soft vignette */}
      <div className="absolute inset-0 bg-black/10 backdrop-brightness-75"></div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 md:px-10 text-white animate-fadeIn">
        {/* Tag */}
        <span className="mb-4 px-4 py-1 text-sm tracking-wide uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
          Luxury Hotel Experience
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6 max-w-4xl">
          Find Your Perfect Stay
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10">
          Discover elegant rooms, world-class comfort, and seamless booking —
          designed to make every stay unforgettable.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Primary CTA */}
          <Link
            to="/rooms"
            className="px-8 py-3 rounded-xl bg-[#907B60] text-white font-medium shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300"
          >
            Browse Rooms
          </Link>

          {/* Secondary CTA */}
          <Link
            to="/about"
            className="px-8 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 transition duration-300"
          >
            Explore Experience
          </Link>
        </div>
      </div>
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
      {/* Custom animation */}
      <style>
        {`
          @keyframes slowZoom {
            0% { transform: scale(1.05); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1.05); }
          }
        `}
      </style>
    </section>
  );
}
