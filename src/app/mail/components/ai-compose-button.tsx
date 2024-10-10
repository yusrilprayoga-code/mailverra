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

  const aiGenerate = async () => {
    const { output } = await generateEmail("", prompt);
    for await (const delta of readStreamableValue(output)) {
      if (delta) {
        props.onGenerate(delta);
      }
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
          <Button
            onClick={() => {
              aiGenerate();
              setOpen(false);
              setPrompt("");
            }}
          >
            Generate
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AiComposeButton;
