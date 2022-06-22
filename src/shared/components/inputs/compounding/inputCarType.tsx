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
    <div className="input_car-type">
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

      {isError ? (
        <p className="form-item-input-text-error">Vui lòng nhập trường này</p>
      ) : null}
    </div>
  )
}
