'use client';

import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type InterviewData = {
  interviewQuestions: string[]; 
  userId: string | null; 
  id: string | null;
};

function StartInterview() {
  const { interviewId } = useParams();
  const convex = useConvex();

  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);

  useEffect(() => {
    GetInterviewQuestions();
  }, [interviewId]);

  const GetInterviewQuestions = async () => {
    const result = await convex.query(api.Interview.GetInterviewQuestions, {
      // @ts-ignore
      interviewRecordId: interviewId,
    });
    console.log('Convex result for interviewRecordId=', interviewId, result);

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
    if (interviewData && Array.isArray(interviewData.interviewQuestions) && interviewData.interviewQuestions.length > 0) {
      GetKnowledgeBase();
    } else {
      console.log('GetKnowledgeBase skipped — no interviewData yet or questions empty', interviewData);
    }
  }, [interviewData]);

  const GetKnowledgeBase = async () => {
    try {
      // defensive: ensure we have an array of strings and an interviewId
      if (!interviewData || !Array.isArray(interviewData.interviewQuestions) || interviewData.interviewQuestions.length === 0 || !interviewId) {
        console.warn('GetKnowledgeBase aborted — no questions or interviewId to send', interviewData, interviewId);
        return;
      }

      // log exactly what we will send
      console.log('Sending questions to /api/akool-knowledge-base:', interviewData.interviewQuestions);

      const result = await axios.post('/api/akool-knowledge-base', {
        questions: interviewData.interviewQuestions,
        interviewId: interviewId // Pass the interviewId to the API
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('Akool knowledge-base response:', result.data);
    } catch (err) {
      console.error('Error calling /api/akool-knowledge-base:', err);
    }
  };

  return <div>StartInterview</div>;
}

export default StartInterview;