"use client";

import { CustomComponents } from "@sledge-app/core";
import { ProductFilterWidget } from "@sledge-app/react-instant-search";
import { trackViewProductFilterApp } from "lib/google-analytics/events";
import parseGid from "lib/shopify/parse-gid";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SledgeProductCard } from "../custom-components";

type IPLP = {
  collection: any;
};
export default function ProductFilter({ collection }: IPLP) {
  const [isTracked, setTracked] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isTracked) {
      setTracked(true);
    } else {
      trackViewProductFilterApp(pathname);
    }
  }, [isTracked]);

  return (
    <ProductFilterWidget
      query={{
        keyword: "q",
      }}
      params={{
        collectionId: Number(parseGid(collection?.id).id),
      }}
    >
      <CustomComponents productCard={SledgeProductCard} />
    </ProductFilterWidget>
  );
}
