import { InputCheckbox } from "./inputCheckbox"
import { InputRadio } from "./inputRadio"

interface RouteItemProps {
  isChecked: boolean
  onCheck: Function
  title: string
  type?: "radio" | "checkbox"
}

export const ItemSelect = ({
  isChecked,
  onCheck,
  title,
  type = "radio",
}: RouteItemProps) => {
  return (
    <div onClick={() => onCheck()} className="item__select px-24">
      <div className="item__select-info">
        <p className="item__select-info-title">{title}</p>
      </div>

      <div className="item__select-action">
        {type === "radio" ? (
          <InputRadio isChecked={isChecked} onCheck={onCheck} />
        ) : (
          <InputCheckbox
            type="circle"
            isChecked={isChecked}
            onCheck={onCheck}
          />
        )}
      </div>
    </div>
  )
}
