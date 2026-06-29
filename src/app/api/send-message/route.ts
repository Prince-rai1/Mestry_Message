import {dbconnect} from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import {Message} from "@/model/user.model";
import { success } from "zod";

export async function POST(request : Request) {
    await dbconnect()

    const { username, content} = await request.json()

    try {
        const user = await UserModel.findOne({username})

        if(!user){
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

        if(!user.isAcceptingMessage){
            return Response.json({
                success : false,
                message : "User is not accepting Messages right now"
            },
            {
                status : 403
            }
        )
        }

        const newMessage = {
            content,
            createdAt: new Date()
        } 

        user.messages.push(newMessage as Message)

        await user.save()

        return Response.json(
            {
                success: true,
                message: "Message sent successfully"
            },
            {
                status : 200
            }
        )
        
    }
     catch ( error : any) {

        console.error("Error sending message:", error);

        return Response.json(
        { 
            success: false,
            message: "An error occurred while sending the message."
         }, 
         { 
            status: 500 
         }
     );
  }
    
}