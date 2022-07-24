import { CarpoolingCompoundingForm } from "@/components"
import { RideContainer } from "@/container"
import { CreateCarpoolCompoundingNoToken } from "@/models"
import { useRouter } from "next/router"
import { useCompoundingForm, useCreateRides, useFetchCompoundingCarDetail } from "shared/hook"

const CreateCompounding = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { createExistedCompoundingCar } = useCreateRides()
  const { compoundingCarResToCarpoolingForm } = useCompoundingForm()

  const { data: compoundingCar, isValidating } = useFetchCompoundingCarDetail({
    key: "get_carpooling_compounding_car",
    type: "once",
  })

  const handleCreateCompoundingCar = (data: CreateCarpoolCompoundingNoToken) => {
    if (!compounding_car_id) return
    createExistedCompoundingCar({
      params: { ...data, compounding_car_id: Number(compounding_car_id) },
      onSuccess: (data) => {
        router.push(
          `/customer/confirm_compounding?compounding_car_customer_id=${data.compounding_car_customer_id}`
        )
      },
    })
  }
  console.log(compoundingCar)

  if (!compoundingCar?.number_available_seat) return null
  return (
    <RideContainer heading="Tạo suất đi ghép">
      <div className="content-container px-24">
        <CarpoolingCompoundingForm
          type="existed"
          onSubmit={(data) => handleCreateCompoundingCar(data)}
          defaultValues={{ ...compoundingCarResToCarpoolingForm(compoundingCar) }}
          limitNumberSeat={compoundingCar.number_available_seat}
        />
      </div>
    </RideContainer>
  )
}

export default CreateCompounding
