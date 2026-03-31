import {
  FaWifi,
  FaCar,
  FaSnowflake,
  FaSwimmingPool,
  FaTv,
  FaCoffee,
  FaDumbbell,
  FaSpa,
  FaHome,
} from "react-icons/fa";

const iconMap = {
  wifi: <FaWifi />,
  car: <FaCar />,
  snowflake: <FaSnowflake />,
  pool: <FaSwimmingPool />,
  tv: <FaTv />,
  coffee: <FaCoffee />,
  gym: <FaDumbbell />,
  spa: <FaSpa />,
  balcony: <FaHome />,
};

export const AMENITIES_OPTIONS = [
  { title: "WiFi", icon: "wifi" },
  { title: "Parking", icon: "car" },
  { title: "AC", icon: "snowflake" },
  { title: "Pool", icon: "pool" },
  { title: "TV", icon: "tv" },
  { title: "Breakfast", icon: "coffee" },
  { title: "Gym", icon: "gym" },
  { title: "Spa", icon: "spa" },
  { title: "Balcony", icon: "balcony" },
];
