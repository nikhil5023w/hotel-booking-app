// export default function Contact() {
//   return (
//     <div className="min-h-screen bg-theme-bg py-16 px-6">
//       <div className="max-w-4xl mx-auto bg-theme-card p-10 rounded-2xl shadow-soft animate-slideUp">

//         <h1 className="text-3xl font-bold text-theme-primary mb-4">
//           Contact Us
//         </h1>

//         <p className="text-theme-secondary mb-8">
//           Have questions or need assistance? Our team is here to help you.
//         </p>

//         <div className="space-y-4">

//           <input
//             placeholder="Your Name"
//             className="w-full border border-theme-border rounded-lg p-3"
//           />

//           <input
//             placeholder="Email"
//             className="w-full border border-theme-border rounded-lg p-3"
//           />

//           <textarea
//             placeholder="Message"
//             rows="4"
//             className="w-full border border-theme-border rounded-lg p-3"
//           />

//           <button className="bg-theme-accent text-white px-6 py-3 rounded-lg hover:opacity-90 transition">
//             Send Message
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import Hero from "../Components/contact/Hero";

export default function Contact() {
  return (
    <div>
      <Hero />
    </div>
  );
}
