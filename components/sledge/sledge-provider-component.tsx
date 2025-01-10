/* eslint-disable no-unused-vars */
"use client";

import { SledgeProvider } from "@sledge-app/core";
import "@sledge-app/core/style.css";
import { StickySidebarWidget } from "@sledge-app/react-product-review";
import { trackClickStickySidebarWidgetApp } from "lib/google-analytics/events";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

type IProvider = {
  children: ReactNode;
  userId: string;
  userEmail: string;
  userFullname: string;
  domain?: string;
  sledgeSettings?: any;
};

export default function SledgeProviderComponent({
  children,
  userId,
  userEmail,
  userFullname,
  domain,
  sledgeSettings,
}: IProvider) {
  const pathname = usePathname();

  useEffect(() => {
    console.log("domain", domain);
  }, [domain]);

  return (
    <SledgeProvider
      config={{
        domain: domain || "",
        userId: userId || "",
        userEmail: userEmail || "",
        userFullname: userFullname || "",
        locale: "en",
        sledgeSettings: sledgeSettings,
      }}
    >
      <div onClick={() => trackClickStickySidebarWidgetApp(pathname)}>
        <StickySidebarWidget />
      </div>
      {children}
    </SledgeProvider>
  );
}
