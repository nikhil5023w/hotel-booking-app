import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiChevronRight,
  FiHeart,
  FiSun,
  FiStar,
} from "react-icons/fi";
import { FaTripadvisor, FaHotel } from "react-icons/fa";
export default function Footer() {
  const currentYear = new Date().getFullYear();

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

  const socialLinks = [
    {
      icon: FiFacebook,
      href: "https://facebook.com",
      label: "Facebook",
      color: "hover:text-blue-500",
    },
    {
      icon: FiTwitter,
      href: "https://twitter.com",
      label: "Twitter",
      color: "hover:text-sky-400",
    },
    {
      icon: FiInstagram,
      href: "https://instagram.com",
      label: "Instagram",
      color: "hover:text-pink-500",
    },
    {
      icon: FiLinkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      icon: FiYoutube,
      href: "https://youtube.com",
      label: "YouTube",
      color: "hover:text-red-500",
    },
  ];

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Rooms", path: "/rooms" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
  ];

  const contactInfo = [
    { icon: FiMapPin, text: "123 Luxury Lane, Beverly Hills, CA 90210" },
    { icon: FiPhone, text: "+1 (555) 123-4567" },
    { icon: FiMail, text: "info@wiltonmanor.com" },
    { icon: FiClock, text: "24/7 Concierge Service" },
  ];

  return (
    <footer className="relative mt-20 bg-theme-bg text-theme-primary border-t border-theme-border overflow-hidden">
      {" "}
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-theme-accent/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#907B60]/10 to-transparent rounded-full blur-3xl"
        />
      </div>
      {/* Decorative top border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#907B60] to-transparent"
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative max-w-7xl mx-auto px-6 py-16"
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link to="/" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#907B60] to-[#b89e84] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-serif italic">
                    W
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-semibold bg-gradient-to-r from-[#907B60] to-[#b89e84] bg-clip-text text-transparent">
                    Wilton Manor
                  </h3>
                  
                </div>
              </motion.div>
            </Link>

            <p className="text-sm text-theme-secondary leading-relaxed">
              Experience unparalleled luxury and comfort in our historic manor.
              Where timeless elegance meets modern sophistication.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-theme-primary relative inline-block">
              Quick Links
              <motion.div
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#907B60]"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ delay: 0.3 }}
              />
            </h4>

            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-theme-secondary hover:text-theme-accent transition-colors group"
                  >
                    <FiChevronRight className="w-4 h-4 text-[#907B60] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-white relative inline-block">
              Contact Us
              <motion.div
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#907B60]"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ delay: 0.3 }}
              />
            </h4>

            <ul className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 text-theme-secondary"
                  >
                    <Icon className="w-5 h-5 text-[#907B60] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item.text}</span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Business Hours & Social */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-white relative inline-block">
              Hours & Social
              <motion.div
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#907B60]"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ delay: 0.3 }}
              />
            </h4>

            <div className="space-y-2  text-theme-secondary">
              <p className="flex items-center gap-2">
                <FiSun className="w-4 h-4 text-[#907B60]" />
                <span>Check-in: 3:00 PM - 11:00 PM</span>
              </p>
              <p className="flex items-center gap-2">
                <FiStar className="w-4 h-4 text-[#907B60]" />
                <span>Check-out: Until 11:00 AM</span>
              </p>
              <p className="flex items-center gap-2">
                <FiClock className="w-4 h-4 text-[#907B60]" />
                <span>Reception: 24/7</span>
              </p>
            </div>

            {/* Social Media Links */}
            <div className="pt-4">
              <p className="text-sm text-gray-400 mb-3">
                Follow us on social media
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex gap-3 pt-4">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="https://via.placeholder.com/50x30?text=MC"
                alt="Mastercard"
                className="h-8 w-auto grayscale hover:grayscale-0 transition-all"
              />
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="https://via.placeholder.com/50x30?text=VISA"
                alt="Visa"
                className="h-8 w-auto grayscale hover:grayscale-0 transition-all"
              />
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="https://via.placeholder.com/50x30?text=AMEX"
                alt="American Express"
                className="h-8 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="pt-8 mt-8 border-t border-theme-border flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-theme-secondary">
            © {currentYear} Wilton Manor. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-gray-500">
            <Link
              to="/privacy"
              className="hover:text-[#907B60] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-[#907B60] transition-colors"
            >
              Terms of Service
            </Link>

          </div>

          {/* Back to Top Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-theme-accent rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
      {/* Decorative bottom pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#907B60]/20 to-transparent" />
    </footer>
  );
}
