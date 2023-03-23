import React from 'react'

function Search() {
  return (
    <div className="shadow-300 bg-white rounded border-dark-200 flex-grow max-w-[400px]">
      <label className="flex justify-center">
        <span className="p-2.5 border-r border-dark-200" role="button">
          <img src="/images/search.svg" alt="" />
        </span>
        <div className="flex items-center gap-2.5 pr-3 flex-grow">
          <input
            type="text"
            className="text-base placeholder:text-dark-500 text-dark-600 px-3 py-2 flex-grow"
            placeholder="Search..."
          />
          <span className="bg-dark-400 px-3 h-5 flex justify-center items-center rounded-full">
            <img className="" src="/images/span (1).svg" alt="" />
          </span>
        </div>
      </label>
    </div>
  )
}

export default Search
