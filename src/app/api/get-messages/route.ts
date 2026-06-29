import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { dbconnect } from "@/lib/dbConnect";
import UserModel, { User } from "@/model/user.model";
import mongoose from "mongoose";

export async function GET(request: Request): Promise<Response> {
  await dbconnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || !session) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized access",
      },
      {
        status: 401,
      },
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $unwind: {
          path: "$messages",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          "messages.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          messages: {
            $push: "$messages",
          },
        },
      },
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    // console.log(user[0].messages)

    return Response.json(
      {
        success: true,
        message: "User Message fetched successfully",
        messages: user[0].messages,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    console.error("Error fetching user messages:", error);
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
