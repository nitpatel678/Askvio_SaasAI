import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ResumeUpload from "../_components/ResumeUpload";
import { Loader2Icon } from "lucide-react";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserDetailContext } from "@/app/Provider";
import {motion} from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function CreateInterviewDialog() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userDetail } = useUserDetailContext();
  const saveInterviewQuestion = useMutation(
    api.Interview.SaveInterviewQuestion
  );

  const onSubmit = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    // 👇 if your API expects "resume", change this key
    formData.append("file", file);

    try {
      const res = await axios.post(
        "/api/generate-interview-questions",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res?.data?.status == 429) {
        toast.warning(res?.data?.result)
        return
      }


      console.log("API Response:", res.data);

      const convexUid = userDetail?.id ?? userDetail?._id;
      if (!convexUid) {
        console.error("Missing user id - cannot save interview", userDetail);
        return;
      }

      const interviewId = await saveInterviewQuestion({
        questions: res.data.questions,
        resumeUrl: res.data.resumeUrl,
        uid: convexUid,
      });



      router.push('/interview/' + interviewId)

      console.log("Saved to DB:", interviewId);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
   <Dialog>
  <DialogTrigger>
    <Button className="bg-white text-black mt-4 hover:bg-gray-600 hover:text-stone-200 cursor-pointer">
      + Create Interview
    </Button>
  </DialogTrigger>

  <DialogContent className="w-full max-w-md sm:max-w-lg lg:max-w-3xl p-6 sm:p-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <DialogHeader>
        <DialogTitle className="text-white text-lg sm:text-xl md:text-2xl">
          Please Upload Your Resume
        </DialogTitle>
        <DialogDescription className="mt-4">
          <ResumeUpload setFiles={(file: File) => setFile(file)} />
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
        <DialogClose>
          <Button
            className="text-black bg-gray-200 w-full sm:w-auto"
            variant="ghost"
            disabled={loading}
          >
            Close
          </Button>
        </DialogClose>
        <Button
          className="bg-black text-white w-full sm:w-auto flex justify-center items-center"
          onClick={onSubmit}
          disabled={loading || !file}
        >
          {loading ? <Loader2Icon className="animate-spin mr-2" /> : "Submit"}
        </Button>
      </DialogFooter>
    </motion.div>
  </DialogContent>
</Dialog>

  );
}

export default CreateInterviewDialog;
