interface InputCheck {
  onCheck: Function
  isChecked: boolean
}

export const InputRadio = ({ onCheck, isChecked }: InputCheck) => {
  return (
    <span
      onClick={(e) => {
        e.stopPropagation()
        onCheck && onCheck()
      }}
      className={`input__radio ${isChecked ? `input__radio-active` : ""}`}
    ></span>
  )
}
