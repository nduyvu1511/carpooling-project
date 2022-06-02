import { RideContainer } from "@/container"
import { vehicles } from "@/helper"
import { useRouter } from "next/router"
import Select from "react-select"

const SelectVehicle = () => {
  const router = useRouter()

  return (
    <RideContainer
      onClick={() => router.push("/offer-seats/select-vehicle/quality")}
      showBtn
      heading="Chọn loại xe"
    >
      <div className="rides-vehicle__container">
        <div className="content-container px-24 rides__vehicle">
          <div className="select-large">
            <Select
              placeholder="Chọn loại xe"
              defaultValue={vehicles[0]}
              onChange={(data) => {}}
              options={vehicles}
            />
          </div>
        </div>
      </div>
    </RideContainer>
  )
}

export default SelectVehicle
