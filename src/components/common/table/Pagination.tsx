import React from "react";

function Pagination() {
  return (
    <div className="flex flex-wrap justify-end items-center gap-2 md:gap-4 text-sm mt-2">
      <div className="flex items-center">
        <p>Rows per page:</p>
        <select name="" id="" className="pl-3 pr-1">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
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
