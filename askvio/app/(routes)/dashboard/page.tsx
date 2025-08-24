"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import EmptyState from "./EmptyState";
import CreateInterviewDialog from "./CreateInterviewDialog";
function Dashboard() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState<any[]>([]);
  return (
    <div className="py-20 px-10 md:px-20 lg:px-44 xl:px-56">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl">My Dashboard</h2>
          <h2>
            Welcome,{" "}
            <span className="gradient-text text-xl font-bold">
            {user?.fullName}
          </span>
        </h2>
      </div>

      <CreateInterviewDialog />

      </div> 

      {interviewList.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          {interviewList.map((interview) => (
            <div key={interview.id}>{interview.title}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
