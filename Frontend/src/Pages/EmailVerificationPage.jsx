import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Loader, ArrowLeft } from "lucide-react";
import { useAuthStore } from "../Store/authStore";

const VerifyEmailPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const { verifyEmail, error, isLoading, user, clearError } = useAuthStore();

  // Get email from user store or from location state
  const email = user?.email || "";

  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    const verificationCode = code.join("");
    
    if (verificationCode.length !== 6) {
      return;
    }

    try {
      await verifyEmail(verificationCode, email);
      navigate("/"); // Redirect to home after successful verification
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/signup")}
            className="mr-2 p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Verify Email
          </h2>
        </div>

        <p className="text-gray-300 mb-6">
          We've sent a 6-digit verification code to{" "}
          <span className="font-semibold">{email}</span>. Please check your inbox
          and enter the code below.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-6">
            {code.map((data, index) => (
              <input
                key={index}
                type="text"
                name="code"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                className="w-12 h-12 text-center text-xl font-bold bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 font-semibold mb-4 text-center">
              {error}
            </p>
          )}

          <motion.button
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.join("").length !== 6}
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              "Verify Email"
            )}
          </motion.button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Didn't receive the code?{" "}
          <button
            onClick={() => {
              // You might want to implement resend functionality
              alert("Resend functionality would go here");
            }}
            className="text-green-400 hover:underline"
          >
            Resend
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default VerifyEmailPage;