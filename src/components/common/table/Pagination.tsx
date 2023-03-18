import React from "react";

function Pagination() {
  return (
    <div className="flex justify-end items-center gap-6 text-sm mt-2">
      <div className="flex items-center gap-3">
        <p>Rows per page:</p>
        <div className="flex items-center">
          <span>20</span>
          <img src="/images/menu-down.svg" alt="" />
        </div>
      </div>
      <p>1–20 of 10000</p>
      <div className="flex items-center gap-1">
        {[
          "icon-container (18).svg",
          "icon-container (19).svg",
          "icon-container (20).svg",
          "icon-container (21).svg",
        ].map((icon, key) => (
          <button key={key} type="button">
            <img src={`/images/${icon}`} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
