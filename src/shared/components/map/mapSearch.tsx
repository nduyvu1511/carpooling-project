import { RootState } from "@/core/store"
import { getProvinceName } from "@/helper"
import { FromLocation } from "@/models"
import { addLocationSearchHistory } from "@/modules"
import { useRef, useState } from "react"
import { MdOutlineLocationOff } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { useAddress, useClickOutside } from "shared/hook"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import { Input } from "../inputs"
import { LocationItem, LocationItemHistory } from "../location"

interface MapSearchProps {
  onSelect?: (val: FromLocation) => void
}

export const MapSearch = ({ onSelect }: MapSearchProps) => {
  const { getProvinceId } = useAddress(true)
  const dispatch = useDispatch()
  const { searchHistory } = useSelector(
    (state: RootState) => state.locationHistory
  )
  const {
    ready,
    value: searchValues,
    setValue,
    suggestions: { data: locations, loading, status },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const [showSearchResult, setShowSearchResult] = useState<boolean>()

  const searchRef = useRef<HTMLDivElement>(null)
  useClickOutside([searchRef], () => {
    setShowSearchResult(false)
  })

  const getLocationFromSearchResult = (
    location: google.maps.places.AutocompletePrediction
  ) => {
    getGeocode({ address: location.description }).then((results) => {
      const { lat, lng } = getLatLng(results?.[0])
      const locationName = getProvinceName(location?.description)
      const province_id = getProvinceId(locationName)
      if (!province_id) return

      const newLocation: FromLocation = {
        lat,
        lng,
        address: location.description,
        province_id: 0,
      }

      dispatch(
        addLocationSearchHistory({ ...newLocation, id: location.place_id })
      )
      onSelect && onSelect(newLocation)
      setShowSearchResult(false)
    })
  }

  return (
    <div ref={searchRef} className="location__search">
      <div className="map__search-input">
        <Input
          className="form-item-input"
          onChange={(val) => {
            setValue(val)
            clearSuggestions()
          }}
          attributes={{ placeholder: "Tìm kiếm vị trí...", disabled: !ready }}
          onFocus={() => setShowSearchResult(true)}
        />
      </div>

      {showSearchResult ? (
        <div className="map__search__result">
          {searchValues ? (
            <div className="location__result">
              {loading ? (
                <div className="px-12 py-12">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <LocationItem
                      key={index}
                      location={null as any}
                      isLoading={true}
                    />
                  ))}
                </div>
              ) : null}

              <ul className="location__result-list">
                {status === "OK" &&
                  locations?.length > 0 &&
                  locations.map((item, index) => (
                    <li key={index} className="location__result-list-item">
                      <LocationItem
                        location={item}
                        onSelect={(val) => getLocationFromSearchResult(val)}
                      />
                    </li>
                  ))}
              </ul>

              {status && status !== "OK" ? (
                <div className="location__result--no-result px-12 py-12">
                  <p className="location__no-result-title">
                    <MdOutlineLocationOff />
                    Không tìm được vị trí
                  </p>
                  <p className="location__no-result-desc">
                    Kiểm tra lại chính tả hoặc chọn vị trí trên bản đồ để xác
                    định vị trí của bạn
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <ul className="location-search-history__result">
              {searchHistory.map((item, index) => (
                <li key={index}>
                  <LocationItemHistory
                    location={item}
                    onSelect={(location) => {
                      onSelect && onSelect(location)
                      setShowSearchResult(false)
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}
