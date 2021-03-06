import { Alert, InputCheckbox, ItemSelect, Map } from "@/components"
import {
  FromLocation,
  LocationType,
  OptionModel,
  StationPickUpParams,
} from "@/models"
import { vehicleApi } from "@/services"
import { useEffect, useState } from "react"
import { RiLoader4Line } from "react-icons/ri"
import Select from "react-select"
import { useAddressOptions } from "shared/hook"

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
  const { provinceOptions } = useAddressOptions()

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
                  placeholder="Ch???n t???nh"
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
                  options={provinceOptions as any}
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
                  {!station?.station_id ? "Kh??ng t??m th???y tr???m n??o" : ""}
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
                        ????n t???n n??i
                        <span>(Chi ph?? ph??t sinh th??m v???i t??i x???)</span>
                      </label>
                    </div>
                  ) : null}

                  <button
                    onClick={confirmStationLocation}
                    className="btn-primary location__station-footer-confirm"
                  >
                    X??c nh???n ??i???m ????n
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
          heading="Nh???c nh???"
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
          title="N???u ??i gh??p, Exxe ch??? c?? th??? cung c???p c??c tr???m ????n tr??n m???i t???nh, n???u b???n ch???n ????n t???n n??i, chi ph?? ph??t sinh n??y s??? ???????c b???n v?? t??i x??? gi???i quy???t"
        />
      ) : null}
    </>
  )
}
