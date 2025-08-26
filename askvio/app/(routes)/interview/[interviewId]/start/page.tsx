"use client";

import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { GenericAgoraSDK } from "akool-streaming-avatar-sdk";
import { Button } from "@/components/ui/button";

type InterviewData = {
  interviewQuestions: string[];
  userId: string | null;
  id: string | null;
};

const CONTAINER_ID = 'akool-avtar-container';
const AVATAR_ID = "data_lira_sp_02"

function StartInterview() {
  const { interviewId } = useParams();
  const convex = useConvex();

  const [interviewData, setInterviewData] = useState<InterviewData | null>(
    null
  );
  const videoContainerRef =useRef<any>(null);
  const [micOn,setMicOn] = useState(false);
  const [kbId , setKbId] = useState<string|null>();

  const [agoraSdk,setAgoraSdk] = useState<GenericAgoraSDK|null>(null)

  useEffect(() => {
    GetInterviewQuestions();
  }, [interviewId]);

  const GetInterviewQuestions = async () => {
    const result = await convex.query(api.Interview.GetInterviewQuestions, {
      // @ts-ignore
      interviewRecordId: interviewId,
    });
    console.log("Convex result for interviewRecordId=", interviewId, result);

    if (result.length > 0) {
      const data = result[0] as unknown as {
        _id: string;
        interviewQuestions: string[];
        userId: string | null;
      };

      setInterviewData({
        interviewQuestions: data.interviewQuestions,
        userId: data.userId,
        id: data._id, // map _id to id
      });
    }
  };

  useEffect(() => {
    // Only call GetKnowledgeBase when interviewData is populated and contains at least one question
    if (
      interviewData &&
      Array.isArray(interviewData.interviewQuestions) &&
      interviewData.interviewQuestions.length > 0
    ) {
      GetKnowledgeBase();
    } else {
      console.log(
        "GetKnowledgeBase skipped — no interviewData yet or questions empty",
        interviewData
      );
    }
  }, [interviewData]);

  const GetKnowledgeBase = async () => {
    try {
      // defensive: ensure we have an array of strings and an interviewId
      if (
        !interviewData ||
        !Array.isArray(interviewData.interviewQuestions) ||
        interviewData.interviewQuestions.length === 0 ||
        !interviewId
      ) {
        console.warn(
          "GetKnowledgeBase aborted — no questions or interviewId to send",
          interviewData,
          interviewId
        );
        return;
      } // log exactly what we will send

      console.log(
        "Sending questions to /api/akool-knowledge-base:",
        interviewData.interviewQuestions
      );

      const result = await axios.post(
        "/api/akool-knowledge-base",
        {
          questions: interviewData.interviewQuestions,
          interviewId: interviewId, // Pass the interviewId to the API
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Akool knowledge-base response:", result.data);
      console.log(result);
      setKbId(result?.data?.data._id)
    } catch (err) {
      console.error("Error calling /api/akool-knowledge-base:", err);
    }
  };

  useEffect(() => {
    const sdk = new GenericAgoraSDK({ mode: "rtc", codec: "vp8" });
    sdk.on({
      onStreamMessage: (uid, message) => {
        console.log("Received message from", uid, ":", message);
      },
      onException: (error) => {
        console.error("An exception occurred:", error);
      },
      onMessageReceived: (message) => {
        console.log("New message:", message);
      },
      onMessageUpdated: (message) => {
        console.log("Message updated:", message);
      },
      onNetworkStatsUpdated: (stats) => {
        console.log("Network stats:", stats);
      },
      onTokenWillExpire: () => {
        console.log("Token will expire in 30s");
      },
      onTokenDidExpire: () => {
        console.log("Token expired");
      },
      onUserPublished: async (user, mediaType) => {
        if (mediaType === "video") {
          user?.videoTrack?.play(videoContainerRef.current)
        } else if (mediaType === "audio") {
         user?.audioTrack?.play();
        }
      },
    });

    setAgoraSdk(sdk);

    return ()=>{
        sdk.leaveChat();
        sdk.leaveChannel();
        sdk.closeStreaming();
    }
  }, []);

  const StartConversation= async()=>{
    // create akool session
    const result = await axios.post('/api/akool-session', {
        avtar_id : AVATAR_ID,
        knowledge_id : setKbId
    });

    console.log(result.data);
  }

  return <div>
    <div ref={videoContainerRef}
    id={CONTAINER_ID}
    style={{
        width : 640,
        height : 640,
        background : '#ffffff',
        marginTop :20
    }}>


    </div>
    <div>
        <Button className="bg-white text-black">{micOn?"Mute Mic": "Unmute Mic"}</Button>
        <Button className="bg-white text-black">Leave Conversation</Button>
        <Button className="bg-white text-black" onClick={StartConversation}>Start Conversation</Button>
    </div>
  </div>;
}

export default StartInterview;
