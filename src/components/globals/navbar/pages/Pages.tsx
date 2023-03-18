import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import pages from "./pages.json";

export default function Pages() {
  const { pathname } = useRouter();

  return (
    <div className="flex md:flex-row flex-col md:items-center gap-4 md:gap-6">
      {pages.map(({ id, name, url, dropdown }) => {
        const current = url === pathname;
        return (
          <Link
            href={url}
            key={id}
            className={`flex items-center gap-1 text-md tracking-[0.25px] underline-offset-[10px] decoration-2 ${
              current ? "underline" : "hover:no-underline"
            }`}
          >
            <span>{name}</span>
            {dropdown && <img src="/images/icon-container.svg" alt="" />}
          </Link>
        );
      })}
    </div>
  );
}
