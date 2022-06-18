import { arrowIcon2, arrowRightIcon, clockIcon } from "@/assets"
import React from "react"

interface RideResultItemProps {
  type: "history" | "result" | "historyResult"
  content?: string
  onSelect?: (val: any) => void
}

export const RideResultItem = ({
  type,
  content,
  onSelect,
}: RideResultItemProps) => {
  return (
    <div
      onClick={() => onSelect && onSelect(content)}
      className="rides__result-item px-24"
    >
      {type !== "result" ? (
        <span className="rides__result-item-clock-icon">{clockIcon()}</span>
      ) : null}

      {type !== "historyResult" ? (
        <div className="rides__result-item-inner">
          <div className="rides__result-item-address">
            {/* <p className="rides__result-item-address-heading">Vietnam</p> */}

            {type === "result" ? (
              <p className="rides__result-item-address-title">{content}</p>
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
