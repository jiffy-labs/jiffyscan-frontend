import { parse } from "path";
import React, { useEffect, useState } from "react";
import { tableDataT } from "./Table";

interface PaginationProps {
  table: tableDataT;
  setTable: React.Dispatch<React.SetStateAction<tableDataT>>;
  show: string;
  setShow: React.Dispatch<React.SetStateAction<string>>;
  handleShow: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePage: (value: number) => void;
  page: number;
  totalRows: number;
}

function Pagination(props: PaginationProps) {
  const { setTable, table, setShow, show, handleShow, handlePage, page, totalRows } = props;

  const hanlePrevBackward = () => {
    handlePage(1);
  };
  const hanlePrev = () => {
    handlePage(page <= 1 ? 1 : page - 1);
  };
  const hanleNext = () => {
    handlePage(page * parseInt(show) >= totalRows ? totalRows / parseInt(show) : page + 1);
  };
  const hanleNextForward = () => {
    handlePage(Math.ceil(totalRows / parseInt(show)));
  };

  return (
    <div className="flex flex-wrap justify-end items-center gap-2 md:gap-4 text-sm mt-2">
      <div className="flex items-center">
        <p>Rows per page:</p>
        <select onChange={handleShow} value={show} name="" id="" className="pl-3 pr-1">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
      <p>
        {(page - 1) * parseInt(show) + 1}–
        {page * parseInt(show) >= totalRows ? totalRows : page * parseInt(show)} of{" "}
        {table?.rows?.length}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={hanlePrevBackward}
          disabled={page <= 1}
          className={`${page <= 1 ? "opacity-40" : ""}`}
          type="button"
        >
          <img src="/images/icon-container (27).svg" alt="" />
        </button>
        <button
          onClick={hanlePrev}
          disabled={page <= 1}
          className={`${page <= 1 ? "opacity-40" : ""}`}
          type="button"
        >
          <img src="/images/icon-container (26).svg" alt="" />
        </button>
        <button
          onClick={hanleNext}
          disabled={page * parseInt(show) >= totalRows}
          className={`${page * parseInt(show) >= totalRows ? "opacity-40" : ""}`}
          type="button"
        >
          <img src="/images/icon-container (20).svg" alt="" />
        </button>
        <button
          onClick={hanleNextForward}
          disabled={page * parseInt(show) >= totalRows}
          className={`${page * parseInt(show) >= totalRows ? "opacity-40" : ""}`}
          type="button"
        >
          <img src="/images/icon-container (21).svg" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
