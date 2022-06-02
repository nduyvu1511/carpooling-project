import { arrowIcon2, arrowRightIcon } from "@/assets"
import { formatMoneyVND } from "@/helper"
import React from "react"

interface RideItemProps {
  fromLocation: string
  toLocation: string
  onClick?: Function
}

export const RidesSearchItem = ({
  fromLocation,
  toLocation,
  onClick,
}: RideItemProps) => {
  return (
    <div onClick={() => onClick && onClick()} className="rides__search-item">
      <div className="rides__search-item-info">
        <p className="rides__search-item-info-from">{fromLocation}</p>
        <span className="rides__search-item-arrow-icon-right">
          {arrowIcon2(18)}
        </span>
        <p className="rides__search-item-info-to">{toLocation}</p>
      </div>

      <div className="rides__search-item-bottom">
        <span className="rides__search-item-bottom-price">
          {formatMoneyVND(1290000)}
        </span>
        <span className="rides__search-item-bottom-btn">
          {arrowRightIcon()}
        </span>
      </div>
    </div>
  )
}
