import { RideResultItem } from "@/components"
import LocationSelect from "@/components/location/locationSelect"
import { RideContainer } from "@/container"
import { useRouter } from "next/router"
import React from "react"

const Arrival = () => {
  const router = useRouter()

  return (
    <RideContainer
      showBtn
      onClick={() => router.push("/offer-seats/choose-your-route")}
      heading="Chọn điểm đến"
    >
      <div className="departure content-container">
        <div className="departure-location px-24">
          <LocationSelect />
        </div>

        <div className="departure__result">
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
            <li className="departure__list-item">
              <RideResultItem type="history" />
            </li>
          </ul>
        </div>
      </div>
    </RideContainer>
  )
}

export default Arrival
