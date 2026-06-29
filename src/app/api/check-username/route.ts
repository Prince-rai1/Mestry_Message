import { dbconnect } from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const usernameSchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request): Promise<Response> {
  await dbconnect();

  try {
    const { searchParams } = new URL(request.url);

    const usernameParams = searchParams.get("username");

    if (!usernameParams) {
      return Response.json(
        {
          success: false,
          message: "Username is required",
        },
        {
          status: 400,
        },
      );
    }

    const parsedData = usernameSchema.safeParse({ username: usernameParams });

    if (!parsedData.success) {
      return Response.json(
        {
          success: false,
          message: parsedData.error.issues[0].message,
        },
        {
          status: 400,
        },
      );
    }

    const { username } = parsedData.data;

    const existingUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        {
          status: 200,
        },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is available",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error checking username availability:", error);

    return Response.json(
      {
        success: false,
        message: "An error occurred while checking username availability",
      },
      {
        status: 500,
      },
    );
  }
}
