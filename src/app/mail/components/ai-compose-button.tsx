"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { generateEmail } from "./action";
import { readStreamableValue } from "ai/rsc";

type Props = {
  onGenerate: (value: string) => void;
  isComposing?: boolean;
};

const AiComposeButton = (props: Props) => {
  const [prompt, setPrompt] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const aiGenerate = async (prompt: string) => {
    // console.log("Starting aiGenerate with prompt:", prompt);
    setIsGenerating(true);
    setError(null);
    try {
      // console.log("Calling generateEmail");
      const { output } = await generateEmail("", prompt);
      // console.log("generateEmail returned output:", output);

      let fullContent = "";
      // console.log("Starting to read streamable value");
      for await (const delta of readStreamableValue(output)) {
        if (delta) {
          // console.log("Received delta:", delta);
          fullContent += delta;
          props.onGenerate(delta);
        }
      }
      // console.log("Finished reading streamable value");
      // console.log("Full generated content:", fullContent);

      if (fullContent.trim() === "") {
        // console.warn("Generated content is empty");
        throw new Error("No content generated");
      }

      props.onGenerate("\n");
      // console.log("aiGenerate completed successfully");
    } catch (error) {
      console.error("Error in aiGenerate:", error);
      // setError("An error occurred while generating the email. Please try again.");
    } finally {
      setIsGenerating(false);
      // console.log("aiGenerate finished, isGenerating set to false");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button onClick={() => setOpen(true)} size="icon" variant={"outline"}>
          <Bot className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AI Compose</DialogTitle>
          <DialogDescription>
            AI will compose an email based on the context of your previous
            emails.
          </DialogDescription>
          <div className="h-2"></div>
          <Textarea
            placeholder="What would you like to compose?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="h-2"></div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            onClick={() => {
              aiGenerate(prompt);
              if (!error) {
                setOpen(false);
                setPrompt("");
              }
            }}
            disabled={isGenerating || prompt.trim() === ""}
          >
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AiComposeButton;