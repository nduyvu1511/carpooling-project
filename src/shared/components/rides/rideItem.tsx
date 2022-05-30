import { arrowIcon2, arrowRightIcon } from "@/assets"
import { formatMoneyVND } from "@/helper"
import React from "react"

interface RideItemProps {
  fromLocation: string
  toLocation: string
  onClick?: Function
}

export const RideItem = ({
  fromLocation,
  toLocation,
  onClick,
}: RideItemProps) => {
  return (
    <div onClick={() => onClick && onClick()} className="ride__item">
      <div className="ride__item-info">
        <p className="ride__item-info-from">{fromLocation}</p>
        <span className="ride__item-arrow-icon-right">{arrowIcon2(18)}</span>
        <p className="ride__item-info-to">{toLocation}</p>
      </div>

      <div className="ride__item-bottom">
        <span className="ride__item-bottom-price">
          {formatMoneyVND(1290000)}
        </span>
        <span className="ride__item-bottom-btn">{arrowRightIcon()}</span>
      </div>
    </div>
  )
}
