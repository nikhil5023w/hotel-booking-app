// import { useContext, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { AuthContext } from "../context/AuthContext";
// import {
//   FaUserCircle,
//   FaEnvelope,
//   FaLock,
//   FaAward,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaCamera,
//   FaEdit,
//   FaCheckCircle,
//   FaIdCard,
//   FaGlobe,
//   FaBirthdayCake
// } from "react-icons/fa";
// import {
//   FiUser,
//   FiMail,
//   FiLock,
//   FiEdit2,
//   FiSave,
//   FiX,
//   FiCamera,
//   FiMapPin,
//   FiPhone,
//   FiCalendar,
//   FiGlobe,
//   FiAward,
//   FiClock
// } from "react-icons/fi";
// import { Link } from "react-router-dom";

// export default function Profile() {
//   const { user } = useContext(AuthContext);
//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState('profile');
//   const [profileImage, setProfileImage] = useState(null);
//   const [editedUser, setEditedUser] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     phone: user?.phone || '+44 123 456 7890',
//     location: user?.location || 'London, UK',
//     bio: user?.bio || 'Luxury travel enthusiast | B&B lover | Exploring the finest accommodations',
//     joinDate: user?.joinDate || 'January 2024',
//     language: user?.language || 'English',
//     timezone: user?.timezone || 'GMT+0'
//   });

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { type: "spring", stiffness: 100, damping: 15 }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { type: "spring", stiffness: 100, damping: 15 }
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveProfile = () => {
//     // Here you would typically save to backend
//     setIsEditing(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#faf7f2] via-white to-[#faf7f2] py-8 px-4 pt-14">

//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="relative max-full mx-auto"
//       >
//         {/* Main Profile Card */}
//         <motion.div
//           variants={cardVariants}
//           className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
//         >
//           {/* Cover Image */}
//           <div className="relative h-48 bg-gradient-to-r from-[#907B60] to-[#b89e84] overflow-hidden">
//             <motion.div
//               animate={{
//                 scale: [1, 1.1, 1],
//                 rotate: [0, 5, -5, 0]
//               }}
//               transition={{ duration: 20, repeat: Infinity }}
//               className="absolute inset-0 opacity-20"
//               style={{
//                 backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1470&q=80")',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center'
//               }}
//             />

//             {/* Profile Image */}
//             <div className="absolute top-1/3  left-5">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="relative group"
//               >
//                 <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-2xl">
//                   {profileImage ? (
//                     <img
//                       src={profileImage}
//                       alt="Profile"
//                       className="w-full h-full rounded-xl object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#907B60] to-[#b89e84] flex items-center justify-center">
//                       <span className="text-white text-4xl font-semibold">
//                         {user?.name?.charAt(0) || 'U'}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Image Upload Button */}
//                 <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
//                   <FiCamera className="w-4 h-4 text-[#907B60]" />
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                   />
//                 </label>
//               </motion.div>
//             </div>

//             {/* Edit Button */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsEditing(!isEditing)}
//               className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg flex items-center gap-2 hover:bg-white transition-all"
//             >
//               {isEditing ? (
//                 <>
//                   <FiX className="w-4 h-4 text-gray-600" />
//                   <span className="text-sm font-medium">Cancel</span>
//                 </>
//               ) : (
//                 <>
//                   <FiEdit2 className="w-4 h-4 text-[#907B60]" />
//                   <span className="text-sm font-medium">Edit Profile</span>
//                 </>
//               )}
//             </motion.button>
//           </div>

//           {/* Profile Info */}
//           <div className="p-4 md:p-8">
//             {/* Tabs */}
//             <div className="flex gap-6 border-b border-gray-100 mb-6">
//               {['profile', 'preferences', 'security'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`pb-3 px-1 capitalize font-medium transition-all relative ${
//                     activeTab === tab
//                       ? 'text-[#907B60]'
//                       : 'text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   {tab}
//                   {activeTab === tab && (
//                     <motion.div
//                       layoutId="activeProfileTab"
//                       className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#907B60]"
//                     />
//                   )}
//                 </button>
//               ))}
//             </div>

//             <AnimatePresence mode="wait">
//               {/* Profile Tab */}
//               {activeTab === 'profile' && (
//                 <motion.div
//                   key="profile"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   className="space-y-6"
//                 >
//                   {/* Name */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                       <FiUser className="w-4 h-4 text-[#907B60]" />
//                       Full Name
//                     </label>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={editedUser.name}
//                         onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
//                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
//                       />
//                     ) : (
//                       <div className="p-4 bg-gray-50 rounded-xl text-gray-800 font-medium">
//                         {editedUser.name}
//                       </div>
//                     )}
//                   </div>

//                   {/* Email */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                       <FiMail className="w-4 h-4 text-[#907B60]" />
//                       Email Address
//                     </label>
//                     <div className="p-4 bg-gray-50 rounded-xl text-gray-600 flex items-center justify-between">
//                       <span>{editedUser.email}</span>
//                       {!isEditing && (
//                         <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
//                           Verified
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Phone */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                       <FiPhone className="w-4 h-4 text-[#907B60]" />
//                       Phone Number
//                     </label>
//                     {isEditing ? (
//                       <input
//                         type="tel"
//                         value={editedUser.phone}
//                         onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
//                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
//                       />
//                     ) : (
//                       <div className="p-4 bg-gray-50 rounded-xl text-gray-600">
//                         {editedUser.phone}
//                       </div>
//                     )}
//                   </div>

//                   {/* Location */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                       <FiMapPin className="w-4 h-4 text-[#907B60]" />
//                       Location
//                     </label>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={editedUser.location}
//                         onChange={(e) => setEditedUser({...editedUser, location: e.target.value})}
//                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
//                       />
//                     ) : (
//                       <div className="p-4 bg-gray-50 rounded-xl text-gray-600">
//                         {editedUser.location}
//                       </div>
//                     )}
//                   </div>

//                   {/* Bio */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                       <FiEdit2 className="w-4 h-4 text-[#907B60]" />
//                       Bio
//                     </label>
//                     {isEditing ? (
//                       <textarea
//                         value={editedUser.bio}
//                         onChange={(e) => setEditedUser({...editedUser, bio: e.target.value})}
//                         rows="3"
//                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all resize-none"
//                       />
//                     ) : (
//                       <div className="p-4 bg-gray-50 rounded-xl text-gray-600 italic">
//                         "{editedUser.bio}"
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               )}

//               {/* Preferences Tab */}
//               {activeTab === 'preferences' && (
//                 <motion.div
//                   key="preferences"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   className="space-y-6"
//                 >
//                   {/* Language */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                       <FiGlobe className="w-4 h-4 text-[#907B60]" />
//                       Preferred Language
//                     </label>
//                     {isEditing ? (
//                       <select
//                         value={editedUser.language}
//                         onChange={(e) => setEditedUser({...editedUser, language: e.target.value})}
//                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
//                       >
//                         <option>English</option>
//                         <option>Spanish</option>
//                         <option>French</option>
//                         <option>German</option>
//                       </select>
//                     ) : (
//                       <div className="p-4 bg-gray-50 rounded-xl text-gray-600">
//                         {editedUser.language}
//                       </div>
//                     )}
//                   </div>
//                   {/* Join Date (non-editable) */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                       <FiCalendar className="w-4 h-4 text-[#907B60]" />
//                       Member Since
//                     </label>
//                     <div className="p-4 bg-gray-50 rounded-xl text-gray-600">
//                       {editedUser.joinDate}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Security Tab */}
//               {activeTab === 'security' && (
//                 <motion.div
//                   key="security"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   className="space-y-6"
//                 >
//                   {/* Password */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                       <FiLock className="w-4 h-4 text-[#907B60]" />
//                       Password
//                     </label>
//                     <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
//                       <span className="text-gray-600">••••••••</span>
//                       <Link
//                         to="/change-password"
//                         className="text-sm text-[#907B60] hover:underline font-medium"
//                       >
//                         Change Password
//                       </Link>
//                     </div>
//                   </div>
//                   {/* Login History */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                       <FiClock className="w-4 h-4 text-[#907B60]" />
//                       Last Login
//                     </label>
//                     <div className="p-4 bg-gray-50 rounded-xl text-gray-600">
//                       Today at 10:30 AM
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Save Button (only shown in edit mode) */}
//             {isEditing && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 className="mt-8 flex justify-end"
//               >
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={handleSaveProfile}
//                   className="px-8 py-3 bg-gradient-to-r from-[#907B60] to-[#b89e84] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
//                 >
//                   <FiSave className="w-5 h-5" />
//                   Save Changes
//                 </motion.button>
//               </motion.div>
//             )}
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEdit2,
  FiSave,
  FiX,
  FiCamera,
  FiMapPin,
  FiPhone,
  FiCalendar,
  FiGlobe,
  FiClock,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import API from "../services/api";
export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const [editedUser, setEditedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
    joinDate: user?.createdAt || "",
    language: user?.language || "English",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/auth/me");

        setEditedUser({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          bio: data.bio || "",
          joinDate: data.createdAt || "",
          language: data.language || "English",
        });

        setUser(data);
      } catch (error) {
        console.log("Profile fetch error", error);
      }
    };

    fetchProfile();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setImageError("Only image files are allowed");
      return;
    }

    // Validate file size (1MB)
    if (file.size > 1024 * 1024) {
      setImageError("Image must be less than 1MB");
      return;
    }

    // Clear error
    setImageError("");

    setProfileImageFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();

      formData.append("name", editedUser.name);
      formData.append("phone", editedUser.phone);
      formData.append("location", editedUser.location);
      formData.append("bio", editedUser.bio);
      formData.append("language", editedUser.language);


      if (profileImageFile) {
        formData.append("profileImage", profileImageFile);
      }
      const { data } = await API.put("/auth/update-profile", formData);

      setUser(data.user);

      localStorage.setItem("user", JSON.stringify(data.user));

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf7f2] via-white to-[#faf7f2] py-8 px-4 pt-14">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative max-full mx-auto"
      >
        {/* Main Profile Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
        >
          {/* Cover Image */}
          <div className="relative h-48 bg-gradient-to-r from-[#907B60] to-[#b89e84] overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1470&q=80")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-2xl">
                  {user?.profileImage ? (
                    <img
                      src={profileImage || user?.profileImage}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#907B60] to-[#b89e84] flex items-center justify-center">
                      <span className="text-white text-3xl font-semibold">
                        {user?.name?.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Image Upload Button */}
                {isEditing && (
                  <label className="absolute inset-0 bg-black/30 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition">
                    <FiCamera className="text-white text-xl" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </motion.div>

              {/* Error message OUTSIDE */}
              {imageError && (
               <p className="text-red-500 text-xs mt-2 bg-red-50 px-3 py-1 rounded-md">
                  {imageError}
                </p>
              )}
            </div>

            {/* Edit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg flex items-center gap-2 hover:bg-white transition-all"
            >
              {isEditing ? (
                <>
                  <FiX className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">Cancel</span>
                </>
              ) : (
                <>
                  <FiEdit2 className="w-4 h-4 text-[#907B60]" />
                  <span className="text-sm font-medium">Edit Profile</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Profile Info */}
          <div className="p-4 md:p-8">
            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-100 mb-6">
              {["profile", "preferences", "security"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-1 capitalize font-medium transition-all relative ${
                    activeTab === tab
                      ? "text-[#907B60]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeProfileTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#907B60]"
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiUser className="w-4 h-4 text-[#907B60]" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.name}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
                      />
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-xl text-gray-800 font-medium">
                        {editedUser.name}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiMail className="w-4 h-4 text-[#907B60]" />
                      Email Address
                    </label>
                    <div className="p-4 bg-gray-50 rounded-xl text-gray-600 flex items-center justify-between">
                      <span>{editedUser.email}</span>
                      {!isEditing && (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiPhone className="w-4 h-4 text-[#907B60]" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedUser.phone}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
                      />
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-xl text-gray-600">
                        {editedUser.phone}
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiMapPin className="w-4 h-4 text-[#907B60]" />
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.location}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            location: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
                      />
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-xl text-gray-600">
                        {editedUser.location}
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiEdit2 className="w-4 h-4 text-[#907B60]" />
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editedUser.bio}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, bio: e.target.value })
                        }
                        rows="3"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all resize-none"
                      />
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-xl text-gray-600 italic">
                        "{editedUser.bio}"
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Preferences Tab */}
              {activeTab === "preferences" && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Language */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiGlobe className="w-4 h-4 text-[#907B60]" />
                      Preferred Language
                    </label>
                    {isEditing ? (
                      <select
                        value={editedUser.language}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            language: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-xl text-gray-600">
                        {editedUser.language}
                      </div>
                    )}
                  </div>
                  {/* Join Date (non-editable) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiCalendar className="w-4 h-4 text-[#907B60]" />
                      Member Since
                    </label>
                    <div className="p-4 bg-gray-50 rounded-xl text-gray-600">
                      {editedUser.joinDate}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiLock className="w-4 h-4 text-[#907B60]" />
                      Password
                    </label>
                    <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                      <span className="text-gray-600">••••••••</span>
                      <Link
                        to="/change-password"
                        className="text-sm text-[#907B60] hover:underline font-medium"
                      >
                        Change Password
                      </Link>
                    </div>
                  </div>
                  {/* Login History */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FiClock className="w-4 h-4 text-[#907B60]" />
                      Last Login
                    </label>
                    <div className="p-4 bg-gray-50 rounded-xl text-gray-600">
                      Today at 10:30 AM
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Save Button (only shown in edit mode) */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8 flex justify-end"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveProfile}
                  className="px-8 py-3 bg-gradient-to-r from-[#907B60] to-[#b89e84] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <FiSave className="w-5 h-5" />
                  Save Changes
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
