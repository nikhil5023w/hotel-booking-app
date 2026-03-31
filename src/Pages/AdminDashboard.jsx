// import { useEffect, useState } from "react";
// import API from "../services/api.js";
// import toast from "react-hot-toast";

// export default function AdminDashboard() {
//   const [rooms, setRooms] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     capacity: "",
//   });

//   const fetchRooms = async () => {
//     const { data } = await API.get("/rooms");
//     setRooms(data);
//   };

//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await API.post("/rooms", form);

//     alert("Room created successfully 🎉");

//     setForm({ name: "", description: "", price: "", capacity: "" });

//     fetchRooms();
//   };

//   const deleteRoom = async (id) => {
//     if (!confirm("Delete this room?")) return;

//     await API.delete(`/rooms/${id}`);
//     fetchRooms();
//   };

//   return (
//     <div className="space-y-8">
//       <h2 className="text-3xl font-bold">Admin Dashboard</h2>

//       {/* CREATE ROOM FORM */}
//       <form
//         onSubmit={handleSubmit}
//         className="border p-4 rounded shadow space-y-3"
//       >
//         <h3 className="text-xl font-semibold">Create New Room</h3>

//         <input
//           type="text"
//           placeholder="Room Name"
//           className="w-full border p-2"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           type="text"
//           placeholder="Description"
//           className="w-full border p-2"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           className="w-full border p-2"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//         />

//         <input
//           type="number"
//           placeholder="Capacity"
//           className="w-full border p-2"
//           value={form.capacity}
//           onChange={(e) => setForm({ ...form, capacity: e.target.value })}
//         />

//         <button className="bg-blue-600 text-white px-4 py-2 rounded">
//           Create Room
//         </button>
//       </form>

//       {/* ROOM LIST */}
//       <div>
//         <h3 className="text-xl font-semibold mb-2">All Rooms</h3>

//         <div className="space-y-3">
//           {rooms.map((room) => (
//             <div
//               key={room._id}
//               className="border p-3 rounded flex justify-between items-center"
//             >
//               <div>
//                 <p className="font-bold">{room.name}</p>
//                 <p>£{room.price}</p>
//               </div>

//               <button
//                 onClick={() => deleteRoom(room._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
