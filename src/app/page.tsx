import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";

const LandingPage = async () => {
  // const { userId } = auth()
  // if (userId) {
  //     return redirect('/mail')
  // }
  return (
    <>
      {/* <div className="h-screen w-full bg-white absolute inset-0">
            </div> */}
      <div className="absolute bottom-0 left-0 right-0 top-0 z-[-1] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_80%)]"></div>
      <div className="relative z-[10] flex min-h-screen flex-col items-center pt-56">
        <h1 className="inline-block bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-center text-6xl font-bold text-transparent dark:bg-gradient-to-r dark:from-gray-200 dark:to-gray-800 dark:bg-clip-text dark:text-gray-900 dark:text-transparent">
          The minimalistic, <br />
          AI-powered email client.
        </h1>
        <div className="h-4"></div>
        <p className="mb-8 max-w-xl text-center text-xl text-gray-600 dark:text-gray-200">
          Normal Human is a minimalistic, AI-powered email client that empowers
          you to manage your email with ease.
        </p>
        <div className="space-x-4">
          <Button>
            <Link href="/mail">Get Started</Link>
          </Button>
          <Link href="https://start-saas.com?utm=normalhuman">
            <Button variant="outline">Learn More</Button>
          </Link>
        </div>
        <div className="mx-auto mt-12 max-w-5xl">
          <h2 className="mb-4 text-center text-2xl font-semibold">
            Experience the power of:
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-semibold">
                AI-driven email RAG
              </h3>
              <p className="text-gray-600">
                Automatically prioritize your emails with our advanced AI
                system.
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-semibold">Full-text search</h3>
              <p className="text-gray-600">
                Quickly find any email with our powerful search functionality.
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-semibold">
                Shortcut-focused interface
              </h3>
              <p className="text-gray-600">
                Navigate your inbox efficiently with our intuitive keyboard
                shortcuts.
              </p>
            </div>
          </div>
        </div>
        <Image
          src="/demo.png"
          alt="demo"
          width={1000}
          height={1000}
          className="my-12 h-auto w-[70vw] rounded-md border shadow-xl transition-all hover:scale-[102%] hover:shadow-2xl"
        />
        <div className="mb-10 flex items-center space-x-4">
          <Link href="/sign-in" className="text-sm hover:underline">
            Sign In
          </Link>
          <Link href="/sign-up" className="text-sm hover:underline">
            Sign Up
          </Link>
          <ModeToggle />
          <SignOutButton />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
