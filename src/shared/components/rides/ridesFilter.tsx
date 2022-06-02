import React from "react"
import { RidesFilterItem } from "./ridesFilterItem"

export const RidesFilter = () => {
  return (
    <div className="rides__filter-list-parent">
      <button className="btn-primary-text rides__available-left-btn">
        Xóa bộ lọc
      </button>
      <RidesFilterItem
        heading="Sắp xếp theo"
        list={["Giá thấp nhất", "Khởi hành sớm nhất", "Gần nhất"]}
        onClick={(val) => console.log(val)}
        key="radio"
      />

      <RidesFilterItem
        heading="Thời gian khởi hành"
        list={["6:00 - 12:00", "12:01 - 18:00", "Sau 18h"]}
        onClick={(val) => console.log(val)}
        type="checkbox"
      />
    </div>
  )
}
