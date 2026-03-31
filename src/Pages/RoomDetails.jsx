// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import API from "../services/api";
// import toast from "react-hot-toast";
// import AvailabilityCalendar from "../components/AvailabilityCalendar";
// import {
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaBirthdayCake,
//   FaCalendarAlt,
//   FaCreditCard,
//   FaCheckCircle,
// } from "react-icons/fa";

// export default function RoomDetails() {
//   const { user } = useContext(AuthContext);
//   const [errors, setErrors] = useState({});
//   const [guest, setGuest] = useState({
//     fullName: "",
//     phone: "",
//     email: "",
//     age: "",
//   });
//   const [idProof, setIdProof] = useState(null);
//   const { id } = useParams();
//   const [room, setRoom] = useState(null);
//   const [dates, setDates] = useState(null);
//   const [showSummary, setShowSummary] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [acceptedTerms, setAcceptedTerms] = useState(false);

//   useEffect(() => {
//     const fetchRoom = async () => {
//       const { data } = await API.get(`/rooms/${id}`);
//       setRoom(data);
//     };
//     fetchRoom();
//   }, [id]);

//   useEffect(() => {
//     const loadGuestDetails = async () => {
//       try {
//         setGuest((prev) => ({
//           ...prev,
//           fullName: user?.name || "",
//           email: user?.email || "",
//         }));
//         const res = await API.get("/bookings/guest-details/last");
//         if (res.data) {
//           setGuest({
//             fullName: res.data.fullName || user?.name || "",
//             phone: res.data.phone || "",
//             email: res.data.email || user?.email || "",
//             age: res.data.age || "",
//           });
//         }
//       } catch (error) {
//         console.error("Failed to load guest details");
//       }
//     };
//     loadGuestDetails();
//   }, [user]);

//   const handleChange = (e) => {
//     setGuest({ ...guest, [e.target.name]: e.target.value });
//     setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const MAX_SIZE = 10 * 1024 * 1024; // 10MB
//     if (file.size > MAX_SIZE) {
//       setErrors((prev) => ({
//         ...prev,
//         idProof: "File must be less than 10MB",
//       }));
//       setIdProof(null);
//       return;
//     }
//     setIdProof(file);
//     setErrors((prev) => ({ ...prev, idProof: "" }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!guest.fullName) newErrors.fullName = "Full name is required";
//     if (!guest.phone) newErrors.phone = "Phone number is required";
//     if (!guest.email) newErrors.email = "Email is required";
//     if (!guest.age) newErrors.age = "Age is required";
//     if (!idProof) newErrors.idProof = "ID proof is required";
//     if (!dates?.startDate || !dates?.endDate) {
//       newErrors.dates = "Select dates";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const isFormValid =
//     guest.fullName &&
//     guest.phone &&
//     guest.email &&
//     guest.age &&
//     idProof &&
//     dates?.startDate &&
//     dates?.endDate;

//   const handlePayment = async () => {
//     if (!validateForm()) return;
//     setShowSummary(true);
//     try {
//       const formData = new FormData();
//       formData.append("roomId", id);
//       formData.append("checkInDate", dates.startDate);
//       formData.append("checkOutDate", dates.endDate);
//       formData.append("fullName", guest.fullName);
//       formData.append("phone", guest.phone);
//       formData.append("email", guest.email);
//       formData.append("age", guest.age);
//       formData.append("idProof", idProof);
//       const { data } = await API.post("/payments/checkout", formData);
//       window.location.href = data.url;
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Payment failed");
//     }
//   };
//   if (!room)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );

//   const confirmPayment = async () => {
//     if (!acceptedTerms) {
//       toast.error("Please accept terms & conditions");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();

//       formData.append("roomId", id);
//       formData.append("checkInDate", dates.startDate);
//       formData.append("checkOutDate", dates.endDate);

//       formData.append("fullName", guest.fullName);
//       formData.append("phone", guest.phone);
//       formData.append("email", guest.email);
//       formData.append("age", guest.age);

//       formData.append("idProof", idProof);

//       const { data } = await API.post("/payments/checkout", formData);

//       window.location.href = data.url;
//     } catch (error) {
//       toast.error("Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10">
//       <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <h2 className="text-2xl font-bold">{room.name}</h2>
//         <p className="mb-2">{room.description}</p>
//         <p className="font-semibold">£{room.price} per night</p>

//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Select Stay Dates</h3>
//           <AvailabilityCalendar roomId={room._id} onSelect={setDates} />
//           {dates && (
//             <p className="text-sm text-gray-600 mt-2">
//               Selected: {new Date(dates.startDate).toLocaleDateString()} →{" "}
//               {new Date(dates.endDate).toLocaleDateString()}
//             </p>
//           )}
//           {errors.dates && (
//             <p className="text-red-500 text-sm">{errors.dates}</p>
//           )}
//         </div>
//         <div className="mt-8 bg-white/90 backdrop-blur border border-gray-200 p-6 rounded-2xl shadow-lg space-y-5">
//           <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
//             Guest Details
//           </h3>

//           {/* Full Name */}
//           <div className="relative">
//             <span className="absolute left-3 top-3 text-gray-400">👤</span>
//             <input
//               name="fullName"
//               placeholder="Full Name"
//               value={guest.fullName}
//               onChange={handleChange}
//               className="pl-10 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 p-3 w-full rounded-lg outline-none transition"
//             />
//             {errors.fullName && (
//               <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
//             )}
//           </div>

//           {/* Phone */}
//           <div className="relative">
//             <span className="absolute left-3 top-3 text-gray-400">📞</span>
//             <input
//               name="phone"
//               placeholder="Phone Number"
//               value={guest.phone}
//               onChange={handleChange}
//               className="pl-10 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 p-3 w-full rounded-lg outline-none transition"
//             />
//             {errors.phone && (
//               <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div className="relative">
//             <span className="absolute left-3 top-3 text-gray-400">✉️</span>
//             <input
//               name="email"
//               placeholder="Email Address"
//               value={guest.email}
//               onChange={handleChange}
//               className="pl-10 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 p-3 w-full rounded-lg outline-none transition"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//             )}
//           </div>

//           {/* Age */}
//           <div className="relative">
//             <span className="absolute left-3 top-3 text-gray-400">🎂</span>
//             <input
//               name="age"
//               type="number"
//               placeholder="Age"
//               value={guest.age}
//               onChange={handleChange}
//               className="pl-10 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 p-3 w-full rounded-lg outline-none transition"
//             />
//             {errors.age && (
//               <p className="text-red-500 text-sm mt-1">{errors.age}</p>
//             )}
//           </div>

//           {/* File Upload */}
//           <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition">
//             <label className="block text-sm font-medium text-gray-600 mb-2">
//               Upload ID Proof
//             </label>

//             <input
//               type="file"
//               accept="image/jpeg,image/png,image/webp"
//               onChange={handleFileChange}
//               className="w-full"
//             />

//             <p className="text-xs text-gray-500 mt-1">
//               Accepted formats: JPG, PNG, WEBP • Max 10MB
//             </p>

//             {idProof && (
//               <p className="text-green-600 text-sm mt-2">
//                 ✅ {idProof.name} selected
//               </p>
//             )}

//             {errors.idProof && (
//               <p className="text-red-500 text-sm mt-1">{errors.idProof}</p>
//             )}
//           </div>
//         </div>

//         <button
//           onClick={handlePayment}
//           disabled={!isFormValid}
//           className={`mt-6 w-full py-3 rounded-xl text-lg font-semibold transition-all shadow-md ${
//             isFormValid
//               ? "bg-gradient-to-r from-green-600 to-emerald-500 hover:scale-[1.02] text-white"
//               : "bg-gray-300 text-gray-500 cursor-not-allowed"
//           }`}
//         >
//           💳 Pay & Book Now
//         </button>
//         {showSummary && (
//           <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             {/* Animated modal */}
//             <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl transform transition-all duration-300 scale-100 animate-[fadeIn_.2s_ease]">
//               <h3 className="text-xl font-bold mb-4">Booking Summary</h3>

//               <p>
//                 <strong>Room:</strong> {room.name}
//               </p>
//               <p>
//                 <strong>Stay:</strong>{" "}
//                 {new Date(dates.startDate).toLocaleDateString()} →{" "}
//                 {new Date(dates.endDate).toLocaleDateString()}
//               </p>

//               <p>
//                 <strong>Guest:</strong> {guest.fullName}
//               </p>
//               <p>
//                 <strong>Email:</strong> {guest.email}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {guest.phone}
//               </p>

//               {/* Price calculation */}
//               <p className="mt-3 font-semibold text-lg">
//                 Total: £
//                 {(
//                   ((new Date(dates.endDate) - new Date(dates.startDate)) /
//                     (1000 * 60 * 60 * 24)) *
//                   room.price
//                 ).toFixed(2)}
//               </p>

//               {/* Cancellation policy */}
//               <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
//                 <p className="font-semibold mb-1">Cancellation Policy</p>
//                 <p>✔ Free cancellation up to 48 hours before check-in</p>
//                 <p>✔ 50% refund within 24 hours</p>
//                 <p>❌ No refund after check-in date</p>
//               </div>

//               {/* Terms checkbox */}
//               <div className="mt-4 flex items-start gap-2">
//                 <input
//                   type="checkbox"
//                   checked={acceptedTerms}
//                   onChange={(e) => setAcceptedTerms(e.target.checked)}
//                   className="mt-1"
//                 />
//                 <p className="text-sm">
//                   I agree to the terms, cancellation policy, and hotel rules.
//                 </p>
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-end gap-3 mt-5">
//                 <button
//                   onClick={() => setShowSummary(false)}
//                   className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={confirmPayment}
//                   disabled={loading}
//                   className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
//                 >
//                   {loading && (
//                     <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                   )}
//                   {loading ? "Processing..." : "Confirm & Pay"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import API from "../services/api";
// import toast from "react-hot-toast";
// import AvailabilityCalendar from "../components/AvailabilityCalendar";
// import {
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaBirthdayCake,
//   FaCalendarAlt,
//   FaCreditCard,
//   FaCheckCircle,
// } from "react-icons/fa";
// import imageCompression from "browser-image-compression";

// export default function RoomDetails() {
//   const { user } = useContext(AuthContext);
//   const [errors, setErrors] = useState({});
//   const [guest, setGuest] = useState({
//     fullName: "",
//     phone: "",
//     email: "",
//     age: "",
//   });
//   const [idProof, setIdProof] = useState(null);
//   const { id } = useParams();
//   const [room, setRoom] = useState(null);
//   const [dates, setDates] = useState(null);
//   const [showSummary, setShowSummary] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [docType, setDocType] = useState("");
//   const [customDocName, setCustomDocName] = useState("");

//   useEffect(() => {
//     const fetchRoom = async () => {
//       const { data } = await API.get(`/rooms/${id}`);
//       setRoom(data);
//     };
//     fetchRoom();
//   }, [id]);

//   useEffect(() => {
//     const loadGuestDetails = async () => {
//       try {
//         setGuest((prev) => ({
//           ...prev,
//           fullName: user?.name || "",
//           email: user?.email || "",
//         }));
//         const res = await API.get("/bookings/guest-details/last");
//         if (res.data) {
//           setGuest({
//             fullName: res.data.fullName || user?.name || "",
//             phone: res.data.phone || "",
//             email: res.data.email || user?.email || "",
//             age: res.data.age || "",
//           });
//         }
//       } catch (error) {
//         console.error("Failed to load guest details");
//       }
//     };
//     loadGuestDetails();
//   }, [user]);

//   const handleChange = (e) => {
//     setGuest({ ...guest, [e.target.name]: e.target.value });
//     setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const MAX_SIZE = 10 * 1024 * 1024;

//     const allowedTypes = [
//       "image/jpeg",
//       "image/png",
//       "image/webp",
//       "application/pdf",
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       setErrors((prev) => ({
//         ...prev,
//         idProof: "Only JPG, PNG, WEBP or PDF files are allowed",
//       }));
//       setIdProof(null);
//       return;
//     }

//     if (file.size > MAX_SIZE) {
//       setErrors((prev) => ({
//         ...prev,
//         idProof: "File size exceeds 10MB limit",
//       }));
//       setIdProof(null);
//       return;
//     }

//     try {
//       setUploadProgress(10);

//       // If image → compress
//       if (file.type.startsWith("image/")) {
//         const options = {
//           maxSizeMB: 1,
//           maxWidthOrHeight: 1920,
//           useWebWorker: true,
//         };

//         const compressedFile = await imageCompression(file, options);

//         setUploadProgress(80);
//         setIdProof(compressedFile);
//       } else {
//         setUploadProgress(80);
//         setIdProof(file);
//       }

//       setErrors((prev) => ({ ...prev, idProof: "" }));
//       setUploadProgress(100);

//       setTimeout(() => setUploadProgress(0), 1500);
//     } catch (error) {
//       setErrors((prev) => ({
//         ...prev,
//         idProof: "Failed to process file",
//       }));
//       setUploadProgress(0);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!guest.fullName) newErrors.fullName = "Full name is required";
//     if (!guest.phone) newErrors.phone = "Phone number is required";
//     if (!guest.email) newErrors.email = "Email is required";
//     if (!guest.age) newErrors.age = "Age is required";
//     if (!idProof) newErrors.idProof = "ID proof is required";
//     if (!docType) newErrors.docType = "Select document type";
//     if (docType === "Other" && !customDocName)
//       newErrors.customDocName = "Enter document name";
//     if (!dates?.startDate || !dates?.endDate) {
//       newErrors.dates = "Select dates";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const isFormValid =
//     guest.fullName &&
//     guest.phone &&
//     guest.email &&
//     guest.age &&
//     idProof &&
//     dates?.startDate &&
//     dates?.endDate &&
//     docType &&
//     (docType !== "Other" || customDocName);

//   const handlePayment = async () => {
//     if (!validateForm()) return;
//     setShowSummary(true);
//     try {
//       const formData = new FormData();
//       formData.append("roomId", id);
//       formData.append("checkInDate", dates.startDate);
//       formData.append("checkOutDate", dates.endDate);
//       formData.append("fullName", guest.fullName);
//       formData.append("phone", guest.phone);
//       formData.append("email", guest.email);
//       formData.append("age", guest.age);
//       formData.append("idProof", idProof);
//       formData.append(
//         "documentType",
//         docType === "Other" ? customDocName : docType,
//       );
//       const { data } = await API.post("/payments/checkout", formData);
//       window.location.href = data.url;
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Payment failed");
//     }
//   };
//   if (!room)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );

//   const confirmPayment = async () => {
//     if (!acceptedTerms) {
//       toast.error("Please accept terms & conditions");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();

//       formData.append("roomId", id);
//       formData.append("checkInDate", dates.startDate);
//       formData.append("checkOutDate", dates.endDate);

//       formData.append("fullName", guest.fullName);
//       formData.append("phone", guest.phone);
//       formData.append("email", guest.email);
//       formData.append("age", guest.age);

//       formData.append("idProof", idProof);
//       formData.append(
//         "documentType",
//         docType === "Other" ? customDocName : docType,
//       );
//       const { data } = await API.post("/payments/checkout", formData);

//       window.location.href = data.url;
//     } catch (error) {
//       toast.error("Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10">
//       <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* LEFT CONTENT */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Image Slider */}
//           <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
//             <img
//               src={room.coverImages?.[0] || "https://picsum.photos/800/400"}
//               alt={room.name}
//               className="w-full h-[320px] object-cover object-center"
//             />
//           </div>
//           {/* Room Card */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 border space-y-2">
//             <h2 className="text-3xl font-bold text-gray-800">{room.name}</h2>
//             <p className="text-gray-600 mt-1">{room.description}</p>
//             <p className="mt-3 text-2xl font-bold text-green-600">
//               £{room.price}
//               <span className="text-gray-500 text-sm ml-1">/ night</span>
//             </p>
//           </div>
//           {/* Amenities */}
//           {room.amenities?.length > 0 && (
//             <div className="bg-white p-6 rounded-2xl shadow border">
//               <h3 className="text-lg font-semibold mb-3">Amenities</h3>

//               <div className="flex flex-wrap gap-2">
//                 {room.amenities.map((item, index) => (
//                   <span
//                     key={index}
//                     className="bg-gray-100 px-3 py-1 rounded-full text-sm"
//                   >
//                     {item.title}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//           <div className="bg-white p-6 rounded-2xl shadow border">
//             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//               <FaCalendarAlt /> Select Your Stay
//             </h3>
//             <AvailabilityCalendar roomId={room._id} onSelect={setDates} />
//           </div>
//           {/* Guest Form */}
//           <div className="bg-white p-6 rounded-2xl shadow border space-y-4">
//             <h3 className="text-lg font-semibold flex items-center gap-2">
//               <FaUser /> Guest Details
//             </h3>

//             <div className="relative">
//               <FaUser className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 name="fullName"
//                 placeholder="Full Name"
//                 value={guest.fullName}
//                 onChange={handleChange}
//                 className="pl-10 border p-3 w-full rounded-lg"
//               />
//             </div>

//             <div className="relative">
//               <FaPhone className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 name="phone"
//                 placeholder="Phone Number"
//                 value={guest.phone}
//                 onChange={handleChange}
//                 className="pl-10 border p-3 w-full rounded-lg"
//               />
//             </div>

//             <div className="relative">
//               <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 name="email"
//                 placeholder="Email"
//                 value={guest.email}
//                 onChange={handleChange}
//                 className="pl-10 border p-3 w-full rounded-lg"
//               />
//             </div>

//             <div className="relative">
//               <FaBirthdayCake className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 name="age"
//                 type="number"
//                 placeholder="Age"
//                 value={guest.age}
//                 onChange={handleChange}
//                 className="pl-10 border p-3 w-full rounded-lg"
//               />
//             </div>

//             {/* File upload */}
//             <div className="border border-dashed rounded-xl p-4 bg-gray-50 space-y-2">
//               {/* Document Type */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">
//                   Select Document Type
//                 </label>

//                 <select
//                   value={docType}
//                   onChange={(e) => setDocType(e.target.value)}
//                   className="w-full border p-3 rounded-lg"
//                 >
//                   <option value="">Select document</option>
//                   <option value="Passport">Passport</option>
//                   <option value="Driving Licence">UK Driving Licence</option>
//                   <option value="National ID">National ID Card</option>
//                   <option value="Residence Permit">
//                     Residence Permit / BRP
//                   </option>
//                   <option value="Student ID">Student ID</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               {/* Custom document input */}
//               {docType === "Other" && (
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">
//                     Enter Document Name
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter document name"
//                     value={customDocName}
//                     onChange={(e) => setCustomDocName(e.target.value)}
//                     className="w-full border p-3 rounded-lg"
//                   />
//                 </div>
//               )}
//               <label className="text-sm font-medium text-gray-700">
//                 Upload ID Proof
//               </label>

//               <input
//                 type="file"
//                 accept="image/jpeg,image/png,image/webp,application/pdf"
//                 onChange={handleFileChange}
//                 className="block w-full text-sm"
//               />

//               <p className="text-xs text-gray-500">
//                 JPG / PNG / WEBP / PDF • Max size 10MB • Images auto compressed
//               </p>

//               {/* Progress bar */}
//               {uploadProgress > 0 && (
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-green-600 h-2 rounded-full transition-all"
//                     style={{ width: `${uploadProgress}%` }}
//                   ></div>
//                 </div>
//               )}

//               {/* Selected file */}
//               {idProof && (
//                 <p className="text-sm text-green-600">✅ {idProof.name}</p>
//               )}

//               {/* Error */}
//               {errors.idProof && (
//                 <p className="text-sm text-red-500">⚠ {errors.idProof}</p>
//               )}
//             </div>
//           </div>
//         </div>
//         {/* RIGHT SIDEBAR */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-24 bg-white rounded-2xl shadow-xl p-6 border space-y-4 hover:shadow-2xl transition">
//             {" "}
//             <h3 className="text-xl font-bold text-gray-800">
//               Reservation Summary
//             </h3>
//             <p className="text-gray-700">
//               Room :{" "}
//               <span className="text-gary-800 font-semibold">{room.name}</span>
//             </p>
//             {dates && (
//               <>
//                 <p className="text-sm text-gray-600">
//                   Checkin Date:{" "}
//                   <span className="text-gary-800 font-semibold">
//                     {new Date(dates.startDate).toLocaleDateString()}
//                   </span>{" "}
//                   <br /> Checkout Date:{" "}
//                   <span className="text-gary-800 font-semibold">
//                     {new Date(dates.endDate).toLocaleDateString()}
//                   </span>
//                 </p>

//                 <p className="text-sm text-gray-600">
//                   Nights:{" "}
//                   <span className="text-gary-800 font-semibold">
//                     {Math.ceil(
//                       (new Date(dates.endDate) - new Date(dates.startDate)) /
//                         (1000 * 60 * 60 * 24),
//                     )}
//                   </span>
//                 </p>
//               </>
//             )}
//             <div className="border-t pt-3">
//               <p className="flex justify-between">
//                 <span>Room price</span>
//                 <span>£{room.price}</span>
//               </p>

//               {dates && (
//                 <p className="flex justify-between font-semibold text-lg mt-2">
//                   <span>Total</span>
//                   <span>
//                     £
//                     {(
//                       ((new Date(dates.endDate) - new Date(dates.startDate)) /
//                         (1000 * 60 * 60 * 24)) *
//                       room.price
//                     ).toFixed(2)}
//                   </span>
//                 </p>
//               )}
//             </div>
//             <button
//               onClick={handlePayment}
//               disabled={!isFormValid}
//               className={`w-full py-3 rounded-xl font-semibold transition ${
//                 isFormValid
//                   ? "bg-green-600 text-white hover:bg-green-700 shadow"
//                   : "bg-gray-300 text-gray-500"
//               }`}
//             >
//               <FaCreditCard className="inline mr-2" /> Continue
//             </button>
//           </div>
//         </div>
//         {showSummary && (
//           <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             {/* Animated modal */}
//             <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
//               <h3 className="text-xl font-bold mb-4">Booking Summary</h3>

//               <p>
//                 <strong>Room:</strong> {room.name}
//               </p>
//               <p>
//                 <strong>Stay:</strong>{" "}
//                 {new Date(dates.startDate).toLocaleDateString()} →{" "}
//                 {new Date(dates.endDate).toLocaleDateString()}
//               </p>

//               <p>
//                 <strong>Guest:</strong> {guest.fullName}
//               </p>
//               <p>
//                 <strong>Email:</strong> {guest.email}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {guest.phone}
//               </p>
//               <p>
//                 <strong>Document:</strong>{" "}
//                 {docType === "Other" ? customDocName : docType}
//               </p>
//               {/* Price calculation */}
//               <p className="mt-3 font-semibold text-lg">
//                 Total: £
//                 {(
//                   ((new Date(dates.endDate) - new Date(dates.startDate)) /
//                     (1000 * 60 * 60 * 24)) *
//                   room.price
//                 ).toFixed(2)}
//               </p>

//               {/* Cancellation policy */}
//               <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
//                 <p className="font-semibold mb-1">Cancellation Policy</p>
//                 <p>✔ Free cancellation up to 48 hours before check-in</p>
//                 <p>✔ 50% refund within 24 hours</p>
//                 <p>❌ No refund after check-in date</p>
//               </div>

//               {/* Terms checkbox */}
//               <div className="mt-4 flex items-start gap-2">
//                 <input
//                   type="checkbox"
//                   checked={acceptedTerms}
//                   onChange={(e) => setAcceptedTerms(e.target.checked)}
//                   className="mt-1"
//                 />
//                 <p className="text-sm">
//                   I agree to the terms, cancellation policy, and hotel rules.
//                 </p>
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-end gap-3 mt-5">
//                 <button
//                   onClick={() => setShowSummary(false)}
//                   className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={confirmPayment}
//                   disabled={loading}
//                   className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
//                 >
//                   {loading && (
//                     <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                   )}
//                   {loading ? "Processing..." : "Confirm & Pay"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
