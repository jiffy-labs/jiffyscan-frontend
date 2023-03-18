import React from "react";

function Token({ icon, text, copyIcon }: { icon?: string; text: string; copyIcon?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      {icon && <img src={icon} alt="" />}
      <span className="text-blue-200">{shortenString(text)}</span>
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
