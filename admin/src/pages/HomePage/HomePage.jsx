/* eslint-disable no-unused-vars */
import React from "react";
import { FaRegSmileBeam } from "react-icons/fa";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="w-full  overflow-hidden flex flex-col justify-center items-center  text-center px-4">
      {/* Animated & Rotating Icon */}
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ delay: 2, duration: 1.5, type: "spring", stiffness: 120 }}
      >
        <motion.div
          animate={{ opacity: [1, 0.6, 1, 0.8, 1] }}
          transition={{
            delay: 3,
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        >
          <FaRegSmileBeam className="text-yellow-500 text-[130px] mb-6" />
        </motion.div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.3, duration: 0.8 }}
      >
        Hello, Admin! 👋
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="text-xl text-gray-600 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.6, duration: 0.8 }}
      >
        Welcome to{" "}
        <span className="font-semibold text-yellow-600">
          Compass Tourism Admin Panel
        </span>
        . We're excited to have you here!
      </motion.p>
    </div>
  );
};

export default HomePage;
