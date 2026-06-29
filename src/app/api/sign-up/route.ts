import { dbconnect } from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbconnect()

    try {
        const { username, email, password } = await request.json()

        const existingUser = await UserModel.findOne({
            username,
            isVerified : true
        })

        if (existingUser) {

            return Response.json(
                {
                    success: false,
                    message: "Username is already taken"
                },
                {
                    status: 200
                })

        }

        const existingUserByEmail = await UserModel.findOne({ email })

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        const expiryDate = new Date()

        expiryDate.setHours(expiryDate.getHours() + 1)

        if (existingUserByEmail) {

           if(existingUserByEmail.isVerified){

             return Response.json(
                {
                    success: false,
                    message: "User already exist with this email"
                },
                {
                    status: 400
                })

           }

           else{

                const hashPassword = await bcrypt.hash(password, 10)

                existingUserByEmail.password = hashPassword

                existingUserByEmail.verifyCode = verifyCode

                existingUserByEmail.verifyCodeExpiry = expiryDate

                await existingUserByEmail.save()
           }
        }

        else {

            const hashPassword = await bcrypt.hash(password, 10)

            const newUser = new UserModel({

                username,
                email,
                password: hashPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []

            })


            await newUser.save()

        }

        
        //send verification email

            const emailResponse = await sendVerificationEmail(
                email,
                username,
                verifyCode
            )

            if (!emailResponse.success) {
                return Response.json(
                    {
                        success: false,
                        message: emailResponse.message
                    },
                    {
                        status: 400
                    })
            }

             return Response.json(
            {
               success : true,
               message : emailResponse.message 
            },
            {
                status : 201
            })

    } catch (error:any) {
        console.error("Error registring User", error)

        return Response.json(
            {
                success: false,
                message: error.message
            },
            {
                status: 500
            }
        )
    }
}