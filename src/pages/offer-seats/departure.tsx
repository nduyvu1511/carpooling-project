import { RideResultItem } from "@/components"
import LocationSelect from "@/components/location/locationSelect"
import { RideContainer } from "@/container"
import { useRouter } from "next/router"

const Departure = () => {
  const router = useRouter()
  return (
    <RideContainer
      showBtn
      onClick={() => router.push("/offer-seats/arrival")}
      heading="Chọn điểm đi"
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

export default Departure
