// import { useEffect, useState } from "react";
// import API from "../services/api.js";
// import RoomCard from "../components/RoomCard.jsx";

// export default function Rooms() {
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       const { data } = await API.get("/rooms");
//       setRooms(data);
//     };

//     fetchRooms();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Available Rooms</h1>

//       <div className="grid md:grid-cols-3 gap-4">
//         {rooms.map((room) => (
//           <RoomCard key={room._id} room={room} />
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import API from "../services/api";

import RoomsHero from "../Components/rooms/RoomsHero";
import RoomsSection1 from "../Components/rooms/RoomsSection1";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await API.get("/rooms");
      setRooms(data);
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <RoomsHero />
      <RoomsSection1 rooms={rooms} />
    </div>
  );
}
