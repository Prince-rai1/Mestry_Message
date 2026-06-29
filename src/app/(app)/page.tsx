"use client";
import React, { use } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();

  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  return (
    <>
      <main
        className=" relative min-h-screen w-full overflow-hidden bg-linear-to-br from-gray-800 via-gray-900 to-black "
      >
        <div className="mx-auto w-full max-w-7xl px-6 mt-10">
          {/* Background Glow */}

          <div className="absolute -left-40 -top-40 h-128 w-lg rounded-full bg-blue-600/20 blur-[170px]" />

          <div className="absolute right-0 top-1/3 h-120 w-120 rounded-full bg-violet-600/20 blur-[170px]" />

          <div className="absolute bottom-0 left-1/3 h-100 w-100 rounded-full bg-cyan-500/10 blur-[150px]" />

          {/* Grid */}

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[60px_60px]" />

          <section className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center text-center">
            <span className=" mb-6 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-300 ">
              ✨ AI Powered Anonymous Messaging
            </span>

            <h1
              className=" max-w-5xl bg-linear-to-r from-white via-blue-300 to-violet-400 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-7xl "
            >
              Honest Conversations.
              <br />
              Zero Identity.
              <br />
              Infinite Possibilities.
            </h1>

            <p
              className=" mt-8 max-w-2xl text-lg leading-8 text-zinc-400 "
            >
              Mystery Message lets anyone send completely anonymous messages
              while keeping every conversation secure, private and engaging.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-5">
              <Button
                size="lg"
                className=" h-14 rounded-2xl bg-linear-to-r from-blue-600 via-violet-600 to-cyan-600 px-8 text-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 "
              >
                🚀 Get Started
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="
        h-14
        rounded-2xl
        border-zinc-700
        bg-zinc-900/50
        px-8
        text-white
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-violet-500
        hover:bg-zinc-800
        "
                onClick={() => router.push("/dash-board")}
              >
                📊 Dashboard
              </Button>
            </div>

            {/* Stats */}

            <div className="mt-20 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-xl">
                <h2 className="text-4xl font-bold text-white">100%</h2>

                <p className="mt-2 text-zinc-400">Anonymous</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-xl">
                <h2 className="text-4xl font-bold text-white">AI</h2>

                <p className="mt-2 text-zinc-400">Smart Suggestions</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-xl">
                <h2 className="text-4xl font-bold text-white">24/7</h2>

                <p className="mt-2 text-zinc-400">Available</p>
              </div>
            </div>

            {/* Scroll */}

            <div className="mt-20 animate-bounce text-zinc-500">
              ↓ Scroll to Explore
            </div>
          </section>
        </div>
        {/* ================= Bento Grid ================= */}

        <section className="relative z-10 mt-32">
          <div className="text-center">
            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300">
              Why Mystery Message?
            </span>

            <h2 className="mt-6 text-5xl font-bold text-white">
              Built for Honest Conversations
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
              Share your unique profile, receive anonymous feedback, generate AI
              powered conversation starters and enjoy a clean, modern
              experience.
            </p>
          </div>

          <div className="mx-auto mt-20 grid max-w-7xl gap-6 lg:grid-cols-4">
            {/* BIG CARD */}

            <div
              className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-8
      backdrop-blur-xl
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-blue-500/30
      hover:shadow-[0_20px_60px_rgba(59,130,246,.15)]
      lg:col-span-2
      lg:row-span-2
      "
            >
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 text-3xl">
                  🔒
                </div>

                <h3 className="text-3xl font-bold text-white">
                  Complete Privacy
                </h3>

                <p className="mt-5 leading-8 text-zinc-400">
                  Every message stays anonymous. Nobody knows who sent it.
                  Express yourself freely without revealing your identity.
                </p>
              </div>
            </div>

            {/* CARD */}

            <div
              className="
      group
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-8
      backdrop-blur-xl
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-violet-500/30
      hover:shadow-[0_20px_60px_rgba(168,85,247,.15)]
      "
            >
              <div className="text-4xl">🤖</div>

              <h3 className="mt-5 text-2xl font-bold text-white">
                AI Suggestions
              </h3>

              <p className="mt-3 text-zinc-400">
                Generate thoughtful anonymous questions instantly.
              </p>
            </div>

            {/* CARD */}

            <div
              className="
      group
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-8
      backdrop-blur-xl
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-cyan-500/30
      hover:shadow-[0_20px_60px_rgba(34,211,238,.15)]
      "
            >
              <div className="text-4xl">⚡</div>

              <h3 className="mt-5 text-2xl font-bold text-white">
                Lightning Fast
              </h3>

              <p className="mt-3 text-zinc-400">
                Built with Next.js and optimized for speed.
              </p>
            </div>

            {/* WIDE CARD */}

            <div
              className="
      group
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-8
      backdrop-blur-xl
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-emerald-500/30
      hover:shadow-[0_20px_60px_rgba(16,185,129,.15)]
      lg:col-span-2
      "
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl">💬</div>

                  <h3 className="mt-4 text-3xl font-bold text-white">
                    Unlimited Anonymous Messages
                  </h3>

                  <p className="mt-4 max-w-xl leading-8 text-zinc-400">
                    Receive honest opinions from friends, teammates and your
                    audience without compromising privacy.
                  </p>
                </div>

                <div className="hidden text-8xl lg:block">💜</div>
              </div>
            </div>
          </div>
        </section>
        <div className="flex justify-center items-center mt-32">
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-md"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index}>
                  <div className="p-3">
                    <Card
                      className="
          group
          relative
          h-107.5
          overflow-hidden
          rounded-[30px]
          border
          border-white/10
          bg-zinc-900/80
          backdrop-blur-xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-violet-500/30
          hover:shadow-[0_20px_60px_rgba(168,85,247,.15)]
          "
                    >
                      {/* Glow */}

                      <div className="absolute inset-0 bg-linear-to-br from-violet-500/0 via-violet-500/5 to-cyan-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Floating Blur */}

                      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

                      {/* Header */}

                      <CardHeader className="relative">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-linear-to-br
                  from-blue-500
                  via-violet-500
                  to-cyan-500
                  "
                            >
                              💬
                            </div>

                            <div>
                              <p className="text-xs uppercase tracking-[4px] text-zinc-500">
                                Anonymous
                              </p>

                              <h2 className="text-xl font-bold text-white">
                                {message.title}
                              </h2>
                            </div>
                          </div>

                          <span
                            className="
                rounded-full
                border
                border-violet-500/20
                bg-violet-500/10
                px-3
                py-1
                text-xs
                font-medium
                text-violet-300
                "
                          >
                            Secure
                          </span>
                        </div>
                      </CardHeader>

                      {/* Message */}

                      <CardContent className="relative flex h-55 items-center">
                        <blockquote
                          className="
              text-center
              text-xl
              italic
              leading-9
              text-zinc-300
              "
                        >
                          "{message.content}"
                        </blockquote>
                      </CardContent>

                      {/* Footer */}

                      <CardFooter className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-zinc-800 bg-linear-to-br from-gray-800 via-gray-900 to-black">
                        <div>
                          <p className="font-semibold text-white">
                            Mystery Message
                          </p>

                          <p className="text-sm text-zinc-100">
                            Honest conversations.
                          </p>
                        </div>

                        <span
                          className="
              rounded-full
              bg-blue-500/10
              px-3
              py-1
              text-xs
              text-blue-300
              "
                        >
                          AI Friendly
                        </span>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              className="
  -left-20
  h-14
  w-14
  border
  border-white/10
  bg-zinc-900/80
  text-white
  backdrop-blur-xl
  transition-all
  duration-300
  hover:scale-110
  hover:border-violet-500
  hover:bg-zinc-800
  "
            />

            <CarouselNext
              className="
  -right-20
  h-14
  w-14
  border
  border-white/10
  bg-zinc-900/80
  text-white
  backdrop-blur-xl
  transition-all
  duration-300
  hover:scale-110
  hover:border-violet-500
  hover:bg-zinc-800
  "
            />
          </Carousel>
        </div>
        {/* ================= CTA SECTION ================= */}

        <section className="relative z-10 mt-36">
          <div
            className="
    relative
    overflow-hidden
    rounded-[40px]
    border
    border-white/10
    bg-white/5
    px-8
    py-20
    text-center
    backdrop-blur-xl
    "
          >
            {/* Glow */}

            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[140px]" />

            <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-violet-500/10 blur-[140px]" />

            <div className="relative">
              <span
                className="
        rounded-full
        border
        border-blue-500/20
        bg-blue-500/10
        px-5
        py-2
        text-sm
        font-medium
        text-blue-300
        "
              >
                🚀 Get Started Today
              </span>

              <h2
                className="
        mx-auto
        mt-8
        max-w-4xl
        bg-linear-to-r
        from-white
        via-blue-300
        to-violet-400
        bg-clip-text
        text-5xl
        font-extrabold
        leading-tight
        text-transparent
        md:text-6xl
        "
              >
                Start Receiving Honest Anonymous Feedback
              </h2>

              <p
                className="
        mx-auto
        mt-8
        max-w-2xl
        text-lg
        leading-8
        text-zinc-400
        "
              >
                Create your profile in less than a minute, share your personal
                link and let people tell you what they really think.
              </p>

              <div className="mt-12 flex flex-wrap justify-center gap-5">
                <Button
                  size="lg"
                  className="
          h-14
          rounded-2xl
          bg-linear-to-r
          from-blue-600
          via-violet-600
          to-cyan-600
          px-10
          text-base
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-2xl
          hover:shadow-blue-500/30
          "
                  onClick={() => router.push("/sign-up")}
                >
                  ✨ Create Free Account
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="
          h-14
          rounded-2xl
          border-zinc-700
          bg-zinc-900/50
          px-10
          text-white
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-violet-500
          hover:bg-zinc-800
          "
                >
                  📖 Learn More
                </Button>
              </div>

              {/* Stats */}

              <div className="mt-16 grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="text-4xl font-bold text-white">100%</h3>

                  <p className="mt-2 text-zinc-500">Anonymous</p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-white">AI</h3>

                  <p className="mt-2 text-zinc-500">Smart Suggestions</p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-white">Secure</h3>

                  <p className="mt-2 text-zinc-500">Protected Messages</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="relative z-10 mt-32 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-4">
            {/* Logo */}

            <div className="md:col-span-2">
              <div className="flex items-center gap-4">
                <div
                  className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-linear-to-br
            from-blue-500
            via-violet-500
            to-cyan-500
            shadow-xl
            "
                >
                  💬
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Mystery Message
                  </h2>

                  <p className="text-zinc-400">
                    Honest conversations. Zero identity.
                  </p>
                </div>
              </div>

              <p className="mt-8 max-w-md leading-8 text-zinc-500">
                A modern anonymous messaging platform powered by AI. Receive
                honest feedback, meaningful conversations and connect without
                revealing your identity.
              </p>
            </div>

            {/* Product */}

            <div>
              <h3 className="mb-5 text-lg font-semibold text-white">Product</h3>

              <div className="space-y-4">
                <a className="block text-zinc-400 transition hover:text-white">
                  Home
                </a>

                <a className="block text-zinc-400 transition hover:text-white">
                  Dashboard
                </a>

                <a className="block text-zinc-400 transition hover:text-white">
                  Features
                </a>

                <a className="block text-zinc-400 transition hover:text-white">
                  FAQ
                </a>
              </div>
            </div>

            {/* Resources */}

            <div>
              <h3 className="mb-5 text-lg font-semibold text-white">
                Resources
              </h3>

              <div className="space-y-4">
                <a className="block text-zinc-400 transition hover:text-white">
                  Privacy
                </a>

                <a className="block text-zinc-400 transition hover:text-white">
                  Terms
                </a>

                <a className="block text-zinc-400 transition hover:text-white">
                  Contact
                </a>

                <a className="block text-zinc-400 transition hover:text-white">
                  Support
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}

          <div className="my-10 h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent" />

          {/* Bottom */}

          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <p className="text-zinc-500">
              © 2026 Mystery Message. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                Next.js
              </span>

              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                MongoDB
              </span>

              <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                Google AI
              </span>

              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                Shadcn UI
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default page;
