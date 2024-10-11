"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Menu, X } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";

export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Introduction");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    {
      section: "Getting Started",
      items: ["Introduction", "Installation", "Typography"],
    },
    { section: "Components", items: ["Button", "Input", "Card"] },
  ];

  const handleNavigation = (item: any) => {
    setCurrentPage(item);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "Introduction":
        return (
          <>
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
              Introduction
            </h1>
            <p className="text-lg text-muted-foreground">
              Re-usable components built using Radix UI and Tailwind CSS.
            </p>
            <div className="prose max-w-none">
              <p>
                This is <strong>NOT</strong> a component library. It&apos;s a
                collection of re-usable components that you can copy and paste
                into your apps.
              </p>
              <p>
                What do you mean by not a component library? I mean you do not
                install it as a dependency. It is not available or distributed
                via npm.
              </p>
              <p>
                Use this as a reference to build your own component libraries.
              </p>
            </div>
          </>
        );
      case "Installation":
        return (
          <>
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
              Installation
            </h1>
            <p className="text-lg text-muted-foreground">
              How to install and set up the project.
            </p>
            <div className="prose max-w-none">
              <p>Installation instructions would go here...</p>
            </div>
          </>
        );
        case "Typography":
            return (
                <>
                    <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
                    Typography
                    </h1>
                    <p className="text-lg text-muted-foreground">
                    Typography styles and guidelines.
                    </p>
                    <div className="prose max-w-none">
                    <p>Typography guidelines would go here...</p>
                    </div>
                </>
            )
        case "Button":
            return (
                <>
                    <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
                    Button
                    </h1>
                    <p className="text-lg text-muted-foreground">
                    Button component documentation.
                    </p>
                    <div className="prose max-w-none">
                    <p>Button component documentation would go here...</p>
                    </div>
                </>
            )
      default:
        return (
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            {currentPage}
          </h1>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-center">
          <Button
            variant="outline"
            size="icon"
            className="mr-2 md:hidden"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="#">
              <span className="hidden font-bold sm:inline-block">
               Mailverra
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                className="text-foreground transition-colors hover:text-foreground/80"
                href="#"
              >
                Documentation
              </Link>
              <Link
                className="text-foreground/60 transition-colors hover:text-foreground/80"
                href="#"
              >
                Components
              </Link>
              <Link
                className="text-foreground/60 transition-colors hover:text-foreground/80"
                href="#"
              >
                Themes
              </Link>
              <Link
                className="text-foreground/60 transition-colors hover:text-foreground/80"
                href="#"
              >
                Examples
              </Link>
              <Link
                className="hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
                href="#"
              >
                GitHub
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search documentation..."
                    className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                  />
                </div>
              </form>
            </div>
            <nav className="flex items-center">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </nav>
          </div>
        </div>
        <Separator className="mt-2" orientation="horizontal"/> 
      </header>

      {/* Container for sidebar and main content */}
      <div className="container mx-auto flex-1 gap-6 md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside
          className={`fixed top-14 z-30 -ml-2 w-full shrink-0 md:sticky md:block ${isSidebarOpen ? "block" : "hidden"}`}
        >
          <ScrollArea className="h-[calc(100vh-3.5rem)] py-6 pl-8 pr-6 lg:py-8">
            <div className="flex flex-col gap-4">
              {navItems.map((section, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <h4 className="font-semibold">{section.section}</h4>
                  <nav className="flex flex-col">
                    {section.items.map((item, itemIdx) => (
                      <button
                        key={itemIdx}
                        className={`text-left ${currentPage === item ? "font-semibold text-foreground" : "text-muted-foreground"} hover:text-foreground`}
                        onClick={() => handleNavigation(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </nav>
                  <Separator className="my-4" />{" "}
                  {/* Separator between sidebar sections */}
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>

        <main className="relative mx-auto mt-9 flex w-full max-w-4xl flex-col items-start justify-start">
          <div className="w-full min-w-0">
            <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                Docs
              </div>
              <span>/</span>
              <div className="font-medium text-foreground">{currentPage}</div>
            </div>
            <div className="space-y-2">{renderContent()}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
