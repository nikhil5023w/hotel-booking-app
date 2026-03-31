import { motion } from "framer-motion";
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock,
  FiSend,
  FiCheckCircle,
  FiMessageCircle
} from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactHero() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Message sent successfully!");
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Visit Us",
      details: ["123 Luxury Lane", "Beverly Hills, CA 90210", "United States"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      subtitle: "24/7 Concierge Service",
      color: "from-green-500 to-green-600"
    },
    {
      icon: FiMail,
      title: "Email Us",
      details: ["info@wiltonmanor.com", "reservations@wiltonmanor.com"],
      subtitle: "We reply within 24 hours",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: FiClock,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 8PM", "Saturday - Sunday: 10AM - 6PM"],
      subtitle: "Reception open 24/7",
      color: "from-amber-500 to-amber-600"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#faf7f2] via-white to-[#faf7f2]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#907B60]/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#907B60]/5 to-transparent rounded-full blur-3xl"
        />
        
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z' fill='%23907B60' fill-opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <span className="px-4 py-2 bg-[#907B60]/10 text-[#907B60] rounded-full text-sm font-medium tracking-wider inline-flex items-center gap-2">
              <FiMessageCircle className="w-4 h-4" />
              GET IN TOUCH
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mt-6"
          >
            Contact
            <span className="block font-serif italic text-[#907B60]">Wilton Manor</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-2xl mx-auto mt-4"
          >
            We're here to assist you with any questions about your stay, 
            reservations, or special requests.
          </motion.p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#907B60] to-[#b89e84] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 h-full">
                  <div className={`w-14 h-14 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                  
                  <div className="space-y-1">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-sm">{detail}</p>
                    ))}
                  </div>
                  
                  {info.subtitle && (
                    <p className="text-xs text-[#907B60] mt-3 font-medium">{info.subtitle}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Contact Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all"
                  placeholder="Booking Inquiry"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#907B60]/20 focus:border-[#907B60] transition-all resize-none"
                  placeholder="Tell us about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-[#907B60] to-[#b89e84] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Sending...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <FiCheckCircle className="w-5 h-5" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <FiSend className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Trust Badge */}
            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
              <FiCheckCircle className="w-4 h-4 text-green-500" />
              <span>We typically respond within 24 hours</span>
            </div>
          </motion.div>

          {/* Map and Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            {/* Map */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
              <div className="relative h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405770525!2d-118.69192536874999!3d34.0201613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sBeverly%20Hills%2C%20CA%2C%20USA!5e0!3m2!1sen!2suk!4v1709736000000!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wilton Manor Location"
                  className="absolute inset-0"
                />
              </div>
            </div>

            {/* Quick Contact */}
            <motion.div
              variants={floatingAnimation}
              animate="animate"
              className="bg-gradient-to-r from-[#907B60] to-[#b89e84] rounded-3xl p-8 text-white shadow-2xl"
            >
              <h3 className="text-2xl font-light mb-4">Need Immediate Assistance?</h3>
              <p className="text-white/80 mb-6">
                Our concierge team is available 24/7 to help with any urgent requests.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="tel:+15551234567"
                  className="flex-1 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-center font-medium hover:bg-white/30 transition-colors"
                >
                  Call Now
                </a>
                <a
                  href="mailto:concierge@wiltonmanor.com"
                  className="flex-1 px-6 py-3 bg-white text-[#907B60] rounded-xl font-medium hover:bg-white/90 transition-colors"
                >
                  Email Concierge
                </a>
              </div>
            </motion.div>

            {/* Social Proof */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h4 className="font-semibold text-gray-900 mb-4">Why Guests Love Us</h4>
              <div className="space-y-3">
                {[
                  "🌟 5-Star Rated on TripAdvisor",
                  "🏆 Luxury Hotel Award 2024",
                  "💬 98% Guest Satisfaction Rate",
                  "🕒 24/7 Dedicated Support"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <FiCheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}