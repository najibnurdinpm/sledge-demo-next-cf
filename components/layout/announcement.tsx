"use client";
import { Link } from "components/global";
import { trackAnnouncementBar } from "lib/google-analytics/events";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare var confetti: any;

export function Announcement() {
  const pathname = usePathname();

  useEffect(() => {
    let intervalAnnouncementBarConfetti: any = 0;
    const content = document.querySelector(
      ".sledge-demo__announcement-bar-wrapper",
    ) as any;

    const onMouseEnter = async () => {
      const canvasAnnouncementBar = document.querySelector(
        "#sledge-demo__announcement-bar",
      ) as any;
      canvasAnnouncementBar.confetti =
        canvasAnnouncementBar.confetti ||
        (await confetti.create(canvasAnnouncementBar, {
          resize: true,
          position: "absolute",
          inset: 0,
        }));
      const duration = 60 * 60 * 1000;
      const animationEnd = Date.now() + duration;
      intervalAnnouncementBarConfetti = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(intervalAnnouncementBarConfetti);
        }
        canvasAnnouncementBar.confetti({
          count: 10,
          spread: 1000,
          origin: { y: -10.5 },
          startVelocity: 90,
          scalar: 1.8,
          gravity: 0.1,
          decay: 0.9,
        });
      }, 1000 / 60);
    };

    const onMouseLeave = () => {
      clearInterval(intervalAnnouncementBarConfetti);
    };

    content.addEventListener("mouseenter", onMouseEnter);
    content.addEventListener("mouseleave", onMouseLeave);

    return () => {
      content.removeEventListener("mouseenter", onMouseEnter);
      content.removeEventListener("mouseleave", onMouseLeave);
    };
  });

  return (
    <div
      id="sledge-demo__announcement-bar"
      className="bg-green sledge-demo__announcement-bar-wrapper relative text-black"
    >
      <Link
        href="https://sledge-app.com/"
        target={"_blank"}
        rel="noopener noreferrer"
        className="flex w-full justify-center gap-[5px] items-center py-[13px] px-5 md:px-0 text-black font-inter font-medium text-[14px] sm:text-[16px] text-center leading-[18px] tracking-[-0.32px] group/announcement-bar"
        onClick={() => {
          trackAnnouncementBar(pathname);
        }}
      >
        <div className="sm:flex items-center sm:gap-x-[5px]">
          <span>Discover more about</span>
          <img
            src="https://cdn.shopify.com/s/files/1/0819/5761/7942/files/sledge-logo-announcement-bar.png?v=1697106995"
            alt="sledgo logo"
            className="max-w-5 max-h-5 inline-flex mx-[5px] sm:mx-0"
            width={20}
            height={20}
          />
          <strong>Sledge</strong> <br className="sm:hidden" />{" "}
          <span className="hidden sm:block">and</span>{" "}
          <span className="sm:hidden">And</span> get your 14 days free trial!
          <div className="inline-flex items-center">
            <span
              className="ml-0 font-bold opacity-0 whitespace-nowrap inline-block max-w-[0px] overflow-hidden 
                             group-hover/announcement-bar:max-w-[100px] group-hover/announcement-bar:opacity-100
                             group-hover/announcement-bar:ml-[5px] sm:group-hover/announcement-bar:ml-[0px]
                             [transition:margin_.75s,max-width_1s,opacity_1s,transform_.75s,transform_.75s]"
            >
              Check it out
            </span>
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <path
                d="M9.99935 1.6665C5.40768 1.6665 1.66602 5.40817 1.66602 9.99984C1.66602 14.5915 5.40768 18.3332 9.99935 18.3332C14.591 18.3332 18.3327 14.5915 18.3327 9.99984C18.3327 5.40817 14.591 1.6665 9.99935 1.6665ZM12.3243 10.4415L9.38268 13.3832C9.25768 13.5082 9.09935 13.5665 8.94102 13.5665C8.78268 13.5665 8.62435 13.5082 8.49935 13.3832C8.25768 13.1415 8.25768 12.7415 8.49935 12.4998L10.9993 9.99984L8.49935 7.49984C8.25768 7.25817 8.25768 6.85817 8.49935 6.6165C8.74102 6.37484 9.14102 6.37484 9.38268 6.6165L12.3243 9.55817C12.5743 9.79984 12.5743 10.1998 12.3243 10.4415Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}
