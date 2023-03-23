import { parse } from 'path'
import React, { useEffect, useState } from 'react'
import { tableDataT } from './Table'

interface PaginationProps {
  table: tableDataT
  setTable: React.Dispatch<React.SetStateAction<tableDataT>>
}

function Pagination(props: PaginationProps) {
  const { setTable, table } = props
  const [show, setShow] = useState<string>('10')
  const [page, setPage] = useState(1)

  const totalRows = table.rows.length

  const isMaxPage = page * parseInt(show) >= totalRows
  const isMinPage = page <= 1

  const fromPage = (page - 1) * parseInt(show) + 1
  const toPage = isMaxPage ? totalRows : page * parseInt(show)

  const updateTable = (start: number, end: number) => {
    const availableTable = {
      ...table,
      rows: table.rows.slice(start, end),
    } as tableDataT
    setTable(availableTable)
  }

  const handlePage = (value: number) => {
    updateTable((value - 1) * parseInt(show), value * parseInt(show))
    setPage(value)
  }
  const handleShow = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setShow(value)
    handlePage(1)
    updateTable(0, parseInt(value) > totalRows ? totalRows : parseInt(value))
  }

  const hanlePrevBackward = () => {
    handlePage(1)
  }
  const hanlePrev = () => {
    handlePage(isMinPage ? 1 : page - 1)
  }
  const hanleNext = () => {
    handlePage(isMaxPage ? totalRows / parseInt(show) : page + 1)
  }
  const hanleNextForward = () => {
    handlePage(Math.max(0, Math.ceil(totalRows / parseInt(show))))
  }

  return (
    <div className="flex flex-wrap justify-end items-center gap-2 md:gap-4 text-sm mt-2">
      <div className="flex items-center">
        <p>Rows per page:</p>
        <select
          onChange={handleShow}
          value={show}
          name=""
          id=""
          className="pl-3 pr-1"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="70">70</option>
        </select>
      </div>
      <p>
        {fromPage}–{toPage} of {totalRows}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={hanlePrevBackward}
          disabled={isMinPage}
          className={`${isMinPage ? 'opacity-40' : ''}`}
          type="button"
        >
          <img src="/images/icon-container (27).svg" alt="" />
        </button>
        <button
          onClick={hanlePrev}
          disabled={isMinPage}
          className={`${isMinPage ? 'opacity-40' : ''}`}
          type="button"
        >
          <img src="/images/icon-container (26).svg" alt="" />
        </button>
        <button
          onClick={hanleNext}
          disabled={isMaxPage}
          className={`${isMaxPage ? 'opacity-40' : ''}`}
          type="button"
        >
          <img src="/images/icon-container (20).svg" alt="" />
        </button>
        <button
          onClick={hanleNextForward}
          disabled={isMaxPage}
          className={`${isMaxPage ? 'opacity-40' : ''}`}
          type="button"
        >
          <img src="/images/icon-container (21).svg" alt="" />
        </button>
      </div>
    </div>
  )
}

export default Pagination
