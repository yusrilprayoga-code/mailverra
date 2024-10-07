import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { 
  SignedIn,
  UserButton,
 } from "@clerk/nextjs";
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
        <DashboardPage />
        <div className="mb-10 flex justify-center items-center space-x-4">
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
        <DashboardPage />
          <div className="mb-10 flex justify-center items-center space-x-4">
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
