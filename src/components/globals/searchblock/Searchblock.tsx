import React from 'react'
import Options from './Options'

function Searchblock() {
  return (
    <div className="shadow-300 bg-white rounded border-dark-200 flex-grow max-w-[812px]">
      <label className="flex justify-center">
        <Options />
        <div className="flex items-center gap-2.5 pr-4 flex-grow">
          <input
            type="text"
            className="text-base placeholder:text-dark-500 text-dark-600 px-4 py-2 flex-grow truncate min-w-0 max-w-none w-[0px]"
            placeholder="Search by block number, address, hash, or userOp hash..."
          />
          <span className="bg-dark-400 px-3 h-5 justify-center items-center rounded-full md:flex hidden">
            <img className="" src="/images/span (1).svg" alt="" />
          </span>
        </div>
        <div
          role="button"
          className="flex items-center gap-2 py-3.5 px-5 bg-dark-600 rounded-r text-white font-medium text-md tracking-[1.25px] uppercase"
        >
          <img src="/images/icon-container (25).svg" alt="" />
          <span className="md:block hidden">Search</span>
        </div>
      </label>
    </div>
  )
}

export default Searchblock
