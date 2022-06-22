import moment from "moment"
import React from "react"
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css"

interface InputDateTimeProps {
  isError?: boolean
  label: string
  onChange: (params: string) => void
  value?: string
  onBlur: any
}

export const InputDateTime = ({
  label,
  onBlur,
  onChange,
  value,
  isError,
}: InputDateTimeProps) => {
  const yesterday = moment().subtract(1, "day")
  const disablePastDt = (current: any) => {
    return current.isAfter(yesterday)
  }

  return (
    <div className="">
      <div
        className={`form-item-datetime ${
          isError ? "form-item-input-error" : ""
        }`}
      >
        <Datetime
          initialValue={value ? moment(value) : undefined}
          locale="vi"
          isValidDate={disablePastDt}
          onChange={(e: any) => {
            onChange(moment(new Date(e._d)).format("YYYY-MM-DD HH:MM:SS"))
          }}
        />
      </div>

      {isError ? (
        <p className="form-item-input-text-error">Vui lòng nhập trường này</p>
      ) : null}
    </div>
  )
}
