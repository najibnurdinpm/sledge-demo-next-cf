"use client";

import { CustomComponents } from "@sledge-app/core";
import { SearchIconWidget } from "@sledge-app/react-instant-search";
import { SledgeSearchViewMoreResult } from "components/global";
import { trackClickSearchIconPopupApp } from "lib/google-analytics/events";
import { usePathname } from "next/navigation";
import {
  SledgeOtherIndexList,
  SledgeProductCard,
  SledgeSuggestionKeywordList,
} from "../custom-components";

export default function SearchHeaderMenu() {
  const pathname = usePathname();
  return (
    <div onClick={() => trackClickSearchIconPopupApp(pathname)}>
      <SearchIconWidget size="sm">
        <CustomComponents
          productCard={SledgeProductCard}
          searchViewMoreResult={SledgeSearchViewMoreResult}
          otherIndexList={SledgeOtherIndexList}
          suggestionKeywordList={SledgeSuggestionKeywordList}
        />
      </SearchIconWidget>
    </div>
  );
}
