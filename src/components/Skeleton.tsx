import React from 'react'
const Skeleton = () => {
  return (
    <tbody>
      <tr>
        <td colSpan={5}>
          <div className=" w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-6 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  )
}

export default Skeleton
