import { circleIcon } from "@/assets"
import { RootState } from "@/core/store"
import { GOOGLE_MAP_API_KEY } from "@/helper"
import { setOpenRidesModalSearch } from "@/modules/compounding/compoundingSlice"
import { useLoadScript } from "@react-google-maps/api"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useClickOutside, useDebounce, useInputText } from "shared/hook"
import usePlacesAutocomplete from "use-places-autocomplete"
import { LocationItemHistory } from "../location"

interface InputRidesSearchProps {
  onChange: (value: string) => void
  type: "from" | "to"
  onFocus?: Function
}

export const InputRidesSearch = ({
  onChange: onChangeProps,
  type,
  onFocus,
}: InputRidesSearchProps) => {
  const { searchHistory } = useSelector(
    (state: RootState) => state.locationHistory
  )
  useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  })
  const {
    ready,
    value: searchValues,
    setValue,
    suggestions: { data, loading, status },
    clearSuggestions,
  } = usePlacesAutocomplete({
    // requestOptions: { region: "vi", language: "vi" },
  })

  const dispatch = useDispatch()
  const { onChange, value } = useInputText()
  const ridesHistoryRef = useRef<HTMLDivElement>(null)
  const _value = useDebounce(value, 400)
  const [showRidesHistory, setShowRidesHistory] = useState<boolean>(false)

  useClickOutside([ridesHistoryRef], () => {
    setShowRidesHistory(false)
  })

  useEffect(() => {
    if (!_value) return
    onChangeProps && onChangeProps(_value)
  }, [_value])

  return (
    <>
      <div ref={ridesHistoryRef} className="input__search hide-on-tablet">
        {circleIcon()}
        <input
          onFocus={() => {
            setShowRidesHistory(true)
            onFocus && onFocus()
          }}
          type="text"
          onChange={onChange}
          value={value}
          placeholder={type === "from" ? "Đi..." : "Đến..."}
        />
      </div>

      {showRidesHistory ? (
        <div className="rides__result-absolute hide-on-tablet">
          <div className="location__result-history">
            {searchHistory?.length > 0 &&
              searchHistory.map((item) => (
                <LocationItemHistory key={item.id} location={item} />
              ))}
          </div>
          {/* <RidesResult type="result" /> */}
        </div>
      ) : null}

      <div ref={ridesHistoryRef} className="input__search show-on-tablet">
        {circleIcon()}
        <input
          readOnly
          onFocus={() => {
            onFocus && onFocus()
            dispatch(setOpenRidesModalSearch({ isOpenSearchModal: true, type }))
          }}
          type="text"
          onChange={onChange}
          value={value}
          placeholder={type === "from" ? "Đón tại..." : "Đi đến..."}
        />
      </div>
    </>
  )
}
