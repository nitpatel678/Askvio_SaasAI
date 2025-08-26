"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import EmptyState from "./EmptyState";
import CreateInterviewDialog from "./CreateInterviewDialog";
import { motion } from "framer-motion";

function Dashboard() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState<any[]>([]);

  return (
    <div className="py-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-44">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4 sm:gap-0"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            My Dashboard
          </h1>
          <h2 className="text-base sm:text-lg text-gray-300">
            Welcome,{" "}
            <span className="gradient-text font-bold">{user?.fullName}</span>
          </h2>
        </div>

        {/* Create Interview Button */}
        <div>
          <CreateInterviewDialog />
        </div>
      </motion.div>

      {/* Interview List or Empty State */}
      {interviewList.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {interviewList.map((interview) => (
            <div
              key={interview.id}
              className="p-4 rounded-xl border border-gray-700 bg-gray-800 text-white shadow-sm"
            >
              {interview.title}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;
