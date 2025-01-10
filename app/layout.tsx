export const runtime = "edge";

import { getSledgeSettings } from "@sledge-app/api";
import "@sledge-app/core/style.css";
import { GoogleAnalytics } from "components/global";
import Footer from "components/layout/footer";
import Navbar from "components/layout/navbar";
import TopBar from "components/layout/top-bar";
import SledgeProviderComponent from "components/sledge/sledge-provider-component";
import { getCustomer } from "lib/shopify";
import parseGid from "lib/shopify/parse-gid";
import { ensureStartsWith } from "lib/utils";
import { cookies } from "next/headers";
import { ReactNode, Suspense } from "react";
import "./globals.css";
import "./sledge-dark.css";

declare global {
  interface Window {
    gtag: (
      event_type: string,
      event_name: string,
      {
        event_category,
        event_label,
        value,
      }: {
        event_category: string;
        event_label: string;
        value?: string;
      },
    ) => void;
  }
}

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";
const twitterCreator = TWITTER_CREATOR
  ? ensureStartsWith(TWITTER_CREATOR, "@")
  : undefined;
const twitterSite = TWITTER_SITE
  ? ensureStartsWith(TWITTER_SITE, "https://")
  : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    follow: true,
    index: true,
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: "summary_large_image",
        creator: twitterCreator,
        site: twitterSite,
      },
    }),
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const getSession: any = cookies().get("session")?.value;
  let customer: any = {};
  let shopifyDomain = "";

  if (getSession) {
    customer = await getCustomer(getSession);

    shopifyDomain = customer?.data?.shop?.primaryDomain?.host;

    customer = customer.data.customer;
    customer = {
      userId: parseGid(customer?.id).id,
      fullName: `${customer?.firstName} ${customer?.lastName}`,
      email: customer?.email,
    };
  }

  const sledgeSettings = await getSledgeSettings({
    userId: customer?.userId || "",
    userEmail: customer?.email || "",
    userFullname: customer?.fullName || "",
    locale: "en",
    domain: "sledge-demo-store.myshopify.com",
  });

  return (
    <html lang="en">
      <body className="bg-dark text-white antialiased">
        {process.env.GA_TRACKING_ID ? (
          <GoogleAnalytics ga_id={process.env.GA_TRACKING_ID} />
        ) : null}
        <script src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.12.0/tsparticles.confetti.bundle.min.js" />
        <SledgeProviderComponent
          sledgeSettings={sledgeSettings}
          domain="sledge-demo-store.myshopify.com"
          userId={customer?.userId}
          userEmail={customer?.email}
          userFullname={customer?.fullName}
        >
          <div className="flex flex-col">
            <TopBar />
            <Navbar />
            <Suspense>
              <main role="main" id="mainContent" className="flex-grow">
                {children}
              </main>
            </Suspense>
          </div>
          <Footer />
        </SledgeProviderComponent>
      </body>
    </html>
  );
}
