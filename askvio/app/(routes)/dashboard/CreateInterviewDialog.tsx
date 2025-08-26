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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import JobDescription from "../_components/JobDescription";
import ResumeUpload from "../_components/ResumeUpload";
import { Loader2Icon } from "lucide-react";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserDetailContext } from "@/app/Provider";

function CreateInterviewDialog() {
  const [file, setFile] = useState<File | null>();
  const [formData, setFormData] = useState<any>();
  const [loading, setLoading] = useState(false);

  // ✅ pull from custom hook (which now works)
  const { userDetail } = useUserDetailContext();
  const saveInterviewQuestion = useMutation(
    api.Interview.SaveInterviewQuestion
  );

  const onHandleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit = async () => {
    if (!file) {
      setLoading(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "/api/generate-interview-questions",
        formData
      );

      console.log("API Response:", res.data);

      // ✅ now userDetail will be defined
      const convexUid = userDetail?.id ?? userDetail?._id;
      if (!convexUid) {
        console.error("Missing user id - cannot save interview", userDetail);
        setLoading(false);
        return;
      }

      const resp = await saveInterviewQuestion({
        questions: res.data.questions,
        resumeUrl: res.data.resumeUrl,
        uid: convexUid,
      });

      console.log("Saved to DB:", resp);
    } catch (error) {
      console.error(error);
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
            Please Submit Following Details
          </DialogTitle>
          <DialogDescription>
            <Tabs defaultValue="resume-upload" className="w-full mt-5">
              <TabsList>
                <TabsTrigger value="resume-upload">Resume Upload</TabsTrigger>
                <TabsTrigger value="job-description">
                  Job Description
                </TabsTrigger>
              </TabsList>
              <TabsContent value="resume-upload">
                <ResumeUpload setFiles={(file: File) => setFile(file)} />
              </TabsContent>
              <TabsContent value="job-description">
                <JobDescription onHandleInputChange={onHandleInputChange} />
              </TabsContent>
            </Tabs>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button
              className="text-black bg-gray-200 cursor-pointer"
              variant={"ghost"}
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
