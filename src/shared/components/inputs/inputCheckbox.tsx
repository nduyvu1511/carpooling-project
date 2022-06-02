import { BsCheck2 } from "react-icons/bs"

interface InputCheck {
  onCheck: Function
  isChecked: boolean
  type?: "circle" | "square"
}

export const InputCheckbox = ({
  onCheck,
  isChecked,
  type = "square",
}: InputCheck) => {
  return (
    <span
      onClick={(e) => {
        e.stopPropagation()
        onCheck && onCheck()
      }}
      className={`input__checkbox input__checkbox-${type} ${
        isChecked ? `input__checkbox-active` : ""
      }`}
    >
      {isChecked ? <BsCheck2 /> : null}
    </span>
  )
}
