
interface RouteItemProps {
  type?: "detail" | "item"
}

export const RouteItem = ({ type = "item" }: RouteItemProps) => {
  return (
    <div className="route__item">
      <div className="route__item-time">
        <div className="route__item-time-start">
          <p className="route__item-time-start-date">11:40</p>
          <p className="route__item-time-start-duration">4h30</p>
        </div>
        <div className="route__item-time-end">
          <p className="route__item-time-end-date">16:10</p>
        </div>
      </div>

      <div className="route__item-location">
        <div className="route__item-line"></div>
        <div className="route__item-location-item route__item-location-item-from">
          <div className="route__item-location-name">
            <p className="route-item__location-name">TP Hồ Chí Minh</p>
            {type === "detail" ? (
              <p className="route-item__location-desc">
                55/4a Quốc lộ 1a, Bà Điểm, Hóc Môn
              </p>
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
            <p className="route-item__location-name">TP Hải Phòng</p>
            {type === "detail" ? (
              <p className="route-item__location-desc">
                55/4a Quốc lộ 1a, Bà Điểm, Hóc Môn
              </p>
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
  )
}
