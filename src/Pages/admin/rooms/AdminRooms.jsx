// import { useEffect, useState } from "react";
// import API from "../../../services/api";
// import toast from "react-hot-toast";

// import RoomForm from "./RoomForm";
// import RoomsList from "./RoomsList";

// export default function AdminRooms() {
//   const [rooms, setRooms] = useState([]);
//   const [editingRoomId, setEditingRoomId] = useState(null);

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
//     Object.keys(form).forEach((key) => {
//       if (key === "amenities") {
//         formData.append(key, JSON.stringify(form[key]));
//       } else {
//         formData.append(key, form[key]);
//       }
//     });

//     if (editingRoomId) {
//       await API.put(`/rooms/${editingRoomId}`, formData);
//       toast.success("Room updated 🎉");
//     } else {
//       await API.post("/rooms", formData);
//       toast.success("Room created 🎉");
//     }

//     setEditingRoomId(null);
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

//   return (
//     <div className="space-y-8">
//       <h2 className="text-3xl font-bold">Room Management</h2>

//       <RoomForm
//         form={form}
//         setForm={setForm}
//         handleSubmit={handleSubmit}
//         editingRoomId={editingRoomId}
//         setEditingRoomId={setEditingRoomId}
//       />

//       <RoomsList
//         rooms={rooms}
//         setEditingRoomId={setEditingRoomId}
//         setForm={setForm}
//         deleteRoom={deleteRoom}
//       />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import API from "../../../services/api";
import toast from "react-hot-toast";
import { compressImage } from "../../../utils/compressImage";
import RoomForm from "./RoomForm";
import RoomsList from "./RoomsList";
import { motion, AnimatePresence } from "framer-motion";
export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    roomType: "",
    description: "",
    subDescription: "",
    price: "",
    capacity: "",
    coverImages: [],
    galleryImages: [],
    amenities: [],
  });

  const fetchRooms = async () => {
    const { data } = await API.get("/rooms");
    setRooms(data);
  };

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showForm]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const resetForm = () => {
    setEditingRoomId(null);

    setForm({
      name: "",
      roomType: "",
      description: "",
      subDescription: "",
      price: "",
      capacity: "",
      coverImages: [],
      galleryImages: [],
      amenities: [],
    });
  };
  console.log("Cover images:", form.coverImages);
  console.log("Gallery images:", form.galleryImages);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("roomType", form.roomType);
    formData.append("description", form.description);
    formData.append("subDescription", form.subDescription);
    formData.append("price", form.price);
    formData.append("capacity", form.capacity);

    formData.append("amenities", JSON.stringify(form.amenities));
    // send existing images
    formData.append(
      "existingCoverImages",
      JSON.stringify(form.coverImages.filter((img) => typeof img === "string")),
    );

    formData.append(
      "existingGalleryImages",
      JSON.stringify(
        form.galleryImages.filter((img) => typeof img === "string"),
      ),
    );

    // send new uploaded files
    for (const file of form.coverImages) {
      if (file instanceof File) {
        formData.append("coverImages", file);
      }
    }

    for (const file of form.galleryImages) {
      if (file instanceof File) {
        formData.append("galleryImages", file);
      }
    }

    if (editingRoomId) {
      setUploading(true);

      await API.put(`/rooms/${editingRoomId}`, formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percent);
        },
      });

      setUploading(false);
      setUploadProgress(0);

      toast.success("Room updated 🎉");
    } else {
      setUploading(true);

      await API.post("/rooms", formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percent);
        },
      });

      setUploading(false);
      setUploadProgress(0);
      console.log("Cover images:", form.coverImages);
      console.log("Gallery images:", form.galleryImages);
      toast.success("Room created 🎉");
    }

    setEditingRoomId(null);

    setForm({
      name: "",
      roomType: "",
      description: "",
      subDescription: "",
      price: "",
      capacity: "",
      coverImages: [],
      galleryImages: [],
      amenities: [],
    });

    fetchRooms();
  };
  const deleteRoom = async (id) => {
    if (!confirm("Delete this room?")) return;
    await API.delete(`/rooms/${id}`);
    fetchRooms();
  };

  return (
    <div className=" pt-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold">Room Management</h2>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="px-5 py-2 bg-[#907B60] text-white rounded-xl shadow hover:bg-[#7a6850]"
        >
          Add Room
        </button>
      </div>
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-6"
          onClick={() => {
            setShowForm(false);
            resetForm();
          }}
        >
          {" "}
          <div
            className="relative w-full max-w-4xl mx-auto h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {" "}
            {/* Close button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute -top-10 right-0 text-white text-xl"
            >
              ✕
            </button>
            <RoomForm
              form={form}
              setForm={setForm}
              handleSubmit={(e) => {
                handleSubmit(e);
                setShowForm(false);
              }}
              editingRoomId={editingRoomId}
              setEditingRoomId={setEditingRoomId}
              uploading={uploading}
              uploadProgress={uploadProgress}
              closeForm={() => {
                setShowForm(false);
                resetForm();
              }}
            />
          </div>
        </div>
      )}

      <RoomsList
        rooms={rooms}
        setEditingRoomId={setEditingRoomId}
        setForm={setForm}
        deleteRoom={deleteRoom}
        setShowForm={setShowForm}
      />
      {/* Global Upload Progress Bar */}
      <AnimatePresence>
        {uploading && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-0 left-0 w-full z-[999]"
          >
            <div className="relative h-3 bg-gray-200 overflow-hidden">
              {/* Progress Fill */}
              <motion.div
                className="h-full bg-[#907B60]"
                animate={{ width: `${uploadProgress}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />

              {/* Shimmer Animation */}
              <motion.div
                className="absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "linear",
                }}
              />
            </div>

            {/* Status Text */}
            <div className="bg-black text-white text-center text-xs py-1 tracking-wide">
              Updating Room... {uploadProgress}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
