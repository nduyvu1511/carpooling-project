import { VehicleContainer } from "@/container"
import { vehicles } from "@/helper"
import { MainNoFooter } from "@/layout"
import { useRouter } from "next/router"
import Select from "react-select"

const ModelVehicle = () => {
  const router = useRouter()

  return (
    <VehicleContainer
      onBtnClick={() => router.push("/dashboard/profile/vehicle/photos")}
      btnLabel="Tiếp theo"
      heading="Loại xe của bạn là gì?"
    >
      <div className="vehicle__inner">
        <div className="px-24 select-large">
          <Select options={vehicles} placeholder="4 Chỗ" />
        </div>
      </div>
    </VehicleContainer>
  )
}

ModelVehicle.Layout = MainNoFooter

export default ModelVehicle
