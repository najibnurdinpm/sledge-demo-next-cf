"use client";

import { CustomComponents } from "@sledge-app/core";
import { HappyCustomersPage } from "@sledge-app/react-product-review";
import { Link } from "components/global";
import { trackViewHappyCustomerPageApp } from "lib/google-analytics/events";
import { useEffect, useState } from "react";

export default function HappyCustomersPageWidget() {
  const [isTracked, setTracked] = useState(false);

  useEffect(() => {
    if (!isTracked) {
      setTracked(true);
    } else {
      trackViewHappyCustomerPageApp();
    }
  }, [isTracked]);

  return (
    <div className="max-w-[1170px] mx-auto px-5 lg:px-0 my-8">
      <HappyCustomersPage.Root>
        <CustomComponents
          reviewProductInfo={({ product }: any) => {
            const { name, handle = "#" } = product || {};

            return (
              <div className="sledge-product-review__widget-about-product-text">
                About{" "}
                <Link
                  className="sledge-product-review__widget-about-product-link"
                  href={"/products/" + handle}
                  onClick={(e) => e.stopPropagation()}
                >
                  {name}
                </Link>
              </div>
            );
          }}
        />
        <HappyCustomersPage.Header />
        <HappyCustomersPage.List />
      </HappyCustomersPage.Root>
    </div>
  );
}
