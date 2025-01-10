"use client";

import Link from "next/link";

export default function SledgeSearchViewMoreResult({
  keyword,
  setShowPopupComponent,
  setRenderSearchResult,
  redirectObjectDirection,
}: any) {
  return (
    <Link
      href={redirectObjectDirection || `/page/search-result?q=${keyword}`}
      className="sledge-instant-search__icon-widget-button-more"
      onClick={() => {
        setShowPopupComponent && setShowPopupComponent(false);
        setRenderSearchResult && setRenderSearchResult(keyword);
      }}
    >
      View More Result
    </Link>
  );
}
