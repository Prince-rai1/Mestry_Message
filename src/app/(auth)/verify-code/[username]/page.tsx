"use client";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import {
  MessageCircleMore,
  ShieldCheck,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { signOut } from "next-auth/react";

function VerifyAccount() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const param = useParams<{ username: string }>();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setisSubmitting(true);
    try {
      const res = await axios.post<ApiResponse>("/api/verify-code", {
        username: param.username,
        code: data.code,
      });

      setMessage(res.data.message);

      toast.success(res.data.message);

      await signOut({
        redirect: false,
      });

      router.replace("/sign-in");
    } catch (error) {
      const err = error as AxiosError<ApiResponse>;

      setMessage(err.response?.data.message || "Error verifying code");

      toast.error(err.response?.data.message);
      console.log("error while verifiying:", err.response?.data.message);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-black">
      {/* Background Glow */}

      <div className="absolute -left-40 -top-40 h-72 w-72 sm:h-128 sm:w-lg rounded-full bg-blue-600/20 blur-[180px]" />

      <div className="absolute right-0 top-1/3 h-64 w-64 sm:h-120 sm:w-120 rounded-full bg-violet-600/20 blur-[180px]" />

      <div className="absolute bottom-0 left-1/3 h-52 w-52 sm:h-100 sm:w-100 rounded-full bg-cyan-500/10 blur-[160px]" />

      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[60px_60px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
        <Card
         className=" w-full max-w-md sm:max-w-lg lg:max-w-xl rounded-[24px] sm:rounded-[32px] border border-white/10 bg-zinc-900/70 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,.45)] "
        >
          <CardHeader className="space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-blue-600 via-violet-600 to-cyan-500 shadow-xl shadow-blue-500/30">
              <MessageCircleMore className="h-10 w-10 text-white" />
            </div>

            <div className="text-center">
              <CardTitle className="text-4xl font-bold text-white">
                Verify Account ✨
              </CardTitle>

              <CardDescription className="mt-4 text-base leading-7 text-zinc-400">
                Enter the verification code we sent to your email to activate
                your Mystery Message account.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Controller
                name="code"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="mb-6 flex items-center justify-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 py-3">
                      <ShieldCheck className="h-5 w-5 text-blue-400" />

                      <span className="text-sm font-medium text-blue-300">
                        Enter your 6-digit verification code
                      </span>
                    </div>

                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                        {...field}
                      >
                        <InputOTPGroup>
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="
                             h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14
                            rounded-xl
                            border-zinc-700
                            gap-1 sm:gap-2
                            bg-zinc-800
                            text-base sm:text-lg
                            font-bold
                            text-white
                            transition-all
                            duration-300
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/30
                            "
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    {fieldState.invalid && (
                      <FieldError
                        className="mt-4 text-center"
                        errors={[fieldState.error]}
                      />
                    )}

                    {message && (
                      <div
                        className={`mt-5 rounded-xl border px-4 py-3 text-center text-sm font-medium ${
                          message.toLowerCase().includes("success")
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : "border-red-500/20 bg-red-500/10 text-red-400"
                        }`}
                      >
                        {message}
                      </div>
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="
              h-11 sm:h-12
              w-full
              rounded-xl
              bg-blue-600
              transition-all
              duration-300
              hover:bg-blue-500
              hover:shadow-lg
              hover:shadow-blue-500/30
              "
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <div className="px-8">
            <Separator className="bg-zinc-700" />
          </div>

          <CardFooter className="justify-center px-6 py-5 sm:py-6 bg-linear-to-br from-slate-950 via-slate-900 to-black">
            <p className="text-center text-[11px] sm:text-xs leading-6 text-white">
              Didn't receive the code? Check your spam folder or request a new
              verification email.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default VerifyAccount;
