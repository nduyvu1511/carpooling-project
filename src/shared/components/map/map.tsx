import { getProvinceName, GOOGLE_MAP_API_KEY } from "@/helper"
import { FromLocation, LatLng, LatlngAddress, LocationLatLng } from "@/models"
import { setOpenLocationFormModal } from "@/modules"
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Geocode from "react-geocode"
import { BiCurrentLocation } from "react-icons/bi"
import { RiLoader4Fill } from "react-icons/ri"
import { TiLocation } from "react-icons/ti"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useAddressOptions } from "shared/hook"
import { MapSearch } from "./mapSearch"

type MapOptions = google.maps.MapOptions
type DirectionsResult = google.maps.DirectionsResult
type LatLngLiteral = google.maps.LatLngLiteral

Geocode.setApiKey(GOOGLE_MAP_API_KEY)
Geocode.setLanguage("vi")
Geocode.setRegion("vi")

interface MapProps {
  onChooseLocation?: (params: FromLocation) => void
  defaultLocation?: FromLocation
  viewOnly?: boolean
  direction?: {
    origin: LatLng
    destination: LatLng
  }
  prevProvinceId?: number
}
export const Map = ({
  onChooseLocation,
  defaultLocation,
  viewOnly = false,
  direction,
  prevProvinceId,
}: MapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: ["geometry", "places"],
  })

  const dispatch = useDispatch()
  const mapRef = useRef<GoogleMap>()

  const options = useMemo<MapOptions>(
    () => ({ disableDefaultUI: true, clickableIcons: false }),
    []
  )

  const { getProvinceId } = useAddressOptions()

  const [currentLocation, setCurrenLocation] = useState<LatLngLiteral>()
  const [markerPosition, setMarkerPosition] = useState<LatLngLiteral>()
  const [currentAddress, setCurrentAddress] = useState<LatlngAddress>()
  const [directionRes, setDirectionRes] = useState<DirectionsResult>()
  const [centerMapLoading, setCenterMapLoading] = useState<boolean>(false)

  const onLoad = useCallback((map) => (mapRef.current = map), [])

  const getLocationFromLatlng = ({
    params: { lat, lng },
    onSuccess,
    onErr,
  }: {
    params: LatLng
    onSuccess: (params: LocationLatLng) => void
    onErr?: Function
  }) => {
    Geocode.fromLatLng(lat + "", lng + "")
      .then(
        (response) => {
          const address = response?.results[0]?.formatted_address
          onSuccess({ address, lat, lng })
        },
        (error) => {
          console.error(error)
        }
      )
      .catch((err) => {
        onErr && onErr()
        console.log(err)
      })
  }
  useEffect(() => {
    if (defaultLocation?.province_id) {
      setCurrentAddress(defaultLocation)
      setCurrenLocation(defaultLocation)
      return
    }

    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCurrenLocation({ lat: latitude, lng: longitude })
          getLocationFromLatlng({
            params: { lat: latitude, lng: longitude },
            onSuccess: (address) => {
              setCurrentAddress(address)
            },
          })
        }
      )
    }
  }, [defaultLocation])

  const pantoCurrentLocation = () => {
    if (!currentLocation) {
      dispatch(notify("Không tìm thấy vị trí của bạn", "info"))
      return
    }

    mapRef.current?.panTo(currentLocation)
  }

  const handleCenterChanged = () => {
    if (!mapRef?.current) return

    const center = (mapRef as any)?.current?.getCenter()
    setCenterMapLoading(true)
    Geocode.fromLatLng(center.lat(), center.lng()).then(
      (response) => {
        setCenterMapLoading(false)
        const address = response.results[0].formatted_address
        setCurrentAddress({ address, lat: center.lat(), lng: center.lng() })
      },
      (error) => {
        setCenterMapLoading(false)
        console.error(error)
      }
    )
  }

  const handleConfirmLocation = () => {
    if (!currentAddress?.address) return
    const provinceName = getProvinceName(currentAddress?.address || "")
    if (!provinceName) {
      dispatch(notify("Vui lòng chọn vị trí hợp lệ", "warning"))
      return
    }
    const province_id = getProvinceId(provinceName)
    if (!province_id) {
      dispatch(notify("Vui lòng chọn vị trí hợp lệ", "warning"))
      return
    }
    if (province_id === prevProvinceId) {
      dispatch(notify("Exxe chỉ hỗ chợ những quốc xe khác tỉnh", "warning"))
      return
    }
    onChooseLocation && onChooseLocation({ ...currentAddress, province_id })
    dispatch(setOpenLocationFormModal(undefined))
  }

  useEffect(() => {
    if (!direction) return

    const directionsService = new google.maps.DirectionsService()
    directionsService.route(
      {
        origin: { lng: 10.829326, lat: 106.604024 },
        destination: { lng: 9.188576, lat: 105.177556 },
        travelMode: google.maps.TravelMode.TRANSIT,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log("result: ", result)
          result && setDirectionRes(result)
        } else {
          console.error(`error fetching directions ${result?.routes}`)
        }
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          zoom={16}
          center={currentLocation}
          options={options}
          mapContainerClassName="map-container"
          onClick={(e) => {
            setMarkerPosition({
              lat: e.latLng?.lat() || 0,
              lng: e.latLng?.lng() || 0,
            })
          }}
          onCenterChanged={() => !viewOnly && handleCenterChanged()}
          onLoad={onLoad}
        >
          {direction && directionRes ? (
            <DirectionsRenderer
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
              directions={directionRes}
            />
          ) : null}

          {/* {markerPosition ? <Marker position={markerPosition} /> : null} */}

          {defaultLocation ? <Marker position={defaultLocation} /> : null}

          {!viewOnly && currentLocation && !defaultLocation ? (
            <Marker position={currentLocation} />
          ) : null}

          {!viewOnly ? (
            <>
              <div className="map__search">
                {mapRef?.current ? (
                  <MapSearch
                    onSelect={(address) => {
                      mapRef.current?.panTo({
                        lat: address.lat,
                        lng: address.lng,
                      })
                    }}
                  />
                ) : null}
              </div>

              <span className="location-center-icon">
                <TiLocation />
              </span>

              <button
                onClick={pantoCurrentLocation}
                className="btn-reset map-current-btn"
              >
                <BiCurrentLocation />
              </button>

              <div className="map__info-container">
                <div className="map__info">
                  <div className="map__info-address">
                    <h3>
                      <TiLocation />
                      <span>
                        {centerMapLoading
                          ? "Đang tải..."
                          : currentAddress?.address || ""}
                      </span>
                    </h3>
                  </div>

                  <div className="map__info-action">
                    <button
                      onClick={handleConfirmLocation}
                      className={`map__info-action-btn btn-primary ${
                        !currentAddress?.lat || centerMapLoading
                          ? "map__info-action-btn-disabled"
                          : ""
                      }`}
                    >
                      Xác nhận điểm đón
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </GoogleMap>
      ) : (
        <div className="map-loader">
          <RiLoader4Fill className="loader" />
        </div>
      )}
    </>
  )
}
