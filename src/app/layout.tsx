import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Mailverra - Ai Gmail",
  description:
    "Mailverra is a web application that uses AI to help you manage your Gmail inbox.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: ["Ai Gmail", "Gmail", "AI", "Inbox", "Email", 'Mailverra', 'Mailverra AI'],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
