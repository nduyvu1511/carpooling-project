import { CarpoolingCompoundingForm } from "@/components"
import { RideContainer } from "@/container"
import { useRouter } from "next/router"
import { useCompoundingForm, useCreateDriverCompoundingCar } from "shared/hook"

const CreateCompounding = () => {
  const router = useRouter()
  const { createCompoundingCar } = useCreateDriverCompoundingCar()
  const {
    compoundingCarCustomerResToCarpoolingForm,
    carpoolingCompoundingFormFromLocalStorage,
  } = useCompoundingForm()

  return (
    <RideContainer heading="Tạo chuyến đi cho tài xế">
      <div className="content-container px-24">
        <CarpoolingCompoundingForm
          onSubmit={(data) => {
            createCompoundingCar({
              params: { ...data, token: "" },
              onSuccess: (data) => {
                router.push(
                  `/driver/confirm_compounding?compounding_car_id=${data.compounding_car_id}`
                )
              },
            })
          }}
          defaultValues={carpoolingCompoundingFormFromLocalStorage()}
        />
      </div>
    </RideContainer>
  )
}

export default CreateCompounding
