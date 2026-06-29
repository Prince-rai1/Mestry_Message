"use client";
import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { signUpSchema } from "@/schemas/signUpSchema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  User,
  Mail,
  Lock,
  Loader2,
  MessageCircleMore,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [usernameIsAvailable, setUsernameIsAvailable] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const route = useRouter();

  // zod schema for form validation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const [debouncedUsername] = useDebounce(username, 900);

  //Debounce username input to check availability
  useEffect(() => {
    const checkUsernameAvailability = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameIsAvailable("");

        try {
          const res = await axios.get<ApiResponse>(
            `/api/check-username?username=${debouncedUsername}`,
          );

          setUsernameIsAvailable(res.data.message);
        } catch (error) {
          const err = error as AxiosError<ApiResponse>;

          setUsernameIsAvailable(
            err.response?.data.message || "Error checking username",
          );

          console.log(
            "error while checking username:",
            err.response?.data.message,
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };

    checkUsernameAvailability();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const res = await axios.post<ApiResponse>("/api/sign-up", data);

      if (res.data.success) {
        toast.success(res.data.message);

        route.replace(`/verify-code/${username}`);
      }
    } catch (error) {
      const err = error as AxiosError<ApiResponse>;

      setUsernameIsAvailable(
        err.response?.data.message || "Error checking username",
      );

      console.error("Error checking username:", err.response?.data.message);

      toast.error(err.response?.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-black">
      {/* Glow */}

      <div className="absolute -left-40 -top-40 h-128 w-lg rounded-full bg-blue-600/20 blur-[180px]" />

      <div className="absolute right-0 top-1/3 h-120 w-120 rounded-full bg-violet-600/20 blur-[180px]" />

      <div className="absolute bottom-0 left-1/3 h-100 w-100 rounded-full bg-cyan-500/10 blur-[160px]" />

      {/* Grid */}

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
                Create Account 🚀
              </CardTitle>

              <CardDescription className="mt-4 text-base leading-7 text-zinc-400">
                Create your Mystery Message account and start receiving
                anonymous messages today.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
              <FieldGroup>
                <Controller
                  name="username"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="username"
                        className="mb-2 text-zinc-200"
                      >
                        Username
                      </FieldLabel>

                      <div className="relative">
                        <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

                        <Input
                          {...field}
                          id="username"
                          placeholder="Choose a username"
                          autoComplete="username"
                          aria-invalid={fieldState.invalid}
                          onChange={(e) => {
                            field.onChange(e);
                            setUsername(e.target.value);
                          }}
                          className="
          h-13
          rounded-xl
          border-zinc-700
          bg-zinc-800/70
          pl-12
          pr-12
          text-white
          placeholder:text-zinc-500
          transition-all
          duration-300
          focus-visible:border-blue-500
          focus-visible:ring-2
          focus-visible:ring-blue-500/30
          "
                        />

                        {isCheckingUsername && (
                          <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-blue-400" />
                        )}
                      </div>

                      {fieldState.invalid && (
                        <FieldError
                          className="mt-2"
                          errors={[fieldState.error]}
                        />
                      )}

                      {!fieldState.invalid &&
                        usernameIsAvailable &&
                        !isCheckingUsername && (
                          <div
                            className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                              usernameIsAvailable === "Username is available"
                                ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                : "border border-red-500/20 bg-red-500/10 text-red-400"
                            }`}
                          >
                            {usernameIsAvailable === "Username is available"
                              ? "🟢 Username Available"
                              : "🔴 Username Already Taken"}
                          </div>
                        )}
                    </Field>
                  )}
                />
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="email"
                        className="mb-2 text-zinc-200"
                      >
                        Email
                      </FieldLabel>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

                        <Input
                          {...field}
                          id="email"
                          placeholder="Enter your email"
                          autoComplete="email"
                          aria-invalid={fieldState.invalid}
                          className="
          h-13
          rounded-xl
          border-zinc-700
          bg-zinc-800/70
          pl-12
          text-white
          placeholder:text-zinc-500
          transition-all
          duration-300
          focus-visible:border-blue-500
          focus-visible:ring-2
          focus-visible:ring-blue-500/30
          "
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
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          autoComplete="new-password"
                          aria-invalid={fieldState.invalid}
                          className="
          h-13
          rounded-xl
          border-zinc-700
          bg-zinc-800/70
          pl-12
          pr-12
          text-white
          placeholder:text-zinc-500
          transition-all
          duration-300
          focus-visible:border-blue-500
          focus-visible:ring-2
          focus-visible:ring-blue-500/30
          "
                        />

                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => setShowPassword(!showPassword)}
                          className="
          absolute
          right-2
          top-1/2
          h-9
          w-9
          -translate-y-1/2
          rounded-lg
          text-zinc-400
          hover:bg-zinc-700
          hover:text-white
          "
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
                        Creating...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </Field>{" "}
              </FieldGroup>
            </form>
          </CardContent>

          {/* Divider */}

          <div className="px-8">
            <div className="flex items-center gap-4">
              <Separator className="flex-1 bg-zinc-700" />

              <span className="text-sm text-zinc-500">OR</span>

              <Separator className="flex-1 bg-zinc-700" />
            </div>
          </div>

          <CardFooter className="flex flex-col gap-6 py-8 bg-linear-to-br from-slate-950 via-slate-900 to-black">
            <div className="rounded-2xl border border-blue-500/10 bg-blue-500/5 px-6 py-5 text-center">
              <h3 className="text-lg font-semibold text-white">
                Already have an account?
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Sign in and continue receiving anonymous messages.
              </p>
            </div>

            <Link href="/sign-in" className="w-full">
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
              hover:shadow-lg
              hover:shadow-blue-500/20
              hover:text-white
              "
              >
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <p className="max-w-sm text-center text-xs leading-6 text-zinc-500">
              By creating an account you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
