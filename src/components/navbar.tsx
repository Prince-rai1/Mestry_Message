"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { CircleUserRound } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { LogOut } from "lucide-react";
import { MessageCircleMore } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // console.log(session)
  // console.log("\n",session?.user)

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/5 bg-black/30 backdrop-blur-2xl shadow-lg"
          : "bg-transparent backdrop-blur-sm "
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <Link href="/" className="group flex items-center gap-4">
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
        transition-transform
        duration-300
        group-hover:scale-110
        "
          >
            <MessageCircleMore className="h-6 w-6 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Mystery Message</h2>

            <p className="text-xs text-zinc-400">Anonymous Conversations</p>
          </div>
        </Link>

        {session ? (
          <div className="flex items-center gap-5">
            <div
              className=" flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl "
            >
              <CircleUserRound className="h-10 w-10 text-cyan-400" />

              <div>
                {/* <p className="text-sm text-zinc-400">Welcome back</p> */}

                <p className="font-semibold text-white">
                  {session.user?.username || session.user?.email}
                </p>
              </div>
            </div>

            <Button
              onClick={() => signOut()}
              className="
    rounded-xl
    bg-red-600
    hover:bg-red-700
    "
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button
              className="
    rounded-xl
    bg-linear-to-r
    from-blue-600
    via-violet-600
    to-cyan-600
    px-6
    transition-all
    duration-300
    hover:scale-105
    hover:shadow-xl
    hover:shadow-blue-500/30
    "
            >
              <LogOut className="mr-2 h-4 w-4" />
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
