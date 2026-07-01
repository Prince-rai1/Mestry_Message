"use client";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useCompletion } from "@ai-sdk/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Loader2, MessageSquare, SendHorizontal, Sparkles } from "lucide-react";

function page() {
  const [isSending, SetIsSending] = useState(false);
  const { completion, complete, error, isLoading } = useCompletion({
    api: "/api/suggest-message",
  });

  const params = useParams();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof messageSchema>) => {
    SetIsSending(true);
    try {
      const result = await axios.post<ApiResponse>("/api/send-message", {
        username: params.username,
        content: data.content,
      });
      if (result.data.success) {
        toast.success(result.data.message);
      }
    } catch (error: any) {
      const err = error as AxiosError<ApiResponse>;

      console.error("Error checking username:", err.response?.data.message);

      toast.error(err.response?.data.message);
    } finally {
      SetIsSending(false);
    }
  };

  const handleSuggestion = async() => {
    try {
      await complete("")
    } catch (error: any) {
      console.log("Error while using Ai: ", error.message);
    }
  };

  const questions = useMemo(() => {
    return completion
      .split("||")
      .map((q) => q.trim())
      .filter(Boolean);
  }, [completion]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-gray-800 via-gray-900 to-black">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 h-120 w-120 rounded-full bg-blue-600/20 blur-[150px]" />
      <div className="absolute top-1/3 -right-40 h-120 w-120 rounded-full bg-violet-600/20 blur-[170px]" />
      <div className="absolute bottom-0 left-1/3 h-100 w-100 rounded-full bg-cyan-500/10 blur-[150px]" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[60px_60px]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-8 px-6 py-14">
        {/* Hero */}
        <div className="text-center">
          <h1 className="bg-linear-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text sm:text-5xl text-4xl font-extrabold text-transparent">
            Anonymous Message
          </h1>

          <p className="mt-4 text-lg text-zinc-400">
            Send an honest anonymous message to
          </p>

          <span className="mt-2 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 font-semibold text-blue-300">
            @{params.username}
          </span>
        </div>

        {/* Message Card */}
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-px shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-xl">
          <div className="rounded-[32px] bg-zinc-900/80 p-8 backdrop-blur-xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-linear-to-br from-blue-500 to-violet-600 p-3 shadow-lg shadow-blue-500/20">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Write your message
                </h2>

                <p className="text-sm text-zinc-400">
                  Your identity will remain completely anonymous.
                </p>
              </div>
            </div>

            <form
              id="send-message"
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FieldGroup>
                <Controller
                  name="content"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="mb-2 text-zinc-200">
                        Message
                      </FieldLabel>

                      <Input
                        {...field}
                        placeholder="Type your anonymous message here..."
                        className="rounded-2xl border-zinc-700 bg-zinc-800/80 text-white placeholder:text-zinc-500 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-500 p-6"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button
                type="submit"
                disabled={isSending}
                className="h-14 w-full rounded-2xl bg-linear-to-r from-blue-600 to-violet-600 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30"
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <SendHorizontal className="mr-2 h-5 w-5" />
                    Send Anonymous Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
        {/* AI Suggestion Card */}
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-px shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-xl">
          <div className="rounded-[32px] bg-zinc-900/80 p-8 backdrop-blur-xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-linear-to-br from-violet-500 to-fuchsia-600 p-3 shadow-lg shadow-violet-500/20">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      AI Suggestions
                    </h2>

                    <p className="text-sm text-zinc-400">
                      Need inspiration? Let AI generate anonymous questions.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSuggestion}
                disabled={isLoading}
                className="h-12 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/30"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>

            <div className="mt-8">
              <p className="mb-5 text-sm text-zinc-400">
                Click any suggestion below to automatically fill the message
                box.
              </p>
              {error&&<p>
                {error.message}
                </p>}
              <div className="space-y-4">
                {questions.length > 0 ? (
                  questions.map((question, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        form.setValue("content", question, {
                          shouldValidate: true,
                        })
                      }
                      className="group relative w-full overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800/70 p-5 text-left  transition-all  duration-300  hover:-translate-y-1  hover:border-violet-500  hover:bg-zinc-800  hover:shadow-xl  hover:shadow-violet-500/10  "
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-violet-500/0 via-violet-500/5 to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="relative flex items-start gap-4">
                        <div className="mt-1 rounded-full bg-violet-500/15 p-2">
                          <Sparkles className="h-4 w-4 text-violet-400" />
                        </div>

                        <div className="flex-1">
                          <p className="leading-7 text-zinc-200">{question}</p>

                          <span className="mt-3 inline-block text-xs font-medium text-violet-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Click to use →
                          </span>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="flex h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-800/40">
                    <div className="rounded-full bg-violet-500/10 p-6">
                      <Sparkles className="h-10 w-10 text-violet-400" />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-white">
                      AI is waiting ✨
                    </h3>

                    <p className="mt-2 max-w-sm text-center text-zinc-500">
                      Click the Generate button to receive three thoughtful
                      anonymous questions.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
