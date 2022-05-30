import { closeIcon } from "@/assets"
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useRef,
} from "react"
import { useDebounce, useInputText } from "shared/hook"

interface InputProps {
  onChange: (value: string) => void
  onFocus?: Function
  attributes?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
}

export const Input = ({
  onChange: onChangeProps,
  onFocus,
  attributes,
}: InputProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const { onChange, value, clearValue } = useInputText()
  const _value = useDebounce(value, 400)

  useEffect(() => {
    if (!_value) return
    onChangeProps && onChangeProps(_value)
  }, [_value])

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <div className="input-common">
      <input
        ref={ref}
        onFocus={() => {
          onFocus && onFocus()
        }}
        type="text"
        onChange={onChange}
        value={value}
        {...attributes}
      />
      {value ? (
        <button
          onClick={() => {
            clearValue()
            onChangeProps && onChangeProps("")
          }}
          className="btn-reset input-close-btn"
        >
          {closeIcon()}
        </button>
      ) : null}
    </div>
  )
}
