import Link from "next/link";
import React from "react";

function Token({ icon, text, copyIcon, type }: { icon?: string; text: string; copyIcon?: string; type?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      {icon && <img src={icon} alt="" style={{width: "20px", height: "20px"}} />}
      <Link href={(type=="hash") ? "https://jiffyscan.xyz/userOpHash/"+text : "https://jiffyscan.xyz/address/"+text} target="_blank" className="text-blue-200">
        {shortenString(text)}
      </Link>
      <button type="button">
        <img src={copyIcon || "/images/Button.svg"} alt="" />
      </button>
    </div>
  );
}

export default Token;

function shortenString(str: string) {
  if (str.length <= 10) {
    return str;
  }

  const firstChars = str.slice(0, 6);
  const lastChars = str.slice(-4);

  return `${firstChars}...${lastChars}`;
}
