import { Alert, Map } from "@/components"
import { RideContainer } from "@/container"
import { isObjectHasValue } from "@/helper"
import { CompoundingCarDetailRes } from "@/models"
import { setScreenLoading } from "@/modules"
import { API_URL, ridesApi } from "@/services"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { RiLoader4Fill } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { useCompoundingCarProcess, useToken } from "shared/hook"
import { LatLng } from "use-places-autocomplete"

const ScheduleDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { token } = useToken()
  const { startRunningCompoundingCar, confirmDoneCompoundingCar } = useCompoundingCarProcess()
  const { compounding_car_id } = router.query
  const [isLoading, setLoading] = useState<boolean>(false)
  const [compoundingCarDetail, setCompoundingCarDetail] = useState<
    CompoundingCarDetailRes | undefined
  >()
  const [showAlert, setShowAlert] = useState<boolean>(false)

  useEffect(() => {
    if (!compounding_car_id) return
    setLoading(true)
    ridesApi
      .getDetailCompoundingCar({
        compounding_car_id: Number(compounding_car_id),
        token,
      })
      .then((res: any) => {
        setLoading(false)
        setCompoundingCarDetail(res?.result?.data)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compounding_car_id])

  const handleStartRunningCompoundingCar = () => {
    if (!compoundingCarDetail || !isObjectHasValue(compoundingCarDetail)) return
    dispatch(setScreenLoading(true))
    startRunningCompoundingCar(
      compoundingCarDetail?.compounding_car_id || 0,
      () => {
        setCompoundingCarDetail({ ...compoundingCarDetail, state: "start_running" })
        dispatch(setScreenLoading(false))
        // router.push(`/schedules/in_process?compounding_car_id=${compounding_car_id}`)
      },
      () => {
        dispatch(setScreenLoading(false))
      }
    )
  }

  const handleConfirmCompoundingCarDone = () => {
    if (!compoundingCarDetail || !isObjectHasValue(compoundingCarDetail)) return
    confirmDoneCompoundingCar(compoundingCarDetail?.compounding_car_id, () => {
      setShowAlert(false)
      // dispatch(notify(''))
    })
  }

  const handleGenerateGoogleMapUrl = (params: LatLng) => {
    dispatch(setScreenLoading(true))
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        dispatch(setScreenLoading(false))
        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${params.lat},${params.lng}`,
          "_blank"
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
      <RideContainer
        heading="Chi tiết chuyến đi"
        showBtn
        onClick={() =>
          compoundingCarDetail.state === "start_running"
            ? setShowAlert(true)
            : handleStartRunningCompoundingCar()
        }
        btnLabel={`${
          compoundingCarDetail.state === "start_running"
            ? "Kết thúc chuyến đi"
            : "Bắt đầu chuyến đi"
        }`}
      >
        <div className="container px-24">
          {isLoading ? (
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

                        {compoundingCarDetail.state !== "start_running" ? (
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
                          </div>
                        ) : null}
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
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
