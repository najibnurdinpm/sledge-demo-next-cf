import { CollectionList, ProductLists } from "components/global";
import { SledgeRecentlyViewed } from "components/sledge/product-recommendation";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  return (
    <>
      <ProductLists />
      <div className="max-w-[1330px] mx-auto px-5 lg:px-20 xl:px-0 my-[20px]">
        <SledgeRecentlyViewed />
      </div>
      <CollectionList />
    </>
  );
}
