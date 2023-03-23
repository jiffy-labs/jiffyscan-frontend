import Link from "next/link";
import React from "react";
import CopyButton from "./copy_button/CopyButton";

function Token({ icon, text, copyIcon, type }: { icon?: string; text: string; copyIcon?: string; type?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      {icon && <img src={icon} alt="" style={{width: "20px", height: "20px"}} />}
      <Link href={getHrefLink(type, text)} target={getTarget(type)} className="text-blue-200">
        {shortenString(text)}
      </Link>
      <CopyButton
      text={text}
      copyIcon={copyIcon} 
      />
      {/* <button onClick={() => {copyToClipboard(text);}} className="active:shadow-300" type="button">
        <img src={copyIcon || "/images/Button.svg"} alt="" />
      </button> */}
    </div>
  );
}

export default Token;

function getHrefLink(type: string | undefined, text: string) {
  // if (type == undefined) return "#";
  if (type == "userOp") {
    return "https://jiffyscan.xyz/userOpHash/"+text;
  } else if (type == "address") {
    return "https://jiffyscan.xyz/address/"+text;
  } else {
    return "#";
  }
}

function getTarget(type: string | undefined) {
  // console.log(type)
  if (type == undefined) return "_self";
  if (type == "userOp") {
    return "_blank";
  } else if (type == "address") {
    return "_blank";
  } else {
    return "_self";
  }
}

// function copyToClipboard(text: string): void {
//   navigator.clipboard.writeText(text);
// }

function shortenString(str: string) {
  if (str.length <= 10) {
    return str;
  }

  const firstChars = str.slice(0, 6);
  const lastChars = str.slice(-4);

  return `${firstChars}...${lastChars}`;
}
