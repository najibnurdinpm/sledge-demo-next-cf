"use client";

import { Badge } from "@sledge-app/react-wishlist";
import { Link } from "components/global";
import { trackClickWishlistBadgeApp } from "lib/google-analytics/events";
import { usePathname } from "next/navigation";

export default function WishlistHeaderMenu() {
  const pathname = usePathname();
  return (
    <Link
      className="mt-[-1px]"
      href="/wishlist"
      onClick={() => trackClickWishlistBadgeApp(pathname)}
    >
      <Badge />
    </Link>
  );
}
