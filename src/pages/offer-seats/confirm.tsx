import {
  CarpoolingCompoundingForm,
  Map,
  OneWayCompoundingForm,
  TwoWayCompoundingForm,
} from "@/components"
import { RideContainer } from "@/container"
import { formatMoneyVND, getCompoundingTypeName } from "@/helper"
import { CompoundingCarCustomer, CreateCompoundingParams } from "@/models"
import { setCurrentCompoundingCarCustomer } from "@/modules"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BsCalendar3 } from "react-icons/bs"
import { FaCarSide, FaRegEdit } from "react-icons/fa"
import { IoMdFlag, IoMdInformationCircle, IoMdPricetags } from "react-icons/io"
import { MdLocationOn } from "react-icons/md"
import { RiPinDistanceFill } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useCompoundingForm, useCreateRides, useToken } from "shared/hook"

const Confirm = () => {
  const { token } = useToken()
  const router = useRouter()
  const dispatch = useDispatch()
  const { confirmCompounding, updateCompounding, getDetailCompoundingCarCustomer } =
    useCreateRides()
  const { compounding_car_customer_id } = router.query
  // const { isValidating, data: compoundingCar } = useFetchCompoundingCarCustomer(
  //   "get_detail_compounding_car_customer_confirm"
  // )
  const [compoundingCar, setCompoundingCar] = useState<CompoundingCarCustomer>()
  const {
    clearCarpoolingWayCompoundingCar,
    clearOneWayCompoundingCar,
    clearTwoWayCompoundingCar,
    compoundingCarCustomerResToOneWayForm,
    compoundingCarCustomerResToTwoWayForm,
    compoundingCarCustomerResToCarpoolingForm,
  } = useCompoundingForm()

  useEffect(() => {
    if (!compounding_car_customer_id || !token) return

    getDetailCompoundingCarCustomer({
      params: {
        compounding_car_customer_id: +compounding_car_customer_id,
      },
      onSuccess: (data) => {
        setCompoundingCar(data)
      },
    })
  }, [compounding_car_customer_id])

  const handleConfirmCompoundingCar = (compounding_car_customer_id: number) => {
    if (!compoundingCar) return
    confirmCompounding({
      params: { compounding_car_customer_id },
      onSuccess: () => {
        dispatch(
          setCurrentCompoundingCarCustomer({
            key: compoundingCar.compounding_type,
            value: undefined,
          })
        )
        router.push(
          `/offer-seats/checkout?compounding_car_customer_id=${compounding_car_customer_id}`
        )
      },
    })

    if (compoundingCar?.compounding_type === "compounding") {
      clearCarpoolingWayCompoundingCar()
    } else if (compoundingCar?.compounding_type === "one_way") {
      clearOneWayCompoundingCar()
    } else {
      clearTwoWayCompoundingCar()
    }
  }

  const handleUpdateCompoundingCar = (data: CreateCompoundingParams) => {
    updateCompounding({
      params: {
        ...data,
        compounding_car_customer_id: Number(compounding_car_customer_id),
        token: "",
      },
      onSuccess: () => {
        dispatch(notify("Chỉnh sửa chuyến đi thành công", "success"))
      },
    })
  }

  if (!compoundingCar?.compounding_car_id) return null

  return (
    <RideContainer heading="Xác nhận chuyến đi">
      <div className="rides-confirm-container">
        <div className="content-container px-24">
          <div className="rides__confirm">
            <div className="rides__confirm-item">
              <h3 className="rides__confirm-item-title">Tóm tắt: </h3>

              <div className="rides__confirm-map">
                {window?.google ? (
                  <Map
                    viewOnly
                    // direction={{
                    //   destination: {
                    //     lng: 9.188576,
                    //     lat: 105.177556,
                    //   },
                    //   origin: {
                    //     lng: 10.829326,
                    //     lat: 106.604024,
                    //   },
                    // }}
                  />
                ) : null}
              </div>

              <ul className="rides__confirm-location">
                <li className="rides__confirm-location-item">
                  <p className="rides__confirm-location-item-l">
                    <IoMdInformationCircle />
                    Loại:
                  </p>

                  <p className="rides__confirm-location-item-r">
                    {getCompoundingTypeName(compoundingCar?.compounding_type || "one_way")}
                  </p>
                </li>

                <li className="rides__confirm-location-item">
                  <div className="rides__confirm-location-item-l">
                    <MdLocationOn />
                    Điểm đi:
                  </div>

                  <div className="rides__confirm-location-item-r">
                    <p>{compoundingCar?.from_province?.province_name}</p>
                  </div>
                </li>

                <li className="rides__confirm-location-item">
                  <p className="rides__confirm-location-item-l">
                    <IoMdFlag />
                    Điểm đến:
                  </p>

                  <p className="rides__confirm-location-item-r">
                    {compoundingCar?.to_province?.province_name}
                  </p>
                </li>

                <li className="rides__confirm-location-item">
                  <p className="rides__confirm-location-item-l">
                    <IoMdPricetags />
                    Giá:
                  </p>

                  <p className="rides__confirm-location-item-r">
                    {formatMoneyVND(compoundingCar.amount_total)}
                  </p>
                </li>

                <li className="rides__confirm-location-item">
                  <p className="rides__confirm-location-item-l">
                    <RiPinDistanceFill />
                    Quãng đường:
                  </p>

                  <p className="rides__confirm-location-item-r">
                    {" "}
                    {compoundingCar?.distance?.toFixed(2)}km
                  </p>
                </li>

                <li className="rides__confirm-location-item">
                  <p className="rides__confirm-location-item-l">
                    <FaCarSide />
                    Số lương chỗ:
                  </p>

                  <p className="rides__confirm-location-item-r">
                    {compoundingCar?.car.number_seat}
                  </p>
                </li>
              </ul>
            </div>

            <div className="rides__confirm-item">
              <h3 className="rides__confirm-item-title">Thời gian dự kiến</h3>

              <div className="rides__confirm-date">
                <div className="rides__confirm-date-icon">
                  <BsCalendar3 />
                </div>
                <div className="rides__confirm-date-content">
                  <p className="rides__confirm-date-date-from">
                    {compoundingCar?.expected_going_on_date}
                  </p>
                  <p className="rides__confirm-date-date-to">
                    {compoundingCar?.expected_picking_up_date}
                  </p>
                </div>
              </div>
            </div>

            <div className="rides__confirm-item">
              <h3 className="rides__confirm-item-title">Ghi chú cho chuyến đi</h3>

              <div className="rides__confirm-note">
                <div className="rides__confirm-note-icon">
                  <FaRegEdit />
                </div>
                <p className="rides__confirm-note-content">nội dung ở đây</p>
              </div>
            </div>

            <div className="rides__confirm-item">
              {compoundingCar?.compounding_type ? (
                <>
                  {compoundingCar.compounding_type === "one_way" ? (
                    <OneWayCompoundingForm
                      defaultValues={compoundingCarCustomerResToOneWayForm(compoundingCar)}
                      mode="update"
                      onSubmit={(data) => {
                        if (data.mode === "update") {
                          handleUpdateCompoundingCar(data)
                        } else {
                          handleConfirmCompoundingCar(compoundingCar.compounding_car_customer_id)
                        }
                      }}
                    />
                  ) : compoundingCar.compounding_type === "two_way" ? (
                    <TwoWayCompoundingForm
                      defaultValues={compoundingCarCustomerResToTwoWayForm(compoundingCar)}
                      mode="update"
                      onSubmit={(data) => {
                        if (data.mode === "update") {
                          handleUpdateCompoundingCar(data)
                        } else {
                          handleConfirmCompoundingCar(compoundingCar.compounding_car_customer_id)
                        }
                      }}
                    />
                  ) : (
                    <CarpoolingCompoundingForm
                      mode="update"
                      defaultValues={compoundingCarCustomerResToCarpoolingForm(compoundingCar)}
                      onSubmit={(data) => {
                        if (data.mode === "update") {
                          handleUpdateCompoundingCar(data)
                        } else {
                          handleConfirmCompoundingCar(compoundingCar.compounding_car_customer_id)
                        }
                      }}
                    />
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </RideContainer>
  )
}

export default Confirm
