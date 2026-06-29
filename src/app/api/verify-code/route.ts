import {dbconnect} from "@/lib/dbConnect"
import UserModel from "@/model/user.model";
import {z} from "zod";

export async function POST(request : Request) : Promise<Response> {
    await dbconnect()

    try {
        const { username, code } = await request.json()

        const user = await UserModel.findOne({ username })

        if (!user){
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
        
        const isCodeValid = user.verifyCode === code

        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired){

            user.isVerified = true
            user.verifyCode = "00000"
            user.verifyCodeExpiry = new Date("2004-09-09T00:00:00.000Z")

            await user.save()

            return Response.json(
                {
                    success: true,
                    message: "User verified successfully"
                },
                {
                    status : 200
                }
            )

        }

       else if(!isCodeValid){

            return Response.json(
                {
                    success: false,
                    message: "Invalid verification code"
                },
                {
                    status : 400
                }
            )

       }

       else if(!isCodeNotExpired){

           return Response.json(
              {
                  success: false,
                  message: "Verification code has expired please sign up again to receive a new code."
              },
              {
                  status : 400
              }
            )
       }

       return Response.json(
        {
            success: false,
            message: "Invalid request"
        },
        {
            status : 400
        }
       )
}


    catch (error : any) {

        console.log("Error in verifying code", error)   

        return Response.json(
            {
                success: false,
                message: "Internal Server Error while verifying User"
            },
            {
                status : 500
            }
        )

    }
}
