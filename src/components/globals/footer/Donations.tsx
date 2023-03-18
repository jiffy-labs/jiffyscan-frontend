import Token from "@/components/common/Token";
import React from "react";

function Donations() {
  return (
    <div className="text-sm text-[#CFD8DC] flex items-center gap-2">
      <img src="/images/icon-container (15).svg" alt="" />
      <span>Donations:</span>
      <div className="[&_span]:text-white">
        <Token copyIcon="/images/content-copy.svg" text="0x37b415...C8329f" />
      </div>
    </div>
  );
}

export default Donations;
