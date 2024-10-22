import promptModel from "@/models/promptModel";
import { connectToDB } from "@/utils/database";

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const response = await promptModel
      .find({ creator: params.id })
      .populate("creator");
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all posts", { status: 500 });
  }
}
