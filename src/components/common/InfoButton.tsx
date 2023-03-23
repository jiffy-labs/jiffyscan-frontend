import React from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
function InfoButton() {
  return (
    <>
      <Tooltip id="my-tooltip" />
      <div
        className="flex"
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Hello world!"
      >
        <button type="button">
          <img src="/images/icon-container (3).svg" alt="" />
        </button>
      </div>
    </>
  )
}

export default InfoButton
