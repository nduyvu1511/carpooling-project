interface RouteItemProps {
  type?: "detail" | "item"
  fromAddress?: string
  toAddress?: string
  fromDate: string
  toDate: string
  fromProvince: string
  toProvince: string
}

export const RouteItem = ({
  type = "item",
  fromProvince,
  toProvince,
  fromAddress,
  toAddress,
  fromDate,
  toDate,
}: RouteItemProps) => {
  return (
    <div className="route__item">
      <div className="route__item-time">
        <div className="route__item-time-start">
          <p className="route__item-time-start-date">Đi từ:</p>
          {/* <p className="route__item-time-start-duration">4h30</p> */}
        </div>
        <div className="route__item-time-end">
          <p className="route__item-time-end-date">Đến tại:</p>
        </div>
      </div>

      <div className="route__item-location">
        <div className="route__item-line"></div>
        <div className="route__item-r">
          <div className="route__item-location-item route__item-location-item-from">
            <div className="route__item-location-name">
              <p className="route-item__location-name">{fromProvince}</p>
              {type === "detail" ? (
                <p className="route-item__location-desc">55/4a Quốc lộ 1a, Bà Điểm, Hóc Môn</p>
              ) : null}
            </div>
            {/* <div className="route__item-location-quantity">
            <span className="route__item-location-quantity-item">
              {menWalkIcon()}
            </span>
          </div> */}
          </div>

          <div className="route__item-location-item">
            <div className="route__item-location-name">
              <p className="route-item__location-name">{toProvince}</p>
              {type === "detail" ? (
                <p className="route-item__location-desc">55/4a Quốc lộ 1a, Bà Điểm, Hóc Môn</p>
              ) : null}
            </div>

            {/* <div className="route__item-location-quantity">
            <span className="route__item-location-quantity-item">
              {menWalkIcon()}
            </span>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
