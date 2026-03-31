// import { useEffect, useState } from "react";
// import API from "../services/api";
// import toast from "react-hot-toast";

// export default function AdminRooms() {
//   const [rooms, setRooms] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     capacity: "",
//     coverImages: [],
//     galleryImages: [],
//     amenities: [],
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

//     const formData = new FormData();

//     formData.append("name", form.name);
//     formData.append("description", form.description);
//     formData.append("price", form.price);
//     formData.append("capacity", form.capacity);

//     form.coverImages.forEach((file) => formData.append("coverImages", file));

//     form.galleryImages.forEach((file) =>
//       formData.append("galleryImages", file),
//     );

//     formData.append("amenities", JSON.stringify(form.amenities));

//     await API.post("/rooms", formData);

//     toast.success("Room created successfully 🎉");

//     setForm({
//       name: "",
//       description: "",
//       price: "",
//       capacity: "",
//       coverImages: [],
//       galleryImages: [],
//       amenities: [],
//     });
//     fetchRooms();
//   };

//   const deleteRoom = async (id) => {
//     if (!confirm("Delete this room?")) return;

//     await API.delete(`/rooms/${id}`);
//     fetchRooms();
//   };

//   const AMENITIES_OPTIONS = [
//     { title: "WiFi", icon: "wifi" },
//     { title: "Parking", icon: "car" },
//     { title: "AC", icon: "snowflake" },
//     { title: "Pool", icon: "water" },
//     { title: "TV", icon: "tv" },
//     { title: "Breakfast", icon: "coffee" },
//     { title: "Gym", icon: "dumbbell" },
//     { title: "Spa", icon: "spa" },
//     { title: "Balcony", icon: "home" },
//   ];

//   return (
//     <div className="space-y-8">
//       <h2 className="text-3xl font-bold">Room Management</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="border p-4 rounded shadow space-y-3 bg-white"
//       >
//         <h3 className="text-xl font-semibold">Create New Room</h3>

//         <input
//           type="text"
//           placeholder="Room Name"
//           className="w-full border p-2 rounded"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           type="text"
//           placeholder="Description"
//           className="w-full border p-2 rounded"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           className="w-full border p-2 rounded"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//         />

//         <input
//           type="number"
//           placeholder="Capacity"
//           className="w-full border p-2 rounded"
//           value={form.capacity}
//           onChange={(e) => setForm({ ...form, capacity: e.target.value })}
//         />
//         <div>
//           <label className="font-medium">Cover Images</label>
//           <input
//             type="file"
//             multiple
//             onChange={(e) =>
//               setForm({ ...form, coverImages: Array.from(e.target.files) })
//             }
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="font-medium">Gallery Images</label>
//           <input
//             type="file"
//             multiple
//             onChange={(e) =>
//               setForm({ ...form, galleryImages: Array.from(e.target.files) })
//             }
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="font-medium mb-2 block">Amenities</label>

//           <div className="grid grid-cols-3 gap-2">
//             {AMENITIES_OPTIONS.map((item) => (
//               <button
//                 type="button"
//                 key={item.title}
//                 onClick={() => {
//                   if (form.amenities.find((a) => a.title === item.title)) {
//                     setForm({
//                       ...form,
//                       amenities: form.amenities.filter(
//                         (a) => a.title !== item.title,
//                       ),
//                     });
//                   } else {
//                     setForm({
//                       ...form,
//                       amenities: [...form.amenities, item],
//                     });
//                   }
//                 }}
//                 className={`border rounded p-2 text-sm ${
//                   form.amenities.find((a) => a.title === item.title)
//                     ? "bg-blue-600 text-white"
//                     : "bg-white"
//                 }`}
//               >
//                 {item.title}
//               </button>
//             ))}
//           </div>
//         </div>

//         <button className="bg-blue-600 text-white px-4 py-2 rounded">
//           Create Room
//         </button>
//       </form>

//       <div>
//         <h3 className="text-xl font-semibold mb-2">All Rooms</h3>

//         <div className="space-y-3">
//           {rooms.map((room) => (
//             <div
//               key={room._id}
//               className="border p-3 rounded flex justify-between items-center bg-white"
//             >
//               <div>
//                 <p className="font-bold">{room.name}</p>
//                 <p className="font-bold">{room.description}</p>
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

// import { useEffect, useState } from "react";
// import API from "../services/api";
// import toast from "react-hot-toast";
// import {
//   FaWifi,
//   FaCar,
//   FaSnowflake,
//   FaSwimmingPool,
//   FaTv,
//   FaCoffee,
//   FaDumbbell,
//   FaSpa,
//   FaHome,
// } from "react-icons/fa";

// export default function AdminRooms() {
//   const [rooms, setRooms] = useState([]);
//   const [editingRoomId, setEditingRoomId] = useState(null);
//   const [customAmenity, setCustomAmenity] = useState("");

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     capacity: "",
//     coverImages: [],
//     galleryImages: [],
//     amenities: [],
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

//     const formData = new FormData();

//     formData.append("name", form.name);
//     formData.append("description", form.description);
//     formData.append("price", form.price);
//     formData.append("capacity", form.capacity);

//     form.coverImages.forEach((file) => formData.append("coverImages", file));

//     form.galleryImages.forEach((file) =>
//       formData.append("galleryImages", file),
//     );

//     formData.append("amenities", JSON.stringify(form.amenities));

//     if (editingRoomId) {
//       await API.put(`/rooms/${editingRoomId}`, formData);
//       toast.success("Room updated successfully 🎉");
//     } else {
//       await API.post("/rooms", formData);
//       toast.success("Room created successfully 🎉");
//     }

//     setEditingRoomId(null);

//     toast.success("Room created successfully 🎉");

//     setForm({
//       name: "",
//       description: "",
//       price: "",
//       capacity: "",
//       coverImages: [],
//       galleryImages: [],
//       amenities: [],
//     });
//     fetchRooms();
//   };

//   const deleteRoom = async (id) => {
//     if (!confirm("Delete this room?")) return;

//     await API.delete(`/rooms/${id}`);
//     fetchRooms();
//   };

//   const AMENITIES_OPTIONS = [
//     { title: "WiFi", icon: <FaWifi /> },
//     { title: "Parking", icon: <FaCar /> },
//     { title: "AC", icon: <FaSnowflake /> },
//     { title: "Pool", icon: <FaSwimmingPool /> },
//     { title: "TV", icon: <FaTv /> },
//     { title: "Breakfast", icon: <FaCoffee /> },
//     { title: "Gym", icon: <FaDumbbell /> },
//     { title: "Spa", icon: <FaSpa /> },
//     { title: "Balcony", icon: <FaHome /> },
//   ];
//   return (
//     <div className="space-y-8">
//       <h2 className="text-3xl font-bold">Room Management</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="border p-4 rounded shadow space-y-3 bg-white"
//       >
//         <h3 className="text-xl font-semibold">
//           {editingRoomId ? "Update Room" : "Create New Room"}
//         </h3>

//         <input
//           type="text"
//           placeholder="Room Name"
//           className="w-full border p-2 rounded"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           type="text"
//           placeholder="Description"
//           className="w-full border p-2 rounded"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           className="w-full border p-2 rounded"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//         />

//         <input
//           type="number"
//           placeholder="Capacity"
//           className="w-full border p-2 rounded"
//           value={form.capacity}
//           onChange={(e) => setForm({ ...form, capacity: e.target.value })}
//         />
//         <div>
//           <label className="font-medium">Cover Images</label>
//           <input
//             type="file"
//             multiple
//             onChange={(e) =>
//               setForm({ ...form, coverImages: Array.from(e.target.files) })
//             }
//             className="w-full border p-2 rounded"
//           />
//           <div className="flex gap-2 flex-wrap mt-2">
//             {form.coverImages.map((file, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={URL.createObjectURL(file)}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setForm({
//                       ...form,
//                       coverImages: form.coverImages.filter(
//                         (_, i) => i !== index,
//                       ),
//                     })
//                   }
//                   className="absolute top-0 right-0 bg-black text-white text-xs px-1 rounded"
//                 >
//                   x
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div>
//           <label className="font-medium">Gallery Images</label>
//           <input
//             type="file"
//             multiple
//             onChange={(e) =>
//               setForm({ ...form, galleryImages: Array.from(e.target.files) })
//             }
//             className="w-full border p-2 rounded"
//           />
//           <div className="flex gap-2 flex-wrap mt-2">
//             {form.galleryImages.map((file, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={URL.createObjectURL(file)}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setForm({
//                       ...form,
//                       galleryImages: form.galleryImages.filter(
//                         (_, i) => i !== index,
//                       ),
//                     })
//                   }
//                   className="absolute top-0 right-0 bg-black text-white text-xs px-1 rounded"
//                 >
//                   x
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div>
//           <label className="font-medium mb-2 block">Amenities</label>

//           <select
//             onChange={(e) => {
//               const selected = AMENITIES_OPTIONS.find(
//                 (a) => a.title === e.target.value,
//               );

//               if (
//                 selected &&
//                 !form.amenities.find((a) => a.title === selected.title)
//               ) {
//                 setForm({
//                   ...form,
//                   amenities: [...form.amenities, selected],
//                 });
//               }
//             }}
//             className="border p-2 rounded w-full mb-2"
//           >
//             <option>Select amenity</option>
//             {AMENITIES_OPTIONS.map((item) => (
//               <option key={item.title}>{item.title}</option>
//             ))}
//           </select>

//           {/* Custom input */}
//           <div className="flex gap-2 mb-2">
//             <input
//               type="text"
//               placeholder="Custom amenity"
//               value={customAmenity}
//               onChange={(e) => setCustomAmenity(e.target.value)}
//               className="border p-2 rounded w-full"
//             />

//             <button
//               type="button"
//               onClick={() => {
//                 if (customAmenity) {
//                   setForm({
//                     ...form,
//                     amenities: [...form.amenities, { title: customAmenity }],
//                   });
//                   setCustomAmenity("");
//                 }
//               }}
//               className="bg-blue-600 text-white px-3 rounded"
//             >
//               Add
//             </button>
//           </div>

//           {/* Selected chips */}
//           <div className="flex gap-2 flex-wrap">
//             {form.amenities.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-blue-100 px-3 py-1 rounded flex items-center gap-2"
//               >
//                 {item.title}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setForm({
//                       ...form,
//                       amenities: form.amenities.filter((_, i) => i !== index),
//                     })
//                   }
//                   className="text-red-500 font-bold"
//                 >
//                   x
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button className="bg-blue-600 text-white px-4 py-2 rounded">
//           Create Room
//         </button>
//         {editingRoomId && (
//           <button
//             type="button"
//             onClick={() => {
//               setEditingRoomId(null);
//               setForm({
//                 name: "",
//                 description: "",
//                 price: "",
//                 capacity: "",
//                 coverImages: [],
//                 galleryImages: [],
//                 amenities: [],
//               });
//             }}
//             className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
//           >
//             Cancel
//           </button>
//         )}
//       </form>

//       <div>
//         <h3 className="text-xl font-semibold mb-2">All Rooms</h3>

//         <div className="space-y-3">
//           {rooms.map((room) => (
//             <div
//               key={room._id}
//               className="border p-3 rounded flex justify-between items-center bg-white"
//             >
//               <div>
//                 <p className="font-bold">{room.name}</p>
//                 <p className="font-bold">{room.description}</p>
//                 <p>£{room.price}</p>
//               </div>
//               <button
//                 onClick={() => {
//                   setEditingRoomId(room._id);
//                   setForm({
//                     name: room.name,
//                     description: room.description,
//                     price: room.price,
//                     capacity: room.capacity,
//                     coverImages: [],
//                     galleryImages: [],
//                     amenities: room.amenities || [],
//                   });
//                 }}
//                 className="bg-green-600 text-white px-3 py-1 rounded mr-2"
//               >
//                 Update
//               </button>
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
