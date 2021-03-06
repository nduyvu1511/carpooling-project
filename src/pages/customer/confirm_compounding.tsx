import { CarpoolingCompoundingForm, Map } from "@/components"
import { RideContainer } from "@/container"
import { formatMoneyVND, getCompoundingTypeName } from "@/helper"
import { CompoundingCarCustomer, CreateCompoundingParams } from "@/models"
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

const ConfirmCompounding = () => {
  const { token } = useToken()
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    getDetailCompoundingCarCustomer,
    confirmExistedCompoundingCarCustomer,
    updateCompounding,
  } = useCreateRides()
  const { compounding_car_customer_id } = router.query
  const [compoundingCar, setCompoundingCar] = useState<CompoundingCarCustomer>()
  const { clearCarpoolingWayCompoundingCar, compoundingCarCustomerResToCarpoolingForm } =
    useCompoundingForm()

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
    confirmExistedCompoundingCarCustomer({
      params: { compounding_car_customer_id },
      onSuccess: () => {
        router.push(`/customer/checkout?compounding_car_customer_id=${compounding_car_customer_id}`)
      },
    })
    clearCarpoolingWayCompoundingCar()
  }

  const handleUpdateCompoundingCar = (data: CreateCompoundingParams) => {
    if (!compounding_car_customer_id) return
    updateCompounding({
      params: {
        ...data,
        compounding_car_customer_id: Number(compounding_car_customer_id),
        token,
      },
      onSuccess: () => {
        dispatch(notify("Ch???nh s???a chuy???n ??i th??nh c??ng", "success"))
      },
    })
  }

  if (!compoundingCar?.compounding_car_customer_id) return null
  return (
    <RideContainer heading="X??c nh???n chuy???n ??i">
      <div className="rides-confirm-container">
        <div className="content-container px-24">
          <div className="rides__confirm">
            <div className="rides__confirm-item">
              <h3 className="rides__confirm-item-title">T??m t???t: </h3>

              <div className="rides__confirm-map">
                {window?.google ? (
                  <Map
                    viewOnly
                    direction={{
                      destination: {
                        lng: 9.188576,
                        lat: 105.177556,
                      },
                      origin: {
                        lng: 10.829326,
                        lat: 106.604024,
                      },
                    }}
                  />
                ) : null}
              </div>

              <ul className="rides__confirm-location">
                <li className="rides__confirm-location-item">
                  <p className="rides__confirm-location-item-l">
                    <IoMdInformationCircle />
                    Lo???i:
                  </p>

                  <p className="rides__confirm-location-item-r">
                    {getCompoundingTypeName(compoundingCar?.compounding_type || "one_way")}
                  </p>
                </li>

                <li className="rides__confirm-location-item">
                  <div className="rides__confirm-location-item-l">
                    <MdLocationOn />
                    ??i???m ??i:
                  </div>

                  <div className="rides__confirm-location-item-r">
                    <p>{compoundingCar?.from_province?.province_name}</p>
                  </div>
                </li>

                <li className="rides__confirm-location-item">
                  <p className="rides__confirm-location-item-l">
                    <IoMdFlag />
                    ??i???m ?????n:
                  </p>

                  <p className="rides__confirm-location-item-r">
                    {compoundingCar?.to_province?.province_name}
                  </p>
                </li>

                <li className="rides__confirm-location-item">
                  <p className="rides__confirm-location-item-l">
                    <IoMdPricetags />
                    Gi??:
                  </p>

                  <p className="rides__confirm-location-item-r">
                    {formatMoneyVND(compoundingCar.amount_total)}
                  </p>
                </li>

                <li className="rides__confirm-location-item">
                  <p className="rides__confirm-location-item-l">
                    <RiPinDistanceFill />
                    Qu??ng ???????ng:
                  </p>

                  <p className="rides__confirm-location-item-r">
                    {((compoundingCar as any)?.distance || 0)?.toFixed(2)}km
                  </p>
                </li>

                <li className="rides__confirm-location-item">
                  <p className="rides__confirm-location-item-l">
                    <FaCarSide />
                    S??? l????ng ch???:
                  </p>

                  <p className="rides__confirm-location-item-r">
                    {compoundingCar?.car.number_seat}
                  </p>
                </li>
              </ul>
            </div>

            <div className="rides__confirm-item">
              <h3 className="rides__confirm-item-title">Th???i gian d??? ki???n</h3>

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
              <h3 className="rides__confirm-item-title">Ghi ch?? cho chuy???n ??i</h3>

              <div className="rides__confirm-note">
                <div className="rides__confirm-note-icon">
                  <FaRegEdit />
                </div>
                <p className="rides__confirm-note-content">{compoundingCar.note}</p>
              </div>
            </div>

            <div className="rides__confirm-item">
              <CarpoolingCompoundingForm
                limitNumberSeat={compoundingCar.number_available_seat}
                mode="update"
                type="existed"
                defaultValues={compoundingCarCustomerResToCarpoolingForm(compoundingCar)}
                onSubmit={(data) => {
                  if (data.mode === "update") {
                    handleUpdateCompoundingCar(data)
                  } else {
                    handleConfirmCompoundingCar(compoundingCar.compounding_car_customer_id)
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </RideContainer>
  )
}

export default ConfirmCompounding
