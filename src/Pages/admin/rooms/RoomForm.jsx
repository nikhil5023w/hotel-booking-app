// import { useState } from "react";
// import { AMENITIES_OPTIONS } from "./AmenitiesOptions";

// export default function RoomForm({
//   form,
//   setForm,
//   handleSubmit,
//   editingRoomId,
//   setEditingRoomId,
// }) {
//   const [customAmenity, setCustomAmenity] = useState("");

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="border p-4 rounded shadow space-y-3 bg-white"
//     >
//       <h3 className="text-xl font-semibold">
//         {editingRoomId ? "Update Room" : "Create New Room"}
//       </h3>

//       <input
//         type="text"
//         placeholder="Room Name"
//         className="w-full border p-2 rounded"
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />

//       <input
//         type="text"
//         placeholder="Description"
//         className="w-full border p-2 rounded"
//         value={form.description}
//         onChange={(e) => setForm({ ...form, description: e.target.value })}
//       />

//       <input
//         type="number"
//         placeholder="Price"
//         className="w-full border p-2 rounded"
//         value={form.price}
//         onChange={(e) => setForm({ ...form, price: e.target.value })}
//       />

//       <input
//         type="number"
//         placeholder="Capacity"
//         className="w-full border p-2 rounded"
//         value={form.capacity}
//         onChange={(e) => setForm({ ...form, capacity: e.target.value })}
//       />

//       {/* Amenities */}
//       <div>
//         <label className="font-medium mb-2 block">Amenities</label>

//         <select
//           onChange={(e) => {
//             const selected = AMENITIES_OPTIONS.find(
//               (a) => a.title === e.target.value,
//             );

//             if (
//               selected &&
//               !form.amenities.find((a) => a.title === selected.title)
//             ) {
//               setForm({
//                 ...form,
//                 amenities: [
//                   ...form.amenities,
//                   {
//                     title: selected.title,
//                     icon: selected.icon, // ensure string only
//                   },
//                 ],
//               });
//             }
//           }}
//           className="border p-2 rounded w-full mb-2"
//         >
//           <option>Select amenity</option>
//           {AMENITIES_OPTIONS.map((item) => (
//             <option key={item.title} value={item.title}>
//               {item.title}
//             </option>
//           ))}
//         </select>

//         {/* Custom */}
//         <div className="flex gap-2 mb-2">
//           <input
//             type="text"
//             placeholder="Custom amenity"
//             value={customAmenity}
//             onChange={(e) => setCustomAmenity(e.target.value)}
//             className="border p-2 rounded w-full"
//           />

//           <button
//             type="button"
//             onClick={() => {
//               console.log("Amenities being sent:", form.amenities);
//               if (customAmenity) {
//                 console.log("Amenities being sent:", form.amenities);
//                 setForm({
//                   ...form,
//                   amenities: [
//                     ...form.amenities,
//                     { title: customAmenity, icon: "custom" },
//                   ],
//                 });
//                 setCustomAmenity("");
//               }
//             }}
//             className="bg-blue-600 text-white px-3 rounded"
//           >
//             Add
//           </button>
//         </div>

//         {/* Chips */}
//         <div className="flex gap-2 flex-wrap">
//           {form.amenities.map((item, index) => (
//             <div
//               key={index}
//               className="bg-blue-100 px-3 py-1 rounded flex items-center gap-2"
//             >
//               {item.title}
//               <button
//                 type="button"
//                 onClick={() =>
//                   setForm({
//                     ...form,
//                     amenities: form.amenities.filter((_, i) => i !== index),
//                   })
//                 }
//                 className="text-red-500 font-bold"
//               >
//                 x
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <button className="bg-blue-600 text-white px-4 py-2 rounded">
//         {editingRoomId ? "Update Room" : "Create Room"}
//       </button>

//       {editingRoomId && (
//         <button
//           type="button"
//           onClick={() => setEditingRoomId(null)}
//           className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
//         >
//           Cancel
//         </button>
//       )}
//     </form>
//   );
// }

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { AMENITIES_OPTIONS } from "./AmenitiesOptions";
// import {
//   FiPlus,
//   FiX,
//   FiSave,
//   FiEdit3,
//   FiTrash2,
//   FiChevronDown,
//   FiHome,
//   FiDollarSign,
//   FiUsers,
//   FiFileText,
//   FiCheckCircle,
//   FiAlertCircle
// } from "react-icons/fi";
// import { BsCurrencyPound } from "react-icons/bs";

// export default function RoomForm({
//   form,
//   setForm,
//   handleSubmit,
//   editingRoomId,
//   setEditingRoomId,
// }) {
//   const [customAmenity, setCustomAmenity] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [formErrors, setFormErrors] = useState({});

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0 }
//   };

//   const chipVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { type: "spring", stiffness: 300 }
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.8,
//       transition: { duration: 0.2 }
//     }
//   };

//   // Validate form fields
//   const validateForm = () => {
//     const errors = {};
//     if (!form.name?.trim()) errors.name = "Room name is required";
//     if (!form.description?.trim()) errors.description = "Description is required";
//     if (!form.price || form.price <= 0) errors.price = "Valid price is required";
//     if (!form.capacity || form.capacity <= 0) errors.capacity = "Valid capacity is required";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       handleSubmit(e);
//     }
//   };

//   const handleAddAmenity = (amenity) => {
//     if (!form.amenities.find(a => a.title === amenity.title)) {
//       setForm({
//         ...form,
//         amenities: [...form.amenities, { ...amenity, icon: amenity.icon || "custom" }]
//       });
//     }
//     setIsDropdownOpen(false);
//   };

//   const handleAddCustomAmenity = () => {
//     if (customAmenity.trim()) {
//       const newAmenity = {
//         title: customAmenity.trim(),
//         icon: "custom",
//         description: `Custom ${customAmenity.trim()} amenity`
//       };

//       if (!form.amenities.find(a => a.title === newAmenity.title)) {
//         setForm({
//           ...form,
//           amenities: [...form.amenities, newAmenity]
//         });
//       }
//       setCustomAmenity("");
//     }
//   };

//   const handleRemoveAmenity = (index) => {
//     setForm({
//       ...form,
//       amenities: form.amenities.filter((_, i) => i !== index)
//     });
//   };

//   const handleClearForm = () => {
//     setEditingRoomId(null);
//     setForm({
//       name: "",
//       description: "",
//       price: "",
//       capacity: "",
//       amenities: []
//     });
//     setFormErrors({});
//   };

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="max-w-4xl mx-auto"
//     >
//       <motion.form
//         onSubmit={onSubmit}
//         className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
//       >
//         {/* Header Gradient */}
//         <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#907B60] via-[#b89e84] to-[#907B60]" />

//         {/* Form Header */}
//         <div className="px-8 pt-8 pb-4 border-b border-gray-100">
//           <motion.div variants={itemVariants} className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-3 bg-[#907B60]/10 rounded-xl">
//                 {editingRoomId ? (
//                   <FiEdit3 className="w-6 h-6 text-[#907B60]" />
//                 ) : (
//                   <FiHome className="w-6 h-6 text-[#907B60]" />
//                 )}
//               </div>
//               <div>
//                 <h3 className="text-2xl font-semibold text-gray-900">
//                   {editingRoomId ? "Update Room Details" : "Create New Room"}
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-1">
//                   {editingRoomId
//                     ? "Modify the room information below"
//                     : "Fill in the details to add a new room to your property"}
//                 </p>
//               </div>
//             </div>

//             {/* Status Badge */}
//             <motion.div
//               variants={itemVariants}
//               className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm font-medium flex items-center gap-2"
//             >
//               <FiCheckCircle className="w-4 h-4" />
//               <span>Draft</span>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Form Fields */}
//         <div className="p-8 space-y-6">
//           {/* Room Name */}
//           <motion.div variants={itemVariants} className="space-y-2">
//             <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//               <FiHome className="w-4 h-4 text-[#907B60]" />
//               Room Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               placeholder="e.g., Deluxe Ocean View Suite"
//               className={`w-full px-4 py-3 bg-gray-50 border ${
//                 formErrors.name ? 'border-red-300' : 'border-gray-200'
//               } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all`}
//               value={form.name}
//               onChange={(e) => {
//                 setForm({ ...form, name: e.target.value });
//                 if (formErrors.name) setFormErrors({ ...formErrors, name: null });
//               }}
//             />
//             {formErrors.name && (
//               <motion.p
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-sm text-red-500 flex items-center gap-1 mt-1"
//               >
//                 <FiAlertCircle className="w-4 h-4" />
//                 {formErrors.name}
//               </motion.p>
//             )}
//           </motion.div>

//           {/* Description */}
//           <motion.div variants={itemVariants} className="space-y-2">
//             <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//               <FiFileText className="w-4 h-4 text-[#907B60]" />
//               Description <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               placeholder="Describe the room, its features, and what makes it special..."
//               rows="4"
//               className={`w-full px-4 py-3 bg-gray-50 border ${
//                 formErrors.description ? 'border-red-300' : 'border-gray-200'
//               } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all resize-none`}
//               value={form.description}
//               onChange={(e) => {
//                 setForm({ ...form, description: e.target.value });
//                 if (formErrors.description) setFormErrors({ ...formErrors, description: null });
//               }}
//             />
//             {formErrors.description && (
//               <motion.p
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-sm text-red-500 flex items-center gap-1 mt-1"
//               >
//                 <FiAlertCircle className="w-4 h-4" />
//                 {formErrors.description}
//               </motion.p>
//             )}
//           </motion.div>

//           {/* Price and Capacity Row */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Price */}
//             <motion.div variants={itemVariants} className="space-y-2">
//               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                 <BsCurrencyPound className="w-4 h-4 text-[#907B60]" />
//                 Price per Night <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
//                 <input
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   placeholder="0.00"
//                   className={`w-full pl-8 pr-4 py-3 bg-gray-50 border ${
//                     formErrors.price ? 'border-red-300' : 'border-gray-200'
//                   } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all`}
//                   value={form.price}
//                   onChange={(e) => {
//                     setForm({ ...form, price: e.target.value });
//                     if (formErrors.price) setFormErrors({ ...formErrors, price: null });
//                   }}
//                 />
//               </div>
//               {formErrors.price && (
//                 <motion.p
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="text-sm text-red-500 flex items-center gap-1 mt-1"
//                 >
//                   <FiAlertCircle className="w-4 h-4" />
//                   {formErrors.price}
//                 </motion.p>
//               )}
//             </motion.div>

//             {/* Capacity */}
//             <motion.div variants={itemVariants} className="space-y-2">
//               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                 <FiUsers className="w-4 h-4 text-[#907B60]" />
//                 Guest Capacity <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 min="1"
//                 placeholder="e.g., 2"
//                 className={`w-full px-4 py-3 bg-gray-50 border ${
//                   formErrors.capacity ? 'border-red-300' : 'border-gray-200'
//                 } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all`}
//                 value={form.capacity}
//                 onChange={(e) => {
//                   setForm({ ...form, capacity: e.target.value });
//                   if (formErrors.capacity) setFormErrors({ ...formErrors, capacity: null });
//                 }}
//               />
//               {formErrors.capacity && (
//                 <motion.p
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="text-sm text-red-500 flex items-center gap-1 mt-1"
//                 >
//                   <FiAlertCircle className="w-4 h-4" />
//                   {formErrors.capacity}
//                 </motion.p>
//               )}
//             </motion.div>
//           </div>

//           {/* Amenities Section */}
//           <motion.div variants={itemVariants} className="space-y-4">
//             <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//               <FiCheckCircle className="w-4 h-4 text-[#907B60]" />
//               Amenities
//               <span className="text-xs text-gray-400 font-normal ml-2">
//                 ({form.amenities.length} selected)
//               </span>
//             </label>

//             {/* Dropdown Selector */}
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-[#907B60] transition-all group"
//               >
//                 <span className="text-gray-500">
//                   {form.amenities.length > 0
//                     ? `${form.amenities.length} amenities selected`
//                     : "Select amenities from list"}
//                 </span>
//                 <motion.div
//                   animate={{ rotate: isDropdownOpen ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <FiChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#907B60]" />
//                 </motion.div>
//               </button>

//               <AnimatePresence>
//                 {isDropdownOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
//                   >
//                     {AMENITIES_OPTIONS.map((amenity) => (
//                       <motion.button
//                         key={amenity.title}
//                         type="button"
//                         whileHover={{ backgroundColor: "#f3f4f6" }}
//                         onClick={() => handleAddAmenity(amenity)}
//                         className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
//                         disabled={form.amenities.some(a => a.title === amenity.title)}
//                       >
//                         <span className="w-6 h-6 flex items-center justify-center">
//                           {form.amenities.some(a => a.title === amenity.title) ? (
//                             <FiCheckCircle className="w-4 h-4 text-green-500" />
//                           ) : (
//                             <FiPlus className="w-4 h-4 text-gray-400" />
//                           )}
//                         </span>
//                         <span className={form.amenities.some(a => a.title === amenity.title) ? "text-gray-400" : "text-gray-700"}>
//                           {amenity.title}
//                         </span>
//                       </motion.button>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Custom Amenity Input */}
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Or add a custom amenity..."
//                 value={customAmenity}
//                 onChange={(e) => setCustomAmenity(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleAddCustomAmenity()}
//                 className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
//               />
//               <motion.button
//                 type="button"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleAddCustomAmenity}
//                 disabled={!customAmenity.trim()}
//                 className={`px-6 rounded-xl font-medium flex items-center gap-2 transition-all ${
//                   customAmenity.trim()
//                     ? 'bg-[#907B60] text-white shadow-lg hover:shadow-xl'
//                     : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                 }`}
//               >
//                 <FiPlus className="w-5 h-5" />
//                 Add
//               </motion.button>
//             </div>

//             {/* Amenities Chips */}
//             <motion.div
//               className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-gray-50 rounded-xl"
//               layout
//             >
//               <AnimatePresence>
//                 {form.amenities.map((item, index) => (
//                   <motion.div
//                     key={index}
//                     variants={chipVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="exit"
//                     layout
//                     className="group relative bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
//                   >
//                     <span className="text-sm font-medium text-gray-700">
//                       {item.title}
//                     </span>
//                     <motion.button
//                       type="button"
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleRemoveAmenity(index)}
//                       className="w-5 h-5 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors"
//                     >
//                       <FiX className="w-3 h-3 text-gray-500 hover:text-red-500" />
//                     </motion.button>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>

//               {form.amenities.length === 0 && (
//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="text-sm text-gray-400 w-full text-center py-2"
//                 >
//                   No amenities added yet. Select from dropdown or add custom.
//                 </motion.p>
//               )}
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Form Actions */}
//         <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
//           {editingRoomId && (
//             <motion.button
//               type="button"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={handleClearForm}
//               className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2"
//             >
//               <FiX className="w-5 h-5" />
//               Cancel
//             </motion.button>
//           )}

//           <motion.button
//             type="submit"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="px-8 py-3 bg-gradient-to-r from-[#907B60] to-[#b89e84] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
//           >
//             <FiSave className="w-5 h-5" />
//             {editingRoomId ? "Update Room" : "Create Room"}
//           </motion.button>
//         </div>

//         {/* Form Progress Indicator */}
//         <motion.div
//           className="h-1 bg-gray-100"
//           initial={{ width: "0%" }}
//           animate={{
//             width: `${Object.values(form).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length * 20}%`
//           }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="h-full bg-gradient-to-r from-[#907B60] to-[#b89e84] rounded-r-full" />
//         </motion.div>
//       </motion.form>
//     </motion.div>
//   );
// }

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AMENITIES_OPTIONS } from "./AmenitiesOptions";
import toast from "react-hot-toast";
import {
  FiPlus,
  FiX,
  FiSave,
  FiEdit3,
  FiTrash2,
  FiChevronDown,
  FiHome,
  FiDollarSign,
  FiUsers,
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { BsCurrencyPound } from "react-icons/bs";
import { compressImage } from "../../../utils/compressImage";
export default function RoomForm({
  form,
  setForm,
  handleSubmit,
  editingRoomId,
  setEditingRoomId,
  uploading,
  uploadProgress,
  closeForm,
}) {
  const [customAmenity, setCustomAmenity] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!form.name?.trim()) errors.name = "Room name is required";
    if (!form.description?.trim())
      errors.description = "Description is required";
    if (!form.price || form.price <= 0)
      errors.price = "Valid price is required";
    if (!form.capacity || form.capacity <= 0)
      errors.capacity = "Valid capacity is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    }
  };

  const handleAddAmenity = (amenity) => {
    if (!form.amenities.find((a) => a.title === amenity.title)) {
      setForm({
        ...form,
        amenities: [
          ...form.amenities,
          { ...amenity, icon: amenity.icon || "custom" },
        ],
      });
    }
    setIsDropdownOpen(false);
  };

  const handleAddCustomAmenity = () => {
    if (customAmenity.trim()) {
      const newAmenity = {
        title: customAmenity.trim(),
        icon: "custom",
        description: `Custom ${customAmenity.trim()} amenity`,
      };

      if (!form.amenities.find((a) => a.title === newAmenity.title)) {
        setForm({
          ...form,
          amenities: [...form.amenities, newAmenity],
        });
      }
      setCustomAmenity("");
    }
  };

  const handleRemoveAmenity = (index) => {
    setForm({
      ...form,
      amenities: form.amenities.filter((_, i) => i !== index),
    });
  };

  const handleClearForm = () => {
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

    setFormErrors({});

    closeForm(); // 👈 closes modal
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-4xl mx-auto"
    >
      <motion.form
        onSubmit={onSubmit}
        className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
      >
        {/* Header Gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#907B60] via-[#b89e84] to-[#907B60]" />

        {/* Form Header */}
        <div className="px-8 pt-8 pb-4 border-b border-gray-100">
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#907B60]/10 rounded-xl">
                {editingRoomId ? (
                  <FiEdit3 className="w-6 h-6 text-[#907B60]" />
                ) : (
                  <FiHome className="w-6 h-6 text-[#907B60]" />
                )}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {editingRoomId ? "Update Room Details" : "Create New Room"}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {editingRoomId
                    ? "Modify the room information below"
                    : "Fill in the details to add a new room to your property"}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <motion.div
              variants={itemVariants}
              className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm font-medium flex items-center gap-2"
            >
              <FiCheckCircle className="w-4 h-4" />
              <span>Draft</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Form Fields */}
        <div className="p-8 space-y-6">
          {/* Room Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Room Name */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FiHome className="w-4 h-4 text-[#907B60]" />
                Room Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="e.g., Deluxe Ocean View Suite"
                className={`w-full px-4 py-3 bg-gray-50 border ${
                  formErrors.name ? "border-red-300" : "border-gray-200"
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all`}
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (formErrors.name)
                    setFormErrors({ ...formErrors, name: null });
                }}
              />

              {formErrors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 flex items-center gap-1 mt-1"
                >
                  <FiAlertCircle className="w-4 h-4" />
                  {formErrors.name}
                </motion.p>
              )}
            </motion.div>

            {/* Room Type */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FiHome className="w-4 h-4 text-[#907B60]" />
                Room Type
              </label>

              <select
                value={form.roomType}
                onChange={(e) => setForm({ ...form, roomType: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
              >
                <option value="">Select Room Type</option>
                <option value="1BHK">1 BHK</option>
                <option value="2BHK">2 BHK</option>
                <option value="Full Room">Full Room</option>
              </select>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FiFileText className="w-4 h-4 text-[#907B60]" />
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Describe the room, its features, and what makes it special..."
              rows="4"
              className={`w-full px-4 py-3 bg-gray-50 border ${
                formErrors.description ? "border-red-300" : "border-gray-200"
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all resize-none`}
              value={form.description}
              onChange={(e) => {
                setForm({ ...form, description: e.target.value });
                if (formErrors.description)
                  setFormErrors({ ...formErrors, description: null });
              }}
            />
            {formErrors.description && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 flex items-center gap-1 mt-1"
              >
                <FiAlertCircle className="w-4 h-4" />
                {formErrors.description}
              </motion.p>
            )}
          </motion.div>
          {/* Sub Description */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Sub Description
            </label>

            <textarea
              placeholder="Extra short description about the room..."
              rows="2"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20"
              value={form.subDescription}
              onChange={(e) =>
                setForm({ ...form, subDescription: e.target.value })
              }
            />
          </motion.div>

          {/* Price and Capacity Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <BsCurrencyPound className="w-4 h-4 text-[#907B60]" />
                Price per Night <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  £
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full pl-8 pr-4 py-3 bg-gray-50 border ${
                    formErrors.price ? "border-red-300" : "border-gray-200"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all`}
                  value={form.price}
                  onChange={(e) => {
                    setForm({ ...form, price: e.target.value });
                    if (formErrors.price)
                      setFormErrors({ ...formErrors, price: null });
                  }}
                />
              </div>
              {formErrors.price && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 flex items-center gap-1 mt-1"
                >
                  <FiAlertCircle className="w-4 h-4" />
                  {formErrors.price}
                </motion.p>
              )}
            </motion.div>

            {/* Capacity */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FiUsers className="w-4 h-4 text-[#907B60]" />
                Guest Capacity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g., 2"
                className={`w-full px-4 py-3 bg-gray-50 border ${
                  formErrors.capacity ? "border-red-300" : "border-gray-200"
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all`}
                value={form.capacity}
                onChange={(e) => {
                  setForm({ ...form, capacity: e.target.value });
                  if (formErrors.capacity)
                    setFormErrors({ ...formErrors, capacity: null });
                }}
              />
              {formErrors.capacity && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 flex items-center gap-1 mt-1"
                >
                  <FiAlertCircle className="w-4 h-4" />
                  {formErrors.capacity}
                </motion.p>
              )}
            </motion.div>
          </div>
          {/* Images Upload */}
          <motion.div variants={itemVariants} className="space-y-4">
            <label className="text-sm font-medium text-gray-700">
              Room Images
            </label>

            {/* Cover Images */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Cover Images</p>

              <input
                type="file"
                multiple
                onChange={async (e) => {
                  const files = Array.from(e.target.files);

                  const validFiles = [];

                  for (const file of files) {
                    // ❌ Only images allowed
                    if (!file.type.startsWith("image/")) {
                     toast.error("Only images allowed");
                      continue;
                    }

                    // ❌ Max size 5MB
                    if (file.size > 5 * 1024 * 1024) {
                      toast.error("Image must be under 5MB");
                      continue;
                    }

                    validFiles.push(file);
                  }

                  const compressedFiles = await Promise.all(
                    validFiles.map((file) => compressImage(file)),
                  );

                  setForm({
                    ...form,
                    coverImages: [...form.coverImages, ...compressedFiles],
                  });

                  e.target.value = null;
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
              />

              {/* Preview */}
              <div className="flex gap-2 flex-wrap mt-3">
                {form.coverImages?.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={
                        typeof file === "string"
                          ? file
                          : URL.createObjectURL(file)
                      }
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <p className="text-[10px] text-gray-500 text-center">
                      {(file.size / 1024).toFixed(0)} KB
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          coverImages: form.coverImages.filter(
                            (_, i) => i !== index,
                          ),
                        })
                      }
                      className="absolute top-0 right-0 bg-black text-white text-xs px-1 rounded"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Images */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Gallery Images</p>

              <input
                type="file"
                multiple
                onChange={async (e) => {
                  const files = Array.from(e.target.files);

                  const validFiles = [];

                  for (const file of files) {
                    if (!file.type.startsWith("image/")) {
                     toast.error("Only images allowed");
                      continue;
                    }

                    if (file.size > 5 * 1024 * 1024) {
                      toast.error("Image must be under 5MB");
                      continue;
                    }

                    validFiles.push(file);
                  }

                  const compressedFiles = await Promise.all(
                    validFiles.map((file) => compressImage(file)),
                  );

                  setForm({
                    ...form,
                    galleryImages: [...form.galleryImages, ...compressedFiles],
                  });

                  e.target.value = null;
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
              />

              <div className="flex gap-2 flex-wrap mt-3">
                {form.galleryImages?.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={
                        typeof file === "string"
                          ? file
                          : URL.createObjectURL(file)
                      }
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <p className="text-[10px] text-gray-500 text-center">
                      {(file.size / 1024).toFixed(0)} KB
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          galleryImages: form.galleryImages.filter(
                            (_, i) => i !== index,
                          ),
                        })
                      }
                      className="absolute top-0 right-0 bg-black text-white text-xs px-1 rounded"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          {/* Amenities Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FiCheckCircle className="w-4 h-4 text-[#907B60]" />
              Amenities
              <span className="text-xs text-gray-400 font-normal ml-2">
                ({form.amenities.length} selected)
              </span>
            </label>

            {/* Dropdown Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-[#907B60] transition-all group"
              >
                <span className="text-gray-500">
                  {form.amenities.length > 0
                    ? `${form.amenities.length} amenities selected`
                    : "Select amenities from list"}
                </span>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#907B60]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
                  >
                    {AMENITIES_OPTIONS.map((amenity) => (
                      <motion.button
                        key={amenity.title}
                        type="button"
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        onClick={() => handleAddAmenity(amenity)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        disabled={form.amenities.some(
                          (a) => a.title === amenity.title,
                        )}
                      >
                        <span className="w-6 h-6 flex items-center justify-center">
                          {form.amenities.some(
                            (a) => a.title === amenity.title,
                          ) ? (
                            <FiCheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <FiPlus className="w-4 h-4 text-gray-400" />
                          )}
                        </span>
                        <span
                          className={
                            form.amenities.some(
                              (a) => a.title === amenity.title,
                            )
                              ? "text-gray-400"
                              : "text-gray-700"
                          }
                        >
                          {amenity.title}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Custom Amenity Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Or add a custom amenity..."
                value={customAmenity}
                onChange={(e) => setCustomAmenity(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleAddCustomAmenity()
                }
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddCustomAmenity}
                disabled={!customAmenity.trim()}
                className={`px-6 rounded-xl font-medium flex items-center gap-2 transition-all ${
                  customAmenity.trim()
                    ? "bg-[#907B60] text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <FiPlus className="w-5 h-5" />
                Add
              </motion.button>
            </div>

            {/* Amenities Chips */}
            <motion.div
              className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-gray-50 rounded-xl"
              layout
            >
              <AnimatePresence>
                {form.amenities.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={chipVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className="group relative bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {item.title}
                    </span>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemoveAmenity(index)}
                      className="w-5 h-5 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors"
                    >
                      <FiX className="w-3 h-3 text-gray-500 hover:text-red-500" />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {form.amenities.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-gray-400 w-full text-center py-2"
                >
                  No amenities added yet. Select from dropdown or add custom.
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        </div>
        {/* Form Actions */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
          {/* Upload Progress */}
          {uploading && (
            <div className="w-full mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Uploading Images...</span>
                <span className="font-semibold text-[#907B60]">
                  {uploadProgress}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#907B60] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3">
            {editingRoomId && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClearForm}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                <FiX className="w-5 h-5" />
                Cancel
              </motion.button>
            )}

            <motion.button
              type="submit"
              disabled={uploading}
              whileHover={{ scale: uploading ? 1 : 1.02 }}
              whileTap={{ scale: uploading ? 1 : 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-[#907B60] to-[#b89e84] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-60"
            >
              <FiSave className="w-5 h-5" />
              {uploading
                ? `Uploading ${uploadProgress}%`
                : editingRoomId
                  ? "Update Room"
                  : "Create Room"}
            </motion.button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
}
