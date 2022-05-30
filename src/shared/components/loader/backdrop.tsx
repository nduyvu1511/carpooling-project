import React from "react"
import { RiLoader4Fill } from "react-icons/ri"

const Backdrop = () => {
  return (
    <div className="backdrop">
      <span className="backdrop-loading">
        <RiLoader4Fill />
      </span>
    </div>
  )
}

export { Backdrop }
