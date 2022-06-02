import { arrowIcon2, arrowRightIcon, clockIcon } from "@/assets"
import React from "react"

interface RideResultItemProps {
  type: "history" | "result" | "historyResult"
}

export const RideResultItem = ({ type }: RideResultItemProps) => {
  return (
    <div className="rides__result-item px-24">
      {type !== "result" ? (
        <span className="rides__result-item-clock-icon">{clockIcon()}</span>
      ) : null}

      {type !== "historyResult" ? (
        <div className="rides__result-item-inner">
          <div className="rides__result-item-address">
            <p className="rides__result-item-address-heading">Vietnam</p>

            {type === "result" ? (
              <p className="rides__result-item-address-title">
                55/4A Đường Tiền Lân 15, Bà Điểm, Hóc Môn, Ho Chi Minh City,
                Vietnam
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="rides__result-item-inner">
          <div className="rides__result-item-history">
            <p className="rides__result-item-history-from">Vietnam</p>
            {arrowIcon2()}
            <p className="rides__result-item-history-to">
              55/4A Đường Tiền Lân 15, Bà Điểm, Hóc Môn, Ho Chi Minh City,
              Vietnam
            </p>
          </div>

          <div className="rides__result-item-info">
            <p className="rides__result-item-info-date">Hôm qua</p>
            <p className="rides__result-item-info-count">3 Khách</p>
          </div>
        </div>
      )}

      <span className="rides__result-item-right-icon">{arrowRightIcon()}</span>
    </div>
  )
}
