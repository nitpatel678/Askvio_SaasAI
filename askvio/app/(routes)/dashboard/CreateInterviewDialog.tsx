import React from "react";
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
function CreateInterviewDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-white text-black mt-4 hover:bg-gray-600 hover:text-stone-200 cursor-pointer">
          + Create Interview
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-3xl ">
        <DialogHeader>
          <DialogTitle className="text-black">Please Submit Following Details</DialogTitle>
          <DialogDescription>
            <Tabs defaultValue="resume-upload" className="w-full mt-5">
              <TabsList>
                <TabsTrigger value="resume-upload">Resume Upload</TabsTrigger>
                <TabsTrigger value="job-description">Job Description</TabsTrigger>
              </TabsList>
              <TabsContent value="resume-upload">
                <ResumeUpload />
              </TabsContent>
              <TabsContent value="job-description">
                <JobDescription />
              </TabsContent>
            </Tabs>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <DialogClose>
                <Button className="text-black bg-gray-200 cursor-pointer" variant={'ghost'}>Close</Button>
            </DialogClose>
            <Button className="bg-black text-white">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateInterviewDialog;
