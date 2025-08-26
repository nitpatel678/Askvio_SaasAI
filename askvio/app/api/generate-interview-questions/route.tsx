import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import axios from "axios";

var imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const uploadResponse = await imageKit.upload({
      file: buffer,
      fileName: Date.now().toString() + ".pdf",
      isPrivateFile: false,
      useUniqueFileName: true,
    });

    // call n8n webhook

    const result = await axios.post(
      "https://n8n-production-84a4.up.railway.app/webhook/generate-interview-question",
      {
        resumeUrl: uploadResponse?.url,
      }
    );

    // Parse the string into JSON
    const parsed = JSON.parse(result.data.content.parts[0].text);

    // Extract only questions
    const onlyQuestions = parsed.map((item: any) => item.question);

    return NextResponse.json(
      {
        questions: onlyQuestions,
        resumeUrl: uploadResponse?.url,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
