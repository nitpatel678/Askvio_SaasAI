"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

function Interview() {

  const {interviewId} = useParams();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Image in center */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/interview.png"
          alt="interview"
          height={260}
          width={260}
          className="rounded-2xl mx-auto"
          priority
        />
      </motion.div>

      {/* Heading */}
      <motion.h2
        className="mt-6 text-3xl md:text-4xl font-bold text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        Ready To Start Interview?
      </motion.h2>

      {/* Paragraph */}
      <motion.p
        className="mt-3 text-center text-gray-300 max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
      >
        The interview will start soon. Be ready and stay confident — All the best!
      </motion.p>

      {/* Start Interview Button */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6 }}
      >
        <Link href={'/interview/'+interviewId+'/start'}>
        <Button className="px-6 py-3 text-lg rounded-xl bg-white text-black hover:bg-gray-200 flex items-center gap-2">
          Start Interview <ArrowRight />
        </Button>
        </Link>
      </motion.div>

      {/* Glass Div Section */}
      <motion.div
        className="mt-14 w-full max-w-xl rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
          Want to send interview link to someone else?
        </h2>

        <div className="flex flex-col md:flex-row gap-3">
          {/* Input field */}
          <Input
            type="email"
            placeholder="Enter email address"
            className="flex-1 rounded-xl px-4 py-2 text-black"
          />
          {/* Send button */}

          <Button className="rounded-xl bg-gray-800 text-white hover:bg-gray-700 px-6 py-2 flex items-center gap-2">
            <Send className="w-4 h-4" /> Send
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default Interview;
