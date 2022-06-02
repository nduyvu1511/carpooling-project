import { circleIcon } from "@/assets"
import { setOpenRidesModalSearch } from "@/modules/rides/ridesSlice"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useClickOutside, useDebounce, useInputText } from "shared/hook"
import { RidesResult } from "./ridesResult"

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
          placeholder={type === "from" ? "Đón tại..." : "Đi đến..."}
        />
      </div>

      {showRidesHistory ? (
        <div className="rides__result-absolute hide-on-tablet">
          <RidesResult type="result" />
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
