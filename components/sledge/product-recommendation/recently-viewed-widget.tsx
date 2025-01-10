"use client";

import { CustomComponents } from "@sledge-app/core";
import {
  RecentlyViewed,
  RecentlyViewedHeaderDescription,
  RecentlyViewedHeaderTitle,
  RecentlyViewedList,
} from "@sledge-app/react-product-recommendation";
import { trackViewRecentlyViewedApp } from "lib/google-analytics/events";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  SledgeProductCard,
  SledgeWishlistWidgetAlert,
} from "../custom-components";

interface ISledgeRecentlyViewedWidget {
  productId?: string;
  productTitle?: any;
  limitToDisplay?: number;
  hiddenProductIds?: string[] | number[];
  useSlider?: boolean;
  sectionTitle?: string;
  sectionDescription?: string;
}

export const SledgeRecentlyViewed = (props: ISledgeRecentlyViewedWidget) => {
  const trackOption = {
    trackVisibility: true,
    triggerOnce: true,
    initialInView: true,
    delay: 100,
  };

  const trackRecentlyViewed: any = useInView(trackOption);
  const [isRecentlyViewedTracked, setIsRecentlyViewedTracked] = useState(false);

  const {
    productId,
    limitToDisplay,
    hiddenProductIds,
    useSlider,
    sectionTitle,
    sectionDescription,
    productTitle,
  } = props;

  useEffect(() => {
    if (trackRecentlyViewed.entry?.isVisible && !isRecentlyViewedTracked) {
      setIsRecentlyViewedTracked(true);
      trackViewRecentlyViewedApp(productTitle);
      console.log("recent");
    }
  }, [trackRecentlyViewed]);

  return (
    <div ref={trackRecentlyViewed.ref}>
      <RecentlyViewed
        params={{
          productId,
        }}
        displayLimit={limitToDisplay}
        hiddenProductIds={hiddenProductIds}
        useSlider={useSlider}
      >
        <CustomComponents
          wishlistWidgetAlert={SledgeWishlistWidgetAlert}
          productCard={SledgeProductCard}
        />
        <RecentlyViewedHeaderTitle text={sectionTitle} />
        <RecentlyViewedHeaderDescription text={sectionDescription} />
        <RecentlyViewedList gridType="large" />
      </RecentlyViewed>
    </div>
  );
};
