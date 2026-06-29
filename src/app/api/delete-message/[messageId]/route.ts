import { dbconnect } from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ messageId: string }> },
) {
  await dbconnect();

  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
   const resolvedParams = await params;
    const messageId = resolvedParams.messageId;

    console.log(messageId)
    console.log(typeof messageId)

    if (!session?.user) {
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

    const updatedUser = await UserModel.findByIdAndUpdate(
      {
        _id: user?._id,
      },
      {
        $pull: {
          messages: {
            _id: messageId,
          },
        },
      },
      {
        new: true,
      },
    );

    if (!updatedUser) {
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

    return Response.json(
      {
        success: true,
        message: "Message deleted successfully",
        data: updatedUser.messages
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    console.log("Error while deleting a message: ", error.message);
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
