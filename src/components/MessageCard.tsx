"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Message } from "@/model/user.model";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Clock3 } from "lucide-react";

type MessageCardProp = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

function MessageCard({ message, onMessageDelete }: MessageCardProp) {
  const handleDelete = async () => {
    try {
      const res = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`,
      );

      onMessageDelete(message._id.toString());
      console.log(res.data.data);
      toast.success(res.data?.message);
    } catch (error) {
      const err = error as AxiosError<ApiResponse>;

      console.log("error while checking username:", err.response?.data.message);
    }
  };

  return (
    <Card
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-[0_20px_50px_rgba(59,130,246,.15) "
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 via-blue-500/5 to-violet-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardHeader className="relative pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className="
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-2xl
      bg-linear-to-br
      from-blue-500
      via-violet-500
      to-cyan-500
      shadow-lg
      shadow-blue-500/20
    "
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </div>

            <div>
              <CardTitle className="text-xl text-white">
                Anonymous Message
              </CardTitle>

              <CardDescription className="mt-1 text-zinc-400">
                Received anonymously
              </CardDescription>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="
                rounded-xl
                text-zinc-400
                transition-all
                hover:bg-red-500/10
                hover:text-red-500
              "
              >
                <X className="h-5 w-5" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="border-zinc-700 bg-zinc-900 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Message?</AlertDialogTitle>

                <AlertDialogDescription className="text-zinc-400">
                  This action cannot be undone. This message will be permanently
                  deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel
                  className="
                  border-zinc-700
                  bg-zinc-800
                  text-white
                  hover:bg-zinc-700
                "
                >
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      <CardContent className="relative min-h-32">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-800/60 p-5">
          <p className="leading-8 text-zinc-200">{message.content}</p>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between bg-linear-to-br from-gray-800 via-gray-900 to-black">
        <span
          className="
      rounded-full
      border
      border-blue-500/20
      bg-blue-500/10
      px-3
      py-1
      text-xs
      font-medium
      text-blue-300
    "
        >
          Anonymous
        </span>

        <div className="flex items-center gap-2 text-xs text-white">
          <Clock3 className="h-4 w-4" />

          {formatDistanceToNow(new Date(message.createdAt), {
            addSuffix: true,
          })}
        </div>
      </CardFooter>
    </Card>
  );
}

export default MessageCard;
