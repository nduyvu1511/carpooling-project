import { cautionIcon, closeIcon, notifyIcon } from "@/assets"
import { PRIMARY_COLOR, toggleHTMLOverflow } from "@/helper"
import { useEffect } from "react"
import { useSpring, animated } from "react-spring"

interface AlertScreenProps {
  title: string
  onClose: Function
  btnLabel?: string
  onConfirm?: Function
}

export const AlertScreen = ({
  onClose,
  onConfirm,
  title,
  btnLabel = "Xóa",
}: AlertScreenProps) => {
  const transition = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(100%)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  })

  useEffect(() => {
    toggleHTMLOverflow("hidden")

    return () => {
      toggleHTMLOverflow("unset")
    }
  }, [])

  return (
    <animated.section style={transition} className="alert__screen">
      <div className="content-container px-24 alert__screen-inner">
        {cautionIcon}
        <h1 className="alert__screen-title">{title}</h1>
        <div className="alert__screen-actions">
          <button
            onClick={() => onClose && onClose()}
            className="alert__screen-actions-close-btn cursor-pointer"
          >
            {closeIcon(24, PRIMARY_COLOR)}
          </button>
          <button
            onClick={() => onConfirm && onConfirm()}
            className="btn-primary alert__screen-actions-confirm-btn"
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </animated.section>
  )
}
