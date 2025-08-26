import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[/api/akool-knowledge-base] raw body:", body);

    let { questions, interviewId } = body;

    // Defensive: normalize questions into a string
    let questionsText: string;
    if (Array.isArray(questions)) {
      questionsText = questions.join("\n");
    } else if (typeof questions === "string") {
      questionsText = questions;
    } else {
      console.warn("No valid questions provided, got:", questions);
      return NextResponse.json(
        { error: "Invalid questions provided", received: questions },
        { status: 400 }
      );
    }

    // Defensive: check for a valid interviewId
    if (!interviewId) {
        console.warn("No interviewId provided in the request body.");
        return NextResponse.json(
            { error: "interviewId is required" },
            { status: 400 }
        );
    }
    
    // Use a unique name for the knowledge base for each interview
    const uniqueKnowledgeBaseName = `Interview Session - ${interviewId}`;

    // Akool API Authorization
    const authHeader = { Authorization: `Bearer ${process.env.AKOOL_API_TOKEN}` };

    // Create a new knowledge base with the unique name
    const resp = await axios.post(
      "https://openapi.akool.com/api/open/v4/knowledge/create",
      {
        name: uniqueKnowledgeBaseName,
        prologue: "Tell me about yourself",
        prompt: `You are a professional job interviewer, ask the user one interview question at a time, wait for their spoken response before asking the next question. Start with: "Tell me about yourself". Then ask the following questions in a professional and encouraging tone:\n\n${questionsText}`,
      },
      {
        headers: authHeader,
      }
    );

    console.log("Created a new knowledge item with a unique name:", resp.data);
    return NextResponse.json(resp.data);

  } catch (err: any) {
    console.error(
      "Error in /api/akool-knowledge-base:",
      err?.response?.data ?? err?.message ?? err
    );
    return NextResponse.json(
      { error: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}