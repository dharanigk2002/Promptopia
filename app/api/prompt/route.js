import { connectToDB } from "@/utils/database";
import promptModel from "@/models/promptModel";

export async function GET() {
  try {
    await connectToDB();
    const prompts = await promptModel.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all products", { status: 500 });
  }
}
