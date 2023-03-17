import IconButton from "@/components/common/icon_button/IconButton";
import Link from "next/link";
import React from "react";

const socials = [
  {
    id: 43895,
    icon: "/images/twitter.svg",
    url: "/",
  },
  {
    id: 56767,
    icon: "/images/github.svg",
    url: "/",
  },
  {
    id: 96786,
    icon: "/images/icon-container (14).svg",
    url: "/",
  },
];

function Footer() {
  return (
    <footer className="bg-dark-600 py-12 text-white">
      <div className="container flex flex-col gap-12">
        <div className="flex items-center gap-1">
          {socials.map(({icon, id, url}) => (
            <Link className="w-14 h-14 grid place-content-center" href={url} key={id}>
              <img src={icon} alt="" />
            </Link>
          ))}
        </div>
        <hr className="border-dark-300" />
        <hr className="border-dark-300" />
        <div className="flex  gap-10 justify-between ">
          <p className="text-sm">jiffyscan.xyz &copy; {new Date().getFullYear()}</p>
          <p></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
