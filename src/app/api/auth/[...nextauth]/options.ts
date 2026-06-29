import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { dbconnect } from "@/lib/dbConnect"
import UserModel from "@/model/user.model"

export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                identifier: {
                    label: "Email or Username",
                    type: "text"
                },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials: any): Promise<any> {
                await dbconnect()

                try {

                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    })

                    if (!user) {
                        throw new Error("No user Founnd ")
                    }

                    if (!user.isVerified) {
                        throw new Error("Please verify your account first")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if (isPasswordCorrect) {
                        return user
                    }
                    else {
                        throw new Error("Incorrect password")
                    }

                } catch (error: any) {
                    throw new Error(error)
                }

            }

        })
    ],
    pages : {
        signIn : "/sign-in",
        signOut : '/sign-up'
    },
    session : {
        strategy : "jwt"
    },
    secret : process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, user }) {
            // Agar user pehli baar login kar raha hai, toh token mein uski details daal do
            if (user) {
                token._id = user._id?.toString();
                token.username = user.username;
                token.isAcceptingMessage = user.isAcceptingMessage;
                token.isVerified = user.isVerified;
            }
            return token;
        },
        async session({ session, token }) {
            // Token se nikal kar data session mein daal do, taaki frontend par mil sake
            if (token) {
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessage = token.isAcceptingMessage;
            }
            return session;
        }
    }
}