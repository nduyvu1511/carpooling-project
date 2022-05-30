import { RideResultItem } from "@/components"
import LocationSelect from "@/components/location/locationSelect"
import { MainNoFooter } from "@/layout"

const Departure = () => {
  return (
    <div className="departure">
      <div className="content-container">
        <h1 className="page-heading px-24">Chọn điểm đến</h1>

        <div className="departure-location px-24">
          <LocationSelect />
        </div>

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

Departure.Layout = MainNoFooter

export default Departure
