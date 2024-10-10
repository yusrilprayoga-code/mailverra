"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import EmailEditor from "./email-editor";

type Props = {};

const ComposeButton = (props: Props) => {
    const [toValues, setToValues] = React.useState<{ label: string, value: string }[]>([])
    const [ccValues, setCcValues] = React.useState<{ label: string, value: string }[]>([])
    const [subject, setSubject] = React.useState('')

    const handleSend = async (value:string) => {
        console.log('send')
    }

  return (
    <Drawer>
      <DrawerTrigger>
        <Button>
          <Pencil className="mr-1 size-4" />
          Compose
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Compose Email
          </DrawerTitle>
          <DrawerDescription>
            Write a new email to send to someone.
          </DrawerDescription>
        </DrawerHeader>
        <EmailEditor 
            toValues={toValues}
            ccValues={ccValues}
            setCcValues={setCcValues}
            setToValues={setToValues}
            subject={subject}
            setSubject={setSubject}

            to={toValues.map(to => to.value)}
            defaultToolbarExpanded={true}

            handleSend={handleSend}
            isSending={false}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default ComposeButton;
