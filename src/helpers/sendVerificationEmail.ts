import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import VerifyEmail from "../../email/VerificationEmailTemplate";

export async function sendVerificationEmail(
    email:string,
    username : string,
    verificationCode : string

): Promise<ApiResponse>{

    try {
      const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: "Mstry Message | Verification Code",
      react: VerifyEmail({verificationCode, username}),
    });
    
    console.log(data, error)

    return {success: true, message: "Verification email send successfully"}
    
} catch (error) {
        console.error("Error sending verification email")
        return {success: false, message: "Failed to send verification email"}
    }
}