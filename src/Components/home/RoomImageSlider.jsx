// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// export default function RoomImageSlider({ images = [], alt }) {
//   const imgs =
//     images && images.length
//       ? images
//       : ["https://images.unsplash.com/photo-1618773928121-c32242e63f39"];

//   const duplicated = [...imgs, ...imgs, ...imgs]; // triple images

//   const [index, setIndex] = useState(imgs.length); // start from middle set

//   useEffect(() => {
//     if (imgs.length <= 1) return;

//     const interval = setInterval(() => {
//       setIndex((prev) => prev + 1);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [imgs.length]);

//   useEffect(() => {
//     if (index >= imgs.length * 2) {
//       setIndex(imgs.length);
//     }
//   }, [index, imgs.length]);

//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       <motion.div
//         animate={{ x: `-${index * 100}%` }}
//         transition={{ duration: 0.8, ease: "easeInOut" }}
//         className="flex w-full h-full"
//       >
//         {duplicated.map((img, i) => (
//           <img
//             key={i}
//             src={img}
//             alt={alt}
//             className="w-full h-full object-cover flex-shrink-0"
//           />
//         ))}
//       </motion.div>

//       {imgs.length > 1 && (
//         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
//           {imgs.map((_, i) => (
//             <div
//               key={i}
//               className={`w-2 h-2 rounded-full ${
//                 i === index % imgs.length ? "bg-white" : "bg-white/40"
//               }`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function RoomImageSlider({ images = [], alt }) {
  const imgs =
    images && images.length
      ? images
      : ["https://images.unsplash.com/photo-1618773928121-c32242e63f39"];

  const duplicated = [...imgs, ...imgs, ...imgs];

  const [index, setIndex] = useState(imgs.length);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    if (imgs.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [imgs.length]);

  useEffect(() => {
    if (index >= imgs.length * 2) {
      setTimeout(() => {
        setTransition(false);
        setIndex(imgs.length);
      }, 800); // wait until animation finishes

      setTimeout(() => {
        setTransition(true);
      }, 850);
    }
  }, [index, imgs.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.div
        animate={{ x: `-${index * 100}%` }}
        transition={transition ? { duration: 0.8, ease: "easeInOut" } : { duration: 0 }}
        className="flex w-full h-full"
      >
        {duplicated.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={alt}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </motion.div>

      {imgs.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          {imgs.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index % imgs.length ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}