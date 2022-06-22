import { CarpoolingCompoundingForm } from "@/components"
import { RideContainer } from "@/container"
import { CompoundingCarRes, CreateCarpoolCompoundingNoToken } from "@/models"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useCompoundingForm, useCreateRides } from "shared/hook"

const CreateCompounding = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { getDetailCompoundingCar, createExistedCompoundingCar } =
    useCreateRides()
  const [compoundingCar, setCompoundingCar] = useState<CompoundingCarRes>()
  const { compoundingCarResToCarpoolingForm } = useCompoundingForm()

  useEffect(() => {
    if (!compounding_car_id) return
    getDetailCompoundingCar({
      params: {
        compounding_car_id: Number(compounding_car_id),
      },
      onSuccess: (data) => {
        setCompoundingCar(data)
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compounding_car_id])

  const handleCreateCompoundingCar = (
    data: CreateCarpoolCompoundingNoToken
  ) => {
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

  if (!compoundingCar) return null
  return (
    <RideContainer heading="Tạo suất đi ghép">
      <div className="content-container px-24">
        <CarpoolingCompoundingForm
          type="existed"
          onSubmit={(data) => handleCreateCompoundingCar(data)}
          defaultValues={compoundingCarResToCarpoolingForm(compoundingCar)}
          limitNumberSeat={compoundingCar.number_available_seat}
        />
      </div>
    </RideContainer>
  )
}

export default CreateCompounding
