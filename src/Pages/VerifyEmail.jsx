import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import API from "../services/api";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await API.get(`/auth/verify-email/${token}`);
        setSuccess(true);
        setMessage(data.message || "Email verified successfully");
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      } catch (error) {
        setMessage(error.response?.data?.message || "Verification failed");
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf7f2] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
        {success && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6 text-green-500"
          >
            <FiCheckCircle size={60} />
          </motion.div>
        )}
        <h2 className="text-2xl font-semibold mb-3">
          {success ? "Email Verified!" : "Verifying Email"}
        </h2>
        <p className="text-gray-500 mb-6">{message}</p>
        {success && (
          <p className="text-sm text-gray-400 mb-6">
            Redirecting to login in a few seconds...
          </p>
        )}
        <Link
          to="/login"
          className="inline-block bg-[#907B60] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
