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
import { BotIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { generateEmail } from "./action";
import { readStreamableValue } from "ai/rsc";

type Props = {
  isComposing: boolean;
  onGenerate: (token: string) => void;
};

const AiComposeButton = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");

  const aiGenerate = async () => {
    const { output } = await generateEmail("", prompt);
    for await (const token of readStreamableValue(output)) {
      if (token) {
        console.log(token);
        props.onGenerate(token);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="icon" variant={"outline"} onClick={() => setOpen(true)}>
          <BotIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AI Smart Compose</DialogTitle>
          <DialogDescription>Generate a smart reply with AI</DialogDescription>
          <div className="h2"></div>
          <Textarea
            placeholder="What would you like to compose?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="h-2"></div>
          <Button
            onClick={() => {
                setOpen(false);
                setPrompt("");
                aiGenerate();
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
