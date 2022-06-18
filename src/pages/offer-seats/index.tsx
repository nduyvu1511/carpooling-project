import { CreateRidesForm, SuccessScreen } from "@/components"
import { OneWayCompoundingForm } from "@/components/form/oneWayCompoundingForm"
import { RideContainer } from "@/container"
import { RootState } from "@/core/store"
import { DEFAULT_DATE_TIME_VALUE, DEFAULT_HOUR_BACK_VALUE } from "@/helper"
import { CompoundingType, CreateCompoundingParams } from "@/models"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useCreateRides } from "shared/hook"

const OfferSeat = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { createCompounding } = useCreateRides()
  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false)
  const ridesFormState = useSelector((state: RootState) => state.ridesForm)
  const compoundingType = router.query?.compounding_type

  const handleCreateCompoundingCar = (params: CreateCompoundingParams) => {
    createCompounding({
      params,
      onSuccess: (data) => {
        router.push({
          pathname: "/offer-seats/confirm",
          query: {
            compounding_car_customer_id: data.compounding_car_customer_id,
          },
        })
      },
    })
  }

  return (
    <RideContainer
      onClickBackBtn={() => router.push("/")}
      btnLabel="Tạo Chuyến"
      showBtn={false}
      onClick={() => setShowSuccessScreen(true)}
      heading={
        compoundingType === "one_way"
          ? "Tạo Chuyến đi một chiều"
          : compoundingType === "two_way"
          ? "Tạo Chuyến đi hai chiều"
          : "Tạo chuyến đi ghép"
      }
    >
      <section className="booking">
        <div className="content-container px-24">
          {/* {compoundingType ? (
            <CreateRidesForm
              onSubmit={(data) => handleCreateCompoundingCar(data)}
              defaultValues={{
                to_province_id:
                  compoundingType !== "compounding"
                    ? ridesFormState?.to_province_id?.province_id
                    : 0,
                from_province_id:
                  compoundingType !== "compounding"
                    ? ridesFormState?.from_province_id?.province_id
                    : 0,
                from_pick_up_station_id:
                  compoundingType === "compounding"
                    ? ridesFormState?.from_pick_up_station_id?.station_id
                    : 0,
                to_pick_up_station_id:
                  compoundingType === "compounding"
                    ? ridesFormState?.to_pick_up_station_id?.station_id
                    : 0,
                car_id: Number(ridesFormState?.car_id?.value),
                compounding_type: compoundingType as CompoundingType,
                expected_going_on_date:
                  ridesFormState?.expected_going_on_date?.date_time,
                expected_picking_up_date:
                  compoundingType === "two_way"
                    ? ridesFormState?.expected_picking_up_date
                    : DEFAULT_DATE_TIME_VALUE,
                number_seat:
                  compoundingType === "compounding"
                    ? Number(ridesFormState?.number_seat?.value)
                    : 0,
                quality_car: ridesFormState?.quality_car || "5_star",
                hour_of_wait_time:
                  compoundingType === "two_way"
                    ? ridesFormState?.hour_of_wait_time?.value
                    : DEFAULT_HOUR_BACK_VALUE,
                is_a_day_tour:
                  compoundingType === "two_way"
                    ? ridesFormState?.is_a_day_tour
                    : false,
                note: ridesFormState?.note,
                check_policy: undefined,
              }}
              type={router.query?.compounding_type as CompoundingType}
            />
          ) : null} */}

          <OneWayCompoundingForm />
        </div>
      </section>

      {showSuccessScreen ? (
        <SuccessScreen
          title="Tạo chuyến đi thành công, bây giờ, hành khách có thể thấy và đi với bạn"
          onClick={() => {
            setShowSuccessScreen(false)
          }}
        />
      ) : null}
    </RideContainer>
  )
}

export default OfferSeat
