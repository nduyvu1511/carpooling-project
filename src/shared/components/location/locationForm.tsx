import { Alert, InputCheckbox, ItemSelect, Map } from "@/components"
import { FromLocation, LocationType, StationPickUpParams } from "@/models"
import { vehicleApi } from "@/services"
import { useEffect, useState } from "react"
import { RiLoader4Line } from "react-icons/ri"
import { useDispatch } from "react-redux"
import Select from "react-select"
import { useAddress } from "shared/hook"

interface LocationFormProps {
  showMap?: boolean
  onCloseModal?: Function
  locationType?: LocationType
  onChooseLocation: (params: FromLocation) => void
  onChooseStation: (params: StationPickUpParams) => void
  defaultStation?: StationPickUpParams
  defaultLocation?: FromLocation
  isPickingUpFromStart?: boolean
}

export const LocationForm = ({
  showMap: showMapProps = true,
  locationType,
  onCloseModal,
  onChooseLocation,
  onChooseStation,
  defaultLocation,
  defaultStation,
  isPickingUpFromStart: isPickingUpFromStartProps,
}: LocationFormProps) => {
  const dispatch = useDispatch()
  const { states } = useAddress(true)

  const [stations, setStations] = useState<StationPickUpParams[]>([])
  const [station, setStation] = useState<StationPickUpParams | undefined>(
    defaultStation
  )
  const [showMap, setShowMap] = useState<boolean>(showMapProps)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [stationLoading, setStationLoading] = useState<boolean>(false)
  const [_defaultLocation, setDefaultLocation] = useState<
    FromLocation | undefined
  >(defaultLocation)
  const [isPickingUpFromStart, setPickingUpFromStart] = useState<boolean>(
    !!isPickingUpFromStartProps
  )

  useEffect(() => {
    if (!defaultStation?.station_id) return
    setStationLoading(true)
    vehicleApi
      .getPickUpStations(defaultStation.province_id.province_id)
      .then((res: any) => {
        setStationLoading(false)
        setStations(res?.result?.data || [])
      })
      .catch((err) => {
        setStationLoading(false)
        console.log(err)
      })
  }, [])

  const confirmStationLocation = () => {
    if (!station?.station_id) {
      console.log("Missing station")
      return
    }

    onChooseStation && onChooseStation(station)
    onCloseModal && onCloseModal()
  }

  return (
    <>
      <div className="location__form">
        {!showMap ? (
          <div className="location__station">
            <div className="location__station-form px-24">
              <div className="form-item location-select">
                <Select
                  defaultValue={
                    defaultStation?.province_id
                      ? {
                          label: defaultStation.province_id.province_name,
                          value: defaultStation.province_id.province_id,
                        }
                      : undefined
                  }
                  placeholder="Chọn tỉnh"
                  onChange={(val) => {
                    if (!val?.value) return
                    setStationLoading(true)
                    vehicleApi
                      .getPickUpStations(val.value)
                      .then((res: any) => {
                        setStationLoading(false)
                        setStations(res?.result?.data || [])
                      })
                      .catch((err) => {
                        setStationLoading(false)
                        console.log(err)
                      })
                  }}
                  options={states?.map((item) => ({
                    label: item.province_name,
                    value: item.province_id,
                  }))}
                />
              </div>
            </div>

            <div className="location__station-result px-24">
              {stationLoading ? (
                <div className="location__station-loading">
                  <RiLoader4Line className="loader" />
                </div>
              ) : null}

              {!stationLoading && !stations?.length ? (
                <div className="location__station-no-result">
                  {!station?.station_id ? "Không tìm thấy trạm nào" : ""}
                </div>
              ) : null}

              {!stationLoading && stations?.length > 0 ? (
                <ul className="location__station-result-list py-12">
                  {stations.map((item, index) => (
                    <li key={index}>
                      <ItemSelect
                        onCheck={() => {
                          setStation(item)
                        }}
                        isChecked={station?.station_id === item.station_id}
                        title={item.station_name}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="location__station-footer">
              {!stationLoading && station?.station_id ? (
                <>
                  {locationType === "from_location" ? (
                    <div className="location__station-footer-remind px-24">
                      <InputCheckbox
                        onCheck={() => setShowAlert(true)}
                        isChecked={!!isPickingUpFromStart}
                      />
                      <label
                        onClick={() => {
                          setShowAlert(true)
                        }}
                        htmlFor=""
                      >
                        Đón tận nơi
                        <span>(Chi phí phát sinh thêm với tài xế)</span>
                      </label>
                    </div>
                  ) : null}

                  <button
                    onClick={confirmStationLocation}
                    className="btn-primary location__station-footer-confirm"
                  >
                    Xác nhận điểm đón
                  </button>
                </>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="location__form-map">
            <Map
              defaultLocation={_defaultLocation}
              onChooseLocation={(data) => {
                onChooseLocation && onChooseLocation(data)
              }}
            />
          </div>
        )}
      </div>

      {showAlert ? (
        <Alert
          heading="Nhắc nhở"
          onClose={() => setShowAlert(false)}
          onConfirm={() => {
            if (!station?.station_id) return
            console.log("station: ", station)
            // setShowAlert(false)
            // setDefaultLocation({
            //   address: station.station_name,
            //   lat: station.latitude,
            //   lng: station.longitude,
            //   province_id: station.province_id.province_id,
            // })
            setPickingUpFromStart(true)
            onChooseStation && onChooseStation(station)
            setShowMap(true)
            setShowAlert(false)
          }}
          title="Nếu đi ghép, Exxe chỉ có thể cung cấp các trạm đón trên mỗi tỉnh, nếu bạn chọn đón tận nơi, chi phí phát sinh này sẽ được bạn và tài xế giải quyết"
        />
      ) : null}
    </>
  )
}
