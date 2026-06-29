import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";
import {dbconnect} from "@/lib/dbConnect";
import UserModel from "@/model/user.model";

export async function POST(request : Request) : Promise<Response> {
    await dbconnect()
   
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!user || !session) {
        return Response.json(
            {
                success: false,
                message: "Unauthorized access"
            },
            {
                status : 401
            }
        )
    }

    try{
        const { isAcceptingMessages } = await request.json()

        console.log("Acceptmessag ------------------", isAcceptingMessages)

        const updatedUser = await UserModel.findByIdAndUpdate(
            user._id,
            { isAcceptingMessage : isAcceptingMessages },
            { new: true }
        )

        if(!updatedUser){
            return Response.json(
                {
                    success: false,
                    message: "User not found in accept message"
                },
                {
                    status : 404
                }
            )
        }

        return Response.json(
            {
                success: true,
                message: "Message acceptance status updated successfully",
                data : {
                    isAcceptingMessage : updatedUser.isAcceptingMessage
                }
            },
            {
                status : 200
            }
        )
    } 
    catch (error : any){
        return Response.json(
            {
                success: false,
                message: error.message || "An error occurred while updating message acceptance status"
            },
            {
                status : 500
            }
        )
    }

}

export async function GET(request : Request) : Promise<Response> {
    await dbconnect()
    const session = await getServerSession(authOptions)
    const user = session?.user

     if (!user || !session) {
        return Response.json(
            {
                success: false,
                message: "Unauthorized access"
            },
            {
                status : 401
            }
        )
    }

    try{
        const foundUser = await UserModel.findById(user._id)

        if(!foundUser){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status : 404
                }
            )
        }

        return Response.json(
            {
                success: true,
                message: "User data fetched successfully",
                isAcceptingMessages : foundUser.isAcceptingMessage
            },
            {
                status : 200
            }
        )
    }
    catch (error : any){
        return Response.json(
            {
                success: false,
                message: error.message || "An error occurred while fetching user data"
            },
            {
                status : 500
            }
        )
    }


}