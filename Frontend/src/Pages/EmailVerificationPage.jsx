import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

 const handleChange = (index, value) => {
  // keep only digits
  const digits = value.replace(/\D/g, "");

  // shallow copy
  const newCode = [...code];

  if (digits.length > 1) {
    // user pasted something — fill from start of the paste
    const pasted = digits.slice(0, 6).split("");
    for (let i = 0; i < 6; i++) {
      newCode[i] = pasted[i] ?? "";
    }
    setCode(newCode);

    // find first empty slot, otherwise focus last
    let focusIndex = newCode.findIndex(d => d === "");
    if (focusIndex === -1) focusIndex = 5;
    inputRefs.current[focusIndex]?.focus();
    return;
  }

  // single char (or empty)
  newCode[index] = digits; // digits is "" or "7"
  setCode(newCode);

  // move forward if user typed a digit
  if (digits && index < 5) {
    inputRefs.current[index + 1]?.focus();
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();

    const verificationCode = code.join("");
    console.log(`Verification code submitted ${verificationCode}`);
  }


  //auto submit
  useEffect(() => {
    if(code.every(digit => digit !== "")){
      handleSubmit(new Event("submit"));
    }
  })



  const handleKeyDown = (index, e) => {
    if(e.key === "Backspace" && !code[index] && index > 0){
      inputRefs.current[index-1].focus();
    }
  };

  const isLoading = false;

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-gray-400 to-emerald-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>

        <p className="text-center text-gray-300 mb-6">
          Enter the 6-Digit code send to your email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                type="text"
                key={index}
                ref={(eL) => (inputRefs.current[index] = eL)}
                maxLength="6"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>

            <motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type='submit'
						disabled={isLoading || code.some((digit) => !digit)}
						className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50'
					>
						{isLoading ? "Verifying..." : "Verify Email"}
					</motion.button>

        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
