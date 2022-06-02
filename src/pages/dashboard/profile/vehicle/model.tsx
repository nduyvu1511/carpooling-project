import { Input, ItemSelect } from "@/components"
import { VehicleContainer } from "@/container"
import { MainNoFooter } from "@/layout"
import { useRouter } from "next/router"

const ModelVehicle = () => {
  const router = useRouter()

  return (
    <VehicleContainer
      onBtnClick={() => router.push("/dashboard/profile/vehicle/type")}
      btnLabel="Tiếp theo"
      heading="Mẫu xe của bạn là gì?"
    >
      <div className="vehicle__inner">
        <div className="px-24">
          <Input
            attributes={{ placeholder: "Mercedes..." }}
            onChange={() => {}}
          />
        </div>

        <ul className="vehicle__list">
          <li className="vehicle__list-item">
            <ItemSelect isChecked={true} onCheck={() => {}} title="FORD" />
          </li>

          <li className="vehicle__list-item">
            <ItemSelect isChecked={false} onCheck={() => {}} title="FORD" />
          </li>
          <li className="vehicle__list-item">
            <ItemSelect isChecked={false} onCheck={() => {}} title="FORD" />
          </li>
          <li className="vehicle__list-item">
            <ItemSelect isChecked={false} onCheck={() => {}} title="ford" />
          </li>
          <li className="vehicle__list-item">
            <ItemSelect isChecked={false} onCheck={() => {}} title="FORD" />
          </li>
        </ul>
      </div>
    </VehicleContainer>
  )
}

ModelVehicle.Layout = MainNoFooter

export default ModelVehicle
