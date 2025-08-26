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

function CreateInterviewDialog() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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

      console.log("API Response:", res.data);

      const convexUid = userDetail?.id ?? userDetail?._id;
      if (!convexUid) {
        console.error("Missing user id - cannot save interview", userDetail);
        return;
      }

      const resp = await saveInterviewQuestion({
        questions: res.data.questions,
        resumeUrl: res.data.resumeUrl,
        uid: convexUid,
      });

      console.log("Saved to DB:", resp);
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
      <DialogContent className="min-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-black">
            Please Upload Your Resume
          </DialogTitle>
          <DialogDescription>
            <ResumeUpload setFiles={(file: File) => setFile(file)} />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button
              className="text-black bg-gray-200 cursor-pointer"
              variant={"ghost"}
              disabled={loading}
            >
              Close
            </Button>
          </DialogClose>
          <Button
            className="bg-black cursor-pointer text-white"
            onClick={onSubmit}
            disabled={loading || !file}
          >
            {loading ? <Loader2Icon className="animate-spin" /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateInterviewDialog;
