import { OptionModel } from "@/models"
import React from "react"
import { Control, Controller } from "react-hook-form"
import Select from "react-select"

interface InputSelectProps {
  control: Control
  options: OptionModel[]
  isError?: boolean
}

export const InputSelect = ({
  control,
  options,
  isError,
}: InputSelectProps) => {
  return (
    <Controller
      control={control}
      name={"car_id"}
      render={({ field: { onChange, onBlur } }) => (
        <Select
          placeholder="Chọn loại xe"
          options={options}
          onChange={(val) => val?.value && onChange(val.value)}
          onBlur={onBlur}
          id={"car_id"}
          className={`${isError ? "form-item-select-error" : ""}`}
        />
      )}
      rules={{ required: true }}
    />
  )
}
