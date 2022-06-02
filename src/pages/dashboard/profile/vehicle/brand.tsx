import { Input, ItemSelect } from "@/components"
import { VehicleContainer } from "@/container"
import { MainNoFooter } from "@/layout"
import { useRouter } from "next/router"

const BrandVehicle = () => {
  const router = useRouter()

  const handleSelectVehicle = () => {
    router.push("/dashboard/profile/vehicle/model")
  }

  return (
    <VehicleContainer heading="Hãng xe của bạn là gì?">
      <div className="vehicle__inner">
        <div className="px-24">
          <Input
            attributes={{ placeholder: "Mercedes..." }}
            onChange={() => {}}
          />
        </div>

        <ul className="vehicle__list">
          <li
            onClick={() => handleSelectVehicle()}
            className="vehicle__list-item"
          >
            <ItemSelect
              isChecked={true}
              onCheck={() => handleSelectVehicle()}
              title="FORD"
            />
          </li>

          <li
            onClick={() => handleSelectVehicle()}
            className="vehicle__list-item"
          >
            <ItemSelect
              isChecked={false}
              onCheck={() => handleSelectVehicle()}
              title="FORD"
            />
          </li>
          <li
            onClick={() => handleSelectVehicle()}
            className="vehicle__list-item"
          >
            <ItemSelect
              isChecked={false}
              onCheck={() => handleSelectVehicle()}
              title="FORD"
            />
          </li>
          <li
            onClick={() => handleSelectVehicle()}
            className="vehicle__list-item"
          >
            <ItemSelect
              isChecked={false}
              onCheck={() => handleSelectVehicle()}
              title="ford"
            />
          </li>
          <li
            onClick={() => handleSelectVehicle()}
            className="vehicle__list-item"
          >
            <ItemSelect
              isChecked={false}
              onCheck={() => handleSelectVehicle()}
              title="FORD"
            />
          </li>
        </ul>
      </div>
    </VehicleContainer>
  )
}

BrandVehicle.Layout = MainNoFooter

export default BrandVehicle
