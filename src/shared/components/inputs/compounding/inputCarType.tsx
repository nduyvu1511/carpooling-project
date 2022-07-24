import { NumberSeatOptionModel, OptionModel } from "@/models"
import Select from "react-select"

interface InputCarTypeProps {
  label: string
  onChange: (params: OptionModel) => void
  isError?: boolean
  value: OptionModel
  options: NumberSeatOptionModel[]
  onBlur: any
}

export const InputCarType = ({
  label,
  onChange,
  options,
  value,
  isError,
  onBlur,
}: InputCarTypeProps) => {
  return (
    <div className="">
      <label htmlFor="car_id" className="form-label">
        Loại xe
      </label>

      <div className="form-select">
        <Select
          value={value}
          placeholder="loại xe"
          options={options}
          onChange={(val) => {
            val?.value && onChange(val)
          }}
          onBlur={onBlur}
          id={"car_id"}
          className={`${isError ? "form-item-select-error" : ""}`}
        />
      </div>

      {isError ? <p className="form-item-input-text-error">Vui lòng nhập trường này</p> : null}
    </div>
  )
}
