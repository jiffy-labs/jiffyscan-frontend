import React from "react";
import Link from "next/link";
import IconButton from "@/components/common/icon_button/IconButton";
import {useRouter} from "next/router";
import Search from "./search/Search";
import Pages from "./pages/Pages";
import Logo from "@/components/common/Logo";

interface NavbarProps {
  searchbar?: boolean;
}

function Navbar(props: NavbarProps) {
  const {searchbar} = props;

  return (
    <nav className="py-3">
      <div className="container justify-between flex items-center gap-8">
        <div className="">
          <Logo />
        </div>
        <div className="w-[1px] h-[40px] hidden md:block bg-black/[12%]" />
        <div className="md:block hidden">
          <Pages />
        </div>
        <div className="hidden md:flex items-center gap-3 flex-grow justify-end">
          {searchbar && <Search />}

          <div className="flex items-center gap-1">
            <IconButton icon="/images/icon-container (1).svg" />
            <IconButton icon="/images/icon-container (2).svg" />
          </div>
        </div>
        <div>
          <button type="button">
            <img src="/images/menu.svg" alt="" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
