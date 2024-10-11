import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import DashboardPage from "@/components/landing-page";
import LinkAccountButton from "@/components/link-account-button";

const LandingPage = async () => {
  // const { userId } = auth()
  // if (userId) {
  //     return redirect('/mail')
  // }
  const { userId } = auth();

  if (userId) {
    return (
      <>
        <div className="mx-auto mt-4 flex w-full max-w-xl flex-col items-center justify-between space-y-4 rounded-full border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:space-x-4 sm:space-y-0 sm:p-6">
          <div className="flex items-center space-x-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Link
              href="/mail"
              className="text-sm text-black hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              Dashboard
            </Link>
            <Link
              href="/mail"
              className="text-sm text-black hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              Pricing
            </Link>
            <Link
              href="/mail"
              className="text-sm text-black hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              About Us
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <LinkAccountButton />
            <ModeToggle />
          </div>
        </div>
        <DashboardPage />
        <div className="mb-10 flex items-center justify-center space-x-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Link href="/mail" className="text-sm hover:underline">
            Go to Mail
          </Link>
          <ModeToggle />
          <LinkAccountButton />
        </div>
      </>
    );
  }

  if (!userId) {
    return (
      <>
        <div className="mx-auto mt-4 flex w-full max-w-xl flex-col items-center justify-between space-y-4 rounded-full border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:space-x-4 sm:space-y-0 sm:p-6">
          <div className="flex items-center space-x-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Link
              href="/mail"
              className="text-sm text-black hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              Dashboard
            </Link>
            <Link
              href="/mail"
              className="text-sm text-black hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              Pricing
            </Link>
            <Link
              href="/mail"
              className="text-sm text-black hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              About Us
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in" className="text-sm hover:underline">
              Sign In
            </Link>
            <Link href="/sign-up" className="text-sm hover:underline">
              Sign Up
            </Link>
            <ModeToggle />
          </div>
        </div>
        <DashboardPage />
        <div className="mb-10 flex items-center justify-center space-x-4">
          <Link href="/sign-in" className="text-sm hover:underline">
            Sign In
          </Link>
          <Link href="/sign-up" className="text-sm hover:underline">
            Sign Up
          </Link>
          <ModeToggle />
        </div>
      </>
    );
  }
};

export default LandingPage;
