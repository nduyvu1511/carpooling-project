import { RideResultItem } from "@/components"
import LocationSelect from "@/components/location/locationSelect"
import { MainNoFooter } from "@/layout"
import React from "react"

const Arrival = () => {
  return (
    <div className="departure">
      <div className="content-container px-24">
        <h1 className="page-heading">Chọn điểm đi</h1>

        <LocationSelect />

        <ul className="departure__list">
          <li className="departure__list-item">
            <RideResultItem type="history" />
          </li>
          <li className="departure__list-item">
            <RideResultItem type="history" />
          </li>
          <li className="departure__list-item">
            <RideResultItem type="history" />
          </li>
          <li className="departure__list-item">
            <RideResultItem type="history" />
          </li>
        </ul>
      </div>
    </div>
  )
}

Arrival.Layout = MainNoFooter

export default Arrival
