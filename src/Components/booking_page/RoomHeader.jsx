export default function RoomHeader({ room }) {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-xl animate-fadeIn">
      {/* Background Image */}
      <img
        src={room.coverImages?.[0]}
        alt={room.name}
        className="w-full h-[320px] md:h-[450px] lg:h-[200px] object-cover scale-105 animate-[slowZoom_20s_linear_infinite]"
      />

      {/* Gradient Overlay */}

      {/* Content */}
      {/* <div className="absolute inset-0 flex items-end p-4">
        <div className="max-w-3xl px-6 md:px-12 text-white animate-slideUp">
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
            {room.name}
          </h1>

          <p className="mt-4 text-sm md:text-lg text-gray-100 max-w-xl">
            {room.description}
          </p>

          <div className="mt-6 inline-block bg-theme-accent px-6 py-3 rounded-xl text-lg font-semibold shadow-lg backdrop-blur-md">
            £{room.price} <span className="text-sm opacity-80">/ night</span>
          </div>

        </div>
      </div> */}

      {/* Animations */}
      <style>
        {`
          @keyframes slowZoom {
            0% { transform: scale(1.05); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1.05); }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-slideUp {
            animation: slideUp 0.8s ease forwards;
          }

          .animate-fadeIn {
            animation: fadeIn 0.8s ease forwards;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
