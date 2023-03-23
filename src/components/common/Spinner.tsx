import React from 'react'

const Spinner = () => {
  return (
    <div className='h-[177px] bg-white flex items-center justify-center'>
        <div></div>
        <div className="w-12 h-12 rounded-full animate-spin
                    border-2 border-solid border-blue-500 border-t-transparent shadow-md"></div>
    </div>
  )
}

export default Spinner