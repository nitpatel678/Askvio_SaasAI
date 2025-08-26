import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import axios from "axios";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // convert file -> buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // upload to ImageKit
    const uploadResponse = await imageKit.upload({
      file: buffer,
      fileName: Date.now().toString() + ".pdf",
      isPrivateFile: false,
      useUniqueFileName: true,
    });

    // call n8n webhook with resumeUrl
    const result = await axios.post(
      "https://n8n-production-84a4.up.railway.app/webhook/generate-interview-question",
      { resumeUrl: uploadResponse.url }
    );

    let parsed;
    try {
      // Try Gemini-style response
      parsed = JSON.parse(result.data.content?.parts?.[0]?.text ?? "[]");
    } catch {
      // If it's already JSON
      parsed = result.data;
    }

    // Extract only questions safely
    const onlyQuestions = Array.isArray(parsed)
      ? parsed.map((item: any) => item.question ?? item)
      : [];

    return NextResponse.json(
      {
        questions: onlyQuestions,
        resumeUrl: uploadResponse.url,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error in generate-interview-questions:", error.response?.data || error.message || error);
    return NextResponse.json(
      { error: error.response?.data || error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
