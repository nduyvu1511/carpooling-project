import { VehicleContainer } from "@/container"
import { MainNoFooter } from "@/layout"
import { useRouter } from "next/router"
import { useInputText } from "shared/hook"

const ModelVehicle = () => {
  const router = useRouter()
  const { clearValue, onChange, value } = useInputText()

  return (
    <VehicleContainer
      onBtnClick={() => router.push("/dashboard/profile/menu")}
      btnLabel="Thêm xe"
      heading="Mô tả về xe của bạn"
    >
      <div className="vehicle__inner">
        <div className="px-24">
          <textarea
            value={value}
            onChange={onChange}
            className="form-textarea"
            rows={8}
            placeholder="Mô tả về chiếc xe..."
          ></textarea>
        </div>
      </div>
    </VehicleContainer>
  )
}

ModelVehicle.Layout = MainNoFooter

export default ModelVehicle
