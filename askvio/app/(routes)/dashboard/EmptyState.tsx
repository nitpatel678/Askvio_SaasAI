"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CreateInterviewDialog from "./CreateInterviewDialog";
import { motion } from "framer-motion";

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-10 sm:mt-14 flex flex-col items-center justify-center gap-6 sm:gap-8 
                 border-2 sm:border-4 border-dashed p-6 sm:p-10 rounded-xl sm:rounded-2xl 
                 border-gray-500 w-full max-w-md sm:max-w-xl mx-auto 
                 bg-white/10 backdrop-blur-md  shadow-xl"
    >
      {/* Image animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-40 h-40 sm:w-72 sm:h-72"
      >
        <Image
          src="/nointerview.png"
          alt="No Interviews"
          width={300}
          height={300}
          priority
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Text */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-2 text-center text-base sm:text-lg md:text-xl font-medium text-white"
      >
        You have no interviews scheduled
      </motion.h2>

      {/* Button with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <CreateInterviewDialog />
      </motion.div>
    </motion.div>
  );
}

export default EmptyState;
