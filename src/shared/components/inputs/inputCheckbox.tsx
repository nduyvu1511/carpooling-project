import { BsCheck2 } from "react-icons/bs"

interface InputCheck {
  onCheck: Function
  isChecked: boolean
  type?: "radio" | "checkbox"
}

export const InputCheckbox = ({
  onCheck,
  isChecked,
  type = "checkbox",
}: InputCheck) => {
  return (
    <span
      onClick={(e) => {
        e.stopPropagation()
        onCheck && onCheck()
      }}
      className={`input__${type} ${isChecked ? `input__${type}-active` : ""}`}
    >
      {isChecked ? <BsCheck2 /> : null}
    </span>
  )
}
