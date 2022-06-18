interface ToggleProps {
  status: boolean
  onChange: Function
}

export const Toggle = ({ onChange, status }: ToggleProps) => {
  return (
    <span
      onClick={() => onChange()}
      className={`toggle ${status ? "toggle-active" : ""}`}
    ></span>
  )
}

export default Toggle
