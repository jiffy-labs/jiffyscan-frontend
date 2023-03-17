import IconButton from "@/components/common/icon_button/IconButton";
import {Token} from "@/views/home/Table";
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

const pages = [
  {
    id: 984,
    name: "Company",
    lists: [
      ["About Us", "/"],
      ["Contact Us", "/"],
      ["Careers", "/"],
      ["Brand Assets", "/"],
      ["Privacy", "/"],
      ["Terms", "/"],
    ],
  },
  {
    id: 456,
    name: "Community",
    lists: [
      ["Blog", "/"],
      ["API Documentation", "/"],
      ["FAQ", "/"],
      ["Submit an Issue", "/"],
    ],
  },
  {
    id: 567,
    name: "Products & Services",
    lists: [
      ["API Plans", "/"],
      ["Explorer-as-a-service", "/"],
      ["GasFee Infrastructure", "/"],
    ],
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
        <div className="grid grid-cols-4 gap-6">
          <div>
            <div className="mb-6">
              <Link href="/">
                <img src="/images/Frame 22.svg" alt="" />
              </Link>
            </div>
            <p className="text-sm">
              We provide a user-friendly block explorer, with an easy-to-use interface for users to view, confirm, and
              inspect transactions on EVM (Ethereum Virtual Machine) blockchains, specialised for EIP-4337 confirming
              transactions.
            </p>
          </div>
          {pages.map(({id, lists, name}) => (
            <div key={id} className="place-self-center self-start">
              <b className="font-normal text-sm text-dark-200 block mb-6">{name}</b>
              <div className="flex flex-col gap-5">
                {lists.map(([name, url], index) => (
                  <Link className="flex items-center gap-2 font-bold group text-white" key={index} href={url}>
                    <span>{name}</span>
                    <img
                      className="group-hover:translate-x-1 duration-100"
                      src="/images/icon-container (17).svg"
                      alt=""
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <hr className="border-dark-300" />
        <div className="flex gap-10 justify-between ">
          <p className="text-sm">jiffyscan.xyz &copy; {new Date().getFullYear()}</p>
          <div className="text-sm text-[#CFD8DC] flex items-center gap-2">
            <img src="/images/icon-container (15).svg" alt="" />
            <span>Donations:</span>
            <div className="[&_span]:text-white">
              <Token copyIcon="/images/content-copy.svg" text="0x37b415...C8329f" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
