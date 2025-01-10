"use client";

import { Widget, WidgetHeader } from "@sledge-app/react-product-review";
import { trackViewProductReviewApp } from "lib/google-analytics/events";
import parseGid from "lib/shopify/parse-gid";
import { Product } from "lib/shopify/types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type IReviewList = {
  product: Product;
  selectedVariantId?: string;
};
export default function ReviewWidget({
  product,
  selectedVariantId,
}: IReviewList) {
  const trackOption = {
    trackVisibility: true,
    triggerOnce: true,
    initialInView: true,
    delay: 100,
  };

  const trackReview: any = useInView(trackOption);
  const [isReviewTracked, setIsReviewTracked] = useState(false);

  useEffect(() => {
    if (trackReview.entry?.isVisible && !isReviewTracked) {
      setIsReviewTracked(true);
      trackViewProductReviewApp(product.title);
      console.log("review");
    }
  }, [trackReview]);

  return (
    <div ref={trackReview.ref}>
      <Widget.Root
        params={{
          productId: parseGid(product.id).id,
          productVariantId: selectedVariantId
            ? parseGid(selectedVariantId)?.id
            : "",
        }}
      >
        <Widget.Header>
          <WidgetHeader.Summary />
          <WidgetHeader.AddTrigger />
          <WidgetHeader.Sort />
        </Widget.Header>
        <Widget.List />
      </Widget.Root>
    </div>
  );
}
