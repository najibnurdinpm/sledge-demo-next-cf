"use client";

import { Snippet } from "@sledge-app/react-product-review";
import parseGid from "lib/shopify/parse-gid";

type ISnippetComponent = {
  productId?: any;
  fillColor?: any;
  outlineColor?: any;
};
export default function SnippetComponent({
  productId,
  fillColor,
  outlineColor,
}: ISnippetComponent) {
  return (
    <Snippet
      fillColor={fillColor}
      outlineColor={outlineColor}
      productId={parseGid(productId).id}
    />
  );
}
