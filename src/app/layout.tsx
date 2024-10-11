import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
} from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";

import { TRPCReactProvider } from "@/trpc/react";
import KBar from "@/components/kbar";
import { LoaderIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Mailverra - Ai Gmail",
  description:
    "Mailverra is a web application that uses AI to help you manage your Gmail inbox.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: [
    "Ai Gmail",
    "Gmail",
    "AI",
    "Inbox",
    "Email",
    "Mailverra",
    "Mailverra AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <KBar>
                <ClerkLoading>
                  <div
                    className="flex justify-center items-center h-screen"
                  > 
                    <LoaderIcon className="w-10 h-10 animate-spin" />
                  </div>
                </ClerkLoading>
                <ClerkLoaded>{children}</ClerkLoaded>
              </KBar>
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
