import { Alert, Map } from "@/components"
import { RideContainer } from "@/container"
import { isObjectHasValue } from "@/helper"
import { setScreenLoading } from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { RiLoader4Fill } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import {
  useCompoundingCarProcess,
  useCurrentLocation,
  useFetchCompoundingCarDetail,
  useToken,
} from "shared/hook"
import { LatLng } from "use-places-autocomplete"

const ScheduleDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { token } = useToken()
  const {
    startRunningCompoundingCar,
    confirmDoneCompoundingCar,
    confirmDoneCompoundingCarCustomer,
  } = useCompoundingCarProcess()
  const { compounding_car_id } = router.query
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const {
    data: compoundingCarDetail,
    isValidating,
    mutate: mutateCompoundingCarDetail,
  } = useFetchCompoundingCarDetail({
    key: "get_compounding_car_schedules_driver",
    type: "once",
  })
  const { getCurrentLocation } = useCurrentLocation({ showLoading: true })

  const handleStartRunningCompoundingCar = () => {
    if (!compoundingCarDetail || !isObjectHasValue(compoundingCarDetail)) return
    dispatch(setScreenLoading(true))
    startRunningCompoundingCar(
      compoundingCarDetail?.compounding_car_id || 0,
      () => {
        mutateCompoundingCarDetail({ ...compoundingCarDetail, state: "start_running" })
        dispatch(setScreenLoading(false))
        // router.push(`/schedules/in_process?compounding_car_id=${compounding_car_id}`)
      },
      () => {
        dispatch(setScreenLoading(false))
      }
    )
  }

  const isAllCompoundingCarCustomerDone: boolean = useMemo(() => {
    if (!compoundingCarDetail?.compounding_car_customers?.[0]) return false
    if (compoundingCarDetail?.compounding_car_customers.length === 1) {
      return compoundingCarDetail?.compounding_car_customers?.[0].state === "done"
    }
    return compoundingCarDetail.compounding_car_customers.every((item) => item.state === "done")
  }, [compoundingCarDetail])

  const handleConfirmCompoundingCarDone = () => {
    if (!compoundingCarDetail || !isObjectHasValue(compoundingCarDetail)) return
    if (!isAllCompoundingCarCustomerDone) {
      dispatch(
        notify(
          "Vui lòng xác nhận đã đưa tất cả hành khách đến trạm trước khi chọn hành động này",
          "warning"
        )
      )
      return
    }
    dispatch(setScreenLoading(true))
    confirmDoneCompoundingCar(
      compoundingCarDetail?.compounding_car_id,
      () => {
        dispatch(setScreenLoading(false))
        setShowAlert(false)
        dispatch(notify("Đã hoàn thành chuyến đi", "success"))
        router.push("/")
      },
      () => {
        dispatch(setScreenLoading(false))
      }
    )
  }

  const handleGenerateGoogleMapUrl = (params: LatLng) => {
    getCurrentLocation(({ lat, lng }) =>
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${params.lat},${params.lng}`,
        "_blank"
      )
    )
  }

  const handleConfirmPickedUpPassenger = (
    compounding_car_customer_id: number,
    customer_id: number
  ) => {
    if (!compoundingCarDetail) return
    dispatch(setScreenLoading(true))
    confirmDoneCompoundingCarCustomer(
      { compounding_car_customer_id, customer_id },
      () => {
        dispatch(setScreenLoading(false))
        mutateCompoundingCarDetail(
          {
            ...compoundingCarDetail,
            compounding_car_customers: (compoundingCarDetail.compounding_car_customers || []).map(
              (item) =>
                item.compounding_car_customer_id === compounding_car_customer_id
                  ? { ...item, state: "done" }
                  : item
            ),
          },
          false
        )
      },
      () => {
        dispatch(setScreenLoading(false))
      }
    )
  }

  if (!compoundingCarDetail || !isObjectHasValue(compoundingCarDetail)) return null
  return (
    <>
      <RideContainer heading="Chi tiết chuyến đi">
        <div className="content-container px-24">
          {isValidating ? (
            <div className="loading-section">
              <RiLoader4Fill className="loader" />
            </div>
          ) : (
            <>
              <div className="schedule__detail-info">
                <p className="schedule__detail-info-title">
                  {compoundingCarDetail.compounding_car_name}
                </p>
              </div>

              <div className="schedule__detail">
                <div className="schedule__detail-map">
                  <Map viewOnly />
                </div>
                <br />

                <div className="schedule__detail-progress">
                  <div className="schedule__detail-progress-value"></div>
                </div>

                <div className="schedule__detail-customers">
                  {compoundingCarDetail?.compounding_car_customers?.length > 0 &&
                    compoundingCarDetail.compounding_car_customers.map((item) => (
                      <div key={item.compounding_car_id} className="schedule__customer px-24">
                        <div className="schedule__customer-l">
                          <div className="schedule__customer-info">
                            <div className="image-container schedule__customer-info-avatar">
                              <Image
                                src={`${API_URL}${item.partner?.avatar_url.image_url}`}
                                alt=""
                                objectFit="cover"
                                layout="fill"
                              />
                            </div>
                            <div className="schedule__customer-info-content">
                              <p className="schedule__customer-info-content-name">
                                {item.partner.partner_name}
                              </p>
                            </div>
                          </div>

                          <div className="schedule__customer-address">
                            <p className="schedule__customer-address-from">
                              <span>Đi từ:</span>
                              {compoundingCarDetail.compounding_type === "compounding"
                                ? `${item.from_pick_up_station.station_name}, ${item.from_pick_up_station.province_id.province_name}`
                                : item.from_address}
                            </p>
                            <p className="schedule__customer-address-from">
                              <span>Đến tại:</span>
                              {compoundingCarDetail.compounding_type === "compounding"
                                ? `${item.to_pick_up_station.station_name}, ${item.to_pick_up_station.province_id.province_name}`
                                : item.to_address}
                            </p>

                            <p className="schedule__customer-address-to">
                              <span>Ngày đi:</span> {item.expected_going_on_date}
                            </p>
                          </div>
                        </div>

                        {compoundingCarDetail.state === "start_running" ? (
                          <div className="schedule__customer-action">
                            <button
                              onClick={() => {
                                handleGenerateGoogleMapUrl({
                                  lat: +item.from_latitude,
                                  lng: +item.from_longitude,
                                })
                              }}
                              className="btn-primary"
                            >
                              Xem đường đến đón
                            </button>
                            <button
                              onClick={() => {
                                handleGenerateGoogleMapUrl({
                                  lat: +item.to_latitude,
                                  lng: +item.to_longitude,
                                })
                              }}
                              className="btn-primary"
                            >
                              Xem hành trình đi
                            </button>

                            {item.state === "in_process" ? (
                              <button
                                onClick={() =>
                                  handleConfirmPickedUpPassenger(
                                    item.compounding_car_customer_id,
                                    item.partner.partner_id
                                  )
                                }
                                className="btn-primary"
                              >
                                Đã đưa khách đến nơi
                              </button>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="schedule__detail-footer">
          <div className="content-container px-24">
            {compoundingCarDetail.state === "start_running" ? (
              <button
                onClick={() => setShowAlert(true)}
                className={`btn-primary ${
                  !isAllCompoundingCarCustomerDone ? "btn-not-allowed" : ""
                }`}
              >
                Kết thúc chuyến đi
              </button>
            ) : (
              <button onClick={() => handleStartRunningCompoundingCar()} className="btn-primary">
                Bắt đầu chuyến đi
              </button>
            )}
          </div>
        </div>
      </RideContainer>

      {showAlert ? (
        <Alert
          title="Nếu dồng ý, bạn phải chắc chắn rằng tất cả tài xế đã thanh toán cho chuyến đi này"
          onClose={() => setShowAlert(false)}
          onConfirm={() => {
            handleConfirmCompoundingCarDone()
          }}
        />
      ) : null}
    </>
  )
}

export default ScheduleDetail
