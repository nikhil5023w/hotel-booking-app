// export default function Home() {
//   return (
//     <div className="text-center py-20">
//       <h1 className="text-5xl font-bold mb-4">Luxury Stay Experience</h1>
//       <p className="text-gray-600 mb-6">
//         Book your perfect stay with secure online booking
//       </p>
//       <a
//         href="/rooms"
//         className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
//       >
//         Browse Rooms
//       </a>
//     </div>
//   );
// }
import HomeHero from "../Components/home/HomeHero";
import HomeSection1 from "../Components/home/HomeSection1";
import FeaturedRooms from "../Components/home/FeaturedRooms";

export default function Home() {
  return (
    <div className="space-y-16">

      <HomeHero />

      <HomeSection1 />

      <FeaturedRooms />


    </div>
  );
}