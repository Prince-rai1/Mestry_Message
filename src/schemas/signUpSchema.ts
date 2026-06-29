import {z} from 'zod'

export const usernameValidation = z
.string()
.min(3, "Username must be atleast of 3 character")
.max(20, "Username must be no more than 20 character")
.regex(/^[A-Za-z][A-Za-z0-9_]{2,19}$/,"Username must not contain special character")

export const signUpSchema = z.object({
    username : usernameValidation,
    email : z.email({message:'Invalid email address'}),
    password: z.string().min(6, {message:"Password must be atlest 6 characters"})
})