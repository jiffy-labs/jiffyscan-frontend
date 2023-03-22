import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import pages from "./pages.json";
import Menu from "./Menu";

export default function Pages() {
  const { pathname } = useRouter();

  return (
    <div className="flex md:flex-row flex-col md:items-center gap-4 md:gap-6">
      {pages.map(({ id, name, url, dropdown }) => 
        <Menu name={name} dropdown={dropdown} id={id.toString()} url={url} />
      )}
    </div>
  );


  
}


