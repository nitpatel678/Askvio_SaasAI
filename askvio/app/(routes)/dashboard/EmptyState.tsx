import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CreateInterviewDialog from "./CreateInterviewDialog";

function EmptyState() {
  return (
    <div className="mt-14 flex justify-center flex-col items-center gap-5 border-4 border-dashed p-10 rounded-2xl border-gray-500">
      <Image
        src="/nointerview.png"  // Image must be inside public folder
        alt="No Interviews"
        width={300}
        height={300}
        priority
      />
      <h2 className="mt-2 text-lg text-white">You have no interviews scheduled</h2>
      <CreateInterviewDialog />
    </div>
  );
}

export default EmptyState;
