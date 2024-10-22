import promptModel from "@/models/promptModel";
import { connectToDB } from "@/utils/database";

export async function POST(req) {
  const { userId, tag, prompt } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new promptModel({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a prompt", { status: 500 });
  }
}
