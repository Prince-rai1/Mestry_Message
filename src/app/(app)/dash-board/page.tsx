"use client";
import { useCallback, useEffect, useState } from "react";
import { Message } from "@/model/user.model";
import { toast } from "sonner";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptmessagesSchema } from "@/schemas/acceptmessageSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import MessageCard from "@/components/MessageCard";
import {
  Copy,
  Link2,
  Loader2,
  MessageCircle,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "next-auth";
import { Switch } from "@/components/ui/switch";
import handleUnauthorized from "@/helpers/handleUnauthorized";

function DashBoard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = (messageId: string) => {
    try {
      setMessages((prev) =>
        prev.filter((message) => message._id.toString() !== messageId),
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof acceptmessagesSchema>>({
    resolver: zodResolver(acceptmessagesSchema),
    defaultValues: {
      acceptMessages: false,
    },
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);

    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");

      setValue("acceptMessages", response.data.isAcceptingMessages || false);
    } catch (error) {
      const err = error as AxiosError<ApiResponse>;

      if (err.response?.status === 401 || err.response?.status === 404) {
        await handleUnauthorized();

        return;
      }
      console.error("Error checking username:", err.response?.data.message);

      toast.error(err.response?.data.message);
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);

      setIsSwitchLoading(false);

      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");

        setMessages(response.data.messages || []);

        if (refresh) {
          toast.info("Showing latest messages");
        }
      } catch (error) {
        const err = error as AxiosError<ApiResponse>;

        if (err.response?.status === 401 || err.response?.status === 404) {
          await handleUnauthorized();

          return;
        }

        console.error("Error checking username:", err.response?.data.message);

        toast.error(err.response?.data.message);
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setMessages, setIsLoading],
  );

  useEffect(() => {
    if (!session || !session.user) {
      return;
    }

    fetchMessages();
    fetchAcceptMessage();
  }, [session, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        isAcceptingMessages: !acceptMessages,
      });

      setValue("acceptMessages", !acceptMessages);

      toast.success(response.data.message);
    } catch (error) {
      const err = error as AxiosError<ApiResponse>;

      console.error("Error checking username:", err.response?.data.message);

      toast.error(err.response?.data.message);

      if (err.response?.status === 401 || err.response?.status === 404) {
        await handleUnauthorized();

        return;
      }
    }
  };

  if (!session || !session.user) {
    return <>Please login</>;
  }

  const { username } = session.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/U/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.info("Profile URL has been copied to clipboard.");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-gray-800 via-gray-900 to-black">
      {/* Background Glow */}
      <div className="absolute -left-40 -top-40 h-72 w-72 sm:h-128 sm:w-lg rounded-full bg-blue-600/20 blur-[170px]" />
      <div className="absolute right-0 top-1/3 h-64 w-64 sm:h-120 sm:w-120 rounded-full bg-violet-600/20 blur-[170px]" />
      <div className="absolute bottom-0 left-1/3 h-52 w-52 sm:h-100 sm:w-100 rounded-full bg-cyan-500/10 blur-[150px]" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[60px_60px]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10 lg:gap-8 lg:py-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="bg-linear-to-r from-blue-400 via-violet-400 to-cyan-300 bg-clip-text text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent">
            Welcome Back 👋
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-zinc-400">
            Manage your anonymous messages from one place.
          </p>

          <div className="mt-5 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 sm:px-5">
            <span className="font-semibold text-blue-300">@{username}</span>
          </div>
        </div>
        {/* Public Link Card */}
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-px shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-xl">
          <div className="rounded-[32px] bg-zinc-900/80 p-5 sm:p-6 lg:p-8 backdrop-blur-xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 p-3">
                    <Link2 className="h-6 w-6 text-white" />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Public Profile
                    </h2>

                    <p className="text-sm text-zinc-400">
                      Share this link with your friends.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-zinc-700 bg-zinc-800/70 px-4 py-4">
                  <p className="break-all text-sm text-zinc-300 sm:text-base">
                    {profileUrl}
                  </p>
                </div>
              </div>

              <Button
                onClick={copyToClipboard}
                className="h-12 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 px-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
            </div>
          </div>
        </div>
        {/* Settings Card */}
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-px shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-xl">
          <div className="rounded-[32px] bg-zinc-900/80 p-5 sm:p-6 lg:p-8 backdrop-blur-xl">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-linear-to-br from-emerald-500 to-green-600 p-3">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Privacy Settings
                    </h2>

                    <p className="text-sm text-zinc-400">
                      Control whether people can send anonymous messages.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center rounded-2xl border border-zinc-700 bg-zinc-800/70 px-4 py-4 sm:px-6 sm:py-5">
                <div>
                  <p className="font-semibold text-white">Accept Messages</p>

                  <p className="text-sm text-zinc-400">
                    {acceptMessages
                      ? "Anyone can send you messages."
                      : "Nobody can send you messages."}
                  </p>
                </div>

                <Switch
                  {...register("acceptMessages")}
                  checked={acceptMessages}
                  onCheckedChange={handleSwitchChange}
                  disabled={isSwitchLoading}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Messages Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mt-6 sm:mt-9">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-linear-to-br from-violet-500 to-fuchsia-600 p-3">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Recent Messages
                </h2>

                <p className="text-zinc-400">
                  Read, manage and delete anonymous messages.
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              fetchMessages(true);
            }}
            className="h-11 w-full md:w-auto rounded-xl border-zinc-700 bg-zinc-900 text-white transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:bg-zinc-800"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Refresh Messages
              </>
            )}
          </Button>
        </div>
        {/* Divider */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-700 to-transparent" />{" "}
        {/* Messages */}
        {messages.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {messages.map((message) => (
              <div
                key={message._id.toString()}
                className="
              group
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-white/5
              p-px
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-blue-500/30
              hover:shadow-[0_20px_50px_rgba(59,130,246,.15)]
              "
              >
                {/* Glow */}

                <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 via-blue-500/5 to-violet-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative rounded-[28px] bg-zinc-900/80 backdrop-blur-xl">
                  <MessageCard
                    message={message}
                    onMessageDelete={handleDeleteMessage}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] border border-dashed border-zinc-700 bg-white/5 p-6 sm:p-10 lg:p-12 backdrop-blur-xl">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="rounded-full bg-linear-to-br from-violet-500/20 to-blue-500/20 p-5 sm:p-8">
                <MessageCircle className="h-10 w-10 sm:h-14 sm:w-14 text-violet-400" />
              </div>

              <h3 className="mt-8 text-2xl sm:text-3xl font-bold text-white">
                No Messages Yet
              </h3>

              <p className="mt-3 max-w-lg text-zinc-400">
                Your inbox is empty for now. Share your public profile link with
                your friends and start receiving anonymous messages.
              </p>

              <Button
                onClick={copyToClipboard}
                className="
              mt-8
h-11
w-full
sm:w-auto
rounded-xl
              bg-linear-to-r
              from-blue-600
              to-violet-600
              px-8
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-xl
              hover:shadow-blue-500/30
              "
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy My Link
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashBoard;
