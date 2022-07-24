import { toggleBodyOverflow } from "@/helper"
import { StationId } from "@/models"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { Modal } from "../../modal"
import { Station } from "../../station"

interface InputStationProps {
  label: string
  onChange: (params: StationId) => void
  isError?: boolean
  value: string
  type: "from" | "to"
  prevProvinceId?: number
  defaultValue?: StationId
}

export const InputStation = ({
  label,
  onChange,
  isError = false,
  value,
  type,
  prevProvinceId,
  defaultValue,
}: InputStationProps) => {
  const dispatch = useDispatch()
  const [showStation, setShowStation] = useState<boolean>(false)

  return (
    <>
      <div className="input__location">
        <div className="rides__form-location-input">
          <span className="rides__form-location-input-type">{type === "from" ? "Đi" : "Đến"}:</span>

          <input
            onClick={() => {
              toggleBodyOverflow("hidden")
              setShowStation(true)
            }}
            readOnly
            className={`form-item-input ${isError ? "form-item-input-error" : ""}`}
            type="text"
            placeholder={label}
            value={value}
          />
        </div>
        {isError ? <p className="form-item-input-text-error">Vui lòng nhập trường này</p> : null}
      </div>

      {showStation ? (
        <Modal
          onClose={() => {
            toggleBodyOverflow("unset")
            setShowStation(false)
          }}
          title={type === "from" ? "Chọn trạm đến" : "Chọn trạm đi"}
        >
          <Station
            onChooseStation={(val) => {
              if (prevProvinceId === val.province_id) {
                dispatch(notify("Vui lòng chọn địa điểm khác với tỉnh trước đó", "error"))
                return
              }
              toggleBodyOverflow("unset")
              setShowStation(false)
              onChange(val)
            }}
            defaultValue={defaultValue}
          />
        </Modal>
      ) : null}
    </>
  )
}
