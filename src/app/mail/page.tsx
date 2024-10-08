import React from "react";
// import MailPage from './components/mail'
import dynamic from "next/dynamic";
import { ModeToggle } from "@/components/theme-toggle";

const MailPage = dynamic(
  () => {
    return import("./components/mail");
  },
  {
    ssr: false,
  },
);

const MailDashboard = () => {
  return (
    <>
      <div className="absolute bottom-4 left-4">
        <ModeToggle />
      </div>
      <MailPage
        defaultLayout={[20, 32, 48]}
        defaultCollapsed={false}
        navCollapsedSize={0}
      />
    </>
  );
};

export default MailDashboard;
