"use client";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signInSchema } from "@/schemas/signInSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  MessageCircleMore,
} from "lucide-react";
import { Lock } from "lucide-react";
import { User } from "lucide-react";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const route = useRouter();

  // zod schema for form validation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await signIn("credentials", {
        identifier: data.identifier,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Successfully SigIn");

      route.replace("/dash-board");
    } catch (error) {
      toast.error("error while signIn");

      console.log("Error while signIn: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-black">
      {/* Background */}

      <div className="absolute -left-40 -top-40 h-128 w-lg rounded-full bg-blue-600/20 blur-[180px]" />

      <div className="absolute right-0 top-1/3 h-120 w-120 rounded-full bg-violet-600/20 blur-[180px]" />

      <div className="absolute bottom-0 left-1/3 h-100 w-100 rounded-full bg-cyan-500/10 blur-[160px]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[60px_60px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <Card
          className="
        w-full
        max-w-xl
        rounded-[32px]
        border
        border-white/10
        bg-zinc-900/70
        backdrop-blur-2xl
        shadow-[0_20px_80px_rgba(0,0,0,.45)]
        "
        >
          <CardHeader className="space-y-6 pb-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-blue-600 via-violet-600 to-cyan-500 shadow-xl shadow-blue-500/30">
              <MessageCircleMore className="h-10 w-10 text-white" />
            </div>

            <div className="text-center">
              <CardTitle className="text-4xl font-bold text-white">
                Welcome Back 👋
              </CardTitle>

              <CardDescription className="mt-4 text-base leading-7 text-zinc-400">
                Sign in to continue your anonymous messaging journey.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
              <FieldGroup>
                <Controller
                  name="identifier"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="identifier"
                        className="mb-2 text-zinc-200"
                      >
                        Username or Email
                      </FieldLabel>

                      <div className="relative">
                        <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

                        <Input
                          {...field}
                          id="identifier"
                          placeholder="Enter your username or email"
                          autoComplete="username"
                          aria-invalid={fieldState.invalid}
                          className=" h-13 rounded-xl border-zinc-700 bg-zinc-800/70 pl-12 text-white placeholder:text-zinc-500 focus-visible:border-blue-500   focus-visible:ring-2 focus-visible:ring-blue-500/30 transition-all duration-300 "
                        />
                      </div>

                      {fieldState.invalid && (
                        <FieldError
                          className="mt-2"
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="password"
                        className="mb-2 text-zinc-200"
                      >
                        Password
                      </FieldLabel>

                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

                        <Input
                          {...field}
                          id="password"
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          aria-invalid={fieldState.invalid}
                          type={showPassword ? "text" : "password"}
                          className=" h-13 rounded-xl border-zinc-700 bg-zinc-800/70 pl-12 pr-12 text-white placeholder:text-zinc-500 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/30 transition-all duration-300 "
                        />

                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => setShowPassword(!showPassword)}
                          className=" absolute right-2 top-1/2 h-9 w-9 -translate-y-1/2 rounded-lg text-zinc-400 hover:bg-zinc-700 hover:text-white "
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </Button>
                      </div>

                      {fieldState.invalid && (
                        <FieldError
                          className="mt-2"
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                />

                <Field orientation="horizontal" className="pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => form.reset()}
                    className="
    h-12
    rounded-xl
    bg-zinc-800
    text-white
    hover:bg-zinc-700
    "
                  >
                    Reset
                  </Button>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="
    h-12
    flex-1
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
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>

          {/* Divider */}

          <div className="px-8">
            <div className="flex items-center gap-4">
              <Separator className="flex-1 bg-zinc-100" />

              <span className="text-sm text-zinc-100">OR</span>

              <Separator className="flex-1 bg-zinc-100" />
            </div>
          </div>

          {/* Footer */}

          <CardFooter className="flex flex-col gap-6 py-8 bg-linear-to-br from-slate-950 via-slate-900 to-black">
            <p className="text-center text-sm text-zinc-400">
              Don't have an account?
            </p>

            <Link href="/sign-up" className="w-full">
              <Button
                variant="outline"
                className="
              h-12
              w-full
              rounded-xl
              border-zinc-700
              bg-zinc-800/50
              text-white
              transition-all
              duration-300
              hover:border-blue-500
              hover:bg-zinc-800
              hover:text-white
              "
              >
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <p className="text-center text-xs leading-6 text-zinc-500">
              By continuing you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
