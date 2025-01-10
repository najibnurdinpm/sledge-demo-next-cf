"use client";

import { CustomComponents } from "@sledge-app/core";
import { SearchResultWidget } from "@sledge-app/react-instant-search";
import { trackViewSearchResultApp } from "lib/google-analytics/events";
import { useEffect, useState } from "react";
import {
  SledgeArticleCard,
  SledgeBlogCard,
  SledgeCollectionCard,
  SledgeProductCard,
} from "../custom-components";

export default function SearchResultPage({ data }: { data?: any }) {
  const [isTracked, setTracked] = useState(false);

  useEffect(() => {
    if (!isTracked) {
      setTracked(true);
    } else {
      trackViewSearchResultApp();
    }
  }, [isTracked]);

  return (
    <SearchResultWidget
      query={{
        keyword: "q",
      }}
    >
      <CustomComponents
        productCard={SledgeProductCard}
        blogCard={SledgeBlogCard}
        articleCard={SledgeArticleCard}
        collectionCard={SledgeCollectionCard}
      />
    </SearchResultWidget>
  );
}
