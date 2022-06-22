import {
  CarpoolingCompoundingForm,
  OneWayCompoundingForm,
  SuccessScreen,
  TwoWayCompoundingForm,
} from "@/components"
import { RideContainer } from "@/container"
import { RootState } from "@/core/store"
import { CreateCompoundingParams, UpdateCompoundingCar } from "@/models"
import { setCurrentCompoundingCarCustomer } from "@/modules"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useCompoundingForm, useCreateRides, useToken } from "shared/hook"

const OfferSeat = () => {
  const { token } = useToken()
  const dispatch = useDispatch()
  const router = useRouter()
  const { createCompounding, updateCompounding } = useCreateRides()
  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false)
  const compoundingType = router.query?.compounding_type
  const {
    currentCarpoolingCompoundingCarCustomer,
    currentOneWayCompoundingCarCustomer,
    currentTwoWayCompoundingCarCustomer,
  } = useSelector((state: RootState) => state.compounding)
  const {
    oneWayCompoundingCarFormFromLocalStorage,
    twoWayCompoundingCarFormFromLocalStorage,
    carpoolingCompoundingFormFromLocalStorage,
  } = useCompoundingForm()

  const handleUpdateCompoundingCar = (params: UpdateCompoundingCar) => {
    updateCompounding({
      params: {
        ...params,
      } as UpdateCompoundingCar,
      onSuccess: () => {
        console.log("success")
        router.push(
          `offer-seats/confirm?compounding_car_customer_id=${params.compounding_car_customer_id}`
        )
      },
    })
  }

  const handleCreateCompoundingCar = (params: CreateCompoundingParams) => {
    if (
      params.compounding_type === "compounding" &&
      currentCarpoolingCompoundingCarCustomer
    ) {
      handleUpdateCompoundingCar({
        ...params,
        token,
        compounding_car_customer_id: currentCarpoolingCompoundingCarCustomer,
      })
      return
    }
    if (
      params.compounding_type === "one_way" &&
      currentOneWayCompoundingCarCustomer
    ) {
      handleUpdateCompoundingCar({
        ...params,
        token,
        compounding_car_customer_id: currentOneWayCompoundingCarCustomer,
      })
      return
    }
    if (
      params.compounding_type === "two_way" &&
      currentTwoWayCompoundingCarCustomer
    ) {
      handleUpdateCompoundingCar({
        ...params,
        token,
        compounding_car_customer_id: currentTwoWayCompoundingCarCustomer,
      })
      return
    }

    createCompounding({
      params,
      onSuccess: (data) => {
        dispatch(
          setCurrentCompoundingCarCustomer({
            key: data.compounding_type,
            value: data.compounding_car_customer_id,
          })
        )
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
          {compoundingType === "one_way" ? (
            <OneWayCompoundingForm
              defaultValues={oneWayCompoundingCarFormFromLocalStorage()}
              onSubmit={(data) => handleCreateCompoundingCar(data)}
            />
          ) : compoundingType === "two_way" ? (
            <TwoWayCompoundingForm
              defaultValues={twoWayCompoundingCarFormFromLocalStorage()}
              onSubmit={(data) => {
                const { mode, ...form } = data
                handleCreateCompoundingCar(form)
              }}
            />
          ) : compoundingType === "compounding" ? (
            <CarpoolingCompoundingForm
              defaultValues={carpoolingCompoundingFormFromLocalStorage()}
              onSubmit={(data) => {
                const { mode, ...form } = data
                handleCreateCompoundingCar(form)
              }}
            />
          ) : null}
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
