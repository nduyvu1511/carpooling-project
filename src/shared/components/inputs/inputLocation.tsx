import { FromLocation } from "@/models"
import React, { useState } from "react"
import { Control } from "react-hook-form"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { Map } from "../map"

interface InputLocationProps {
  label: string
  onChooseLocation: (params: FromLocation) => void
  control: Control<any, any>
  disabled?: boolean
  isError?: boolean
  name: string
  defaultValue?: FromLocation
}

export const InputLocation = ({
  control,
  label,
  onChooseLocation,
  disabled = false,
  isError = false,
  name,
  defaultValue,
}: InputLocationProps) => {
  const [showMap, setShowMap] = useState<boolean>(false)
  const [location, setLocation] = useState<FromLocation | undefined>(
    defaultValue
  )

  return (
    <>
      <div className="rides__form-location-item">
        <label className="form-item-label">
          <HiOutlineLocationMarker />
          Địa điểm
        </label>
        <div className="rides__form-location-input">
          <span className="rides__form-location-input-type">Đi:</span>

          <input
            onClick={() => !disabled && setShowMap(true)}
            readOnly
            className={`form-item-input ${
              isError ? "form-item-input-error" : ""
            }`}
            id={name}
            type="text"
            placeholder="Điểm đi"
            value={defaultValue?.address}
          />
        </div>
        {isError ? (
          <p className="form-item-input-text-error">Vui lòng nhập trường này</p>
        ) : null}
      </div>

      {showMap ? <Map /> : null}
    </>
  )
}

export default InputLocation
