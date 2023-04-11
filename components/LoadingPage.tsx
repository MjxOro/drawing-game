import React from 'react';
import { motion, Variants } from 'framer-motion';

const RotatingCircle: React.FC = () => {
  return (
    <motion.div
      className="w-24 h-24 bg-pink-500 mb-12"
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"]
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1
      }}
    />
  );
};

const LoadingText: React.FC = () => {
  const textVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' } },
  };

  return (
    <motion.h1
      className="text-2xl text-gray-700 mt-4 md:mt-16"
      initial="hidden"
      animate="visible"
      variants={textVariants}
    >
      Loading...
    </motion.h1>
  );
};

const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-white">
      <RotatingCircle />
      <LoadingText />
    </div>
  );
};

export default LoadingPage;

