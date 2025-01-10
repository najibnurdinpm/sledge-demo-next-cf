export const trackAnnouncementBar = (pathname: string) => {
  if (window?.gtag) window.gtag("event", "announcement_bar", {
    event_category: "promotion",
    event_label: "announcement_bar_link",
    value: pathname,
  });
};
export const trackClickWishlistTriggerApp = (value: "add" | "remove") => {
  if (window?.gtag) window.gtag("event", "click_wishlist_trigger_app", {
    event_category: "apps",
    event_label: "click_wishlist_trigger_app",
    value: value,
  });
};
export const trackClickWishlistButtonDetailApp = (value: "add" | "remove") => {
  if (window?.gtag) window.gtag("event", "click_wishlist_button_detail_app", {
    event_category: "apps",
    event_label: "click_wishlist_button_detail_app",
    value: value,
  });
};
export const trackClickSearchIconPopupApp = (pathname: string) => {
  if (window?.gtag) window.gtag("event", "click_search_icon_popup_app", {
    event_category: "apps",
    event_label: "click_search_icon_popup_app",
    value: pathname,
  });
};
export const trackClickStickySidebarWidgetApp = (pathname: string) => {
  if (window?.gtag) window.gtag("event", "click_sticky_sidebar_widget_app", {
    event_category: "apps",
    event_label: "click_sticky_sidebar_widget_app",
    value: pathname,
  });
};
export const trackClickWishlistBadgeApp = (pathname: string) => {
  if (window?.gtag) window.gtag("event", "click_wishlist_badge_app", {
    event_category: "apps",
    event_label: "click_wishlist_badge_app",
    value: pathname,
  });
};
export const trackViewHappyCustomerPageApp = () => {
  if (window?.gtag) window.gtag("event", "view_happy_customer_page_app", {
    event_category: "apps",
    event_label: "view_happy_customer_page_app",
  });
};
export const trackViewProductFilterApp = (pathname: string) => {
  if (window?.gtag) window.gtag("event", "view_product_filter_app", {
    event_category: "apps",
    event_label: "view_product_filter_app",
    value: pathname,
  });
};
export const trackViewWishlistBadgeApp = () => {
  if (window?.gtag) window.gtag("event", "view_wishlist_badge_app", {
    event_category: "apps",
    event_label: "view_wishlist_badge_app",
  });
};
export const trackViewProductReviewApp = (productTitle: string) => {
  if (window?.gtag) window.gtag("event", "view_product_review_app", {
    event_category: "apps",
    event_label: "view_product_review_app",
    value: productTitle,
  });
};
export const trackViewRecentlyViewedApp = (productTitle: string) => {
  if (window?.gtag) window.gtag("event", "view_recently_viewed_app", {
    event_category: "apps",
    event_label: "view_recently_viewed_app",
    value: productTitle,
  });
};
export const trackViewSearchResultApp = () => {
  if (window?.gtag) window.gtag("event", "view_search_result_app", {
    event_category: "apps",
    event_label: "view_search_result_app",
  });
};
