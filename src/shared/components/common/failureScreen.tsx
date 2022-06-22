import { notifyIcon } from "@/assets"
import { toggleBodyOverflow } from "@/helper"
import { useEffect } from "react"
import { useSpring, animated } from "react-spring"

interface FailureScreenProps {
  title: string
  onClick: Function
  btnLabel?: string
}

export const FailureScreen = ({
  onClick,
  title,
  btnLabel = "Xem chi tiết",
}: FailureScreenProps) => {
  const transition = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  })

  useEffect(() => {
    toggleBodyOverflow("hidden")

    return () => {
      toggleBodyOverflow("unset")
    }
  }, [])

  return (
    <animated.section
      style={transition}
      className="success__screen failure__screen"
    >
      <div className="container success__screen-inner">
        <div className="success__screen-inner-left">{notifyIcon}</div>
        <div className="success__screen-inner-right">
          <h1>{title}</h1>
          <button onClick={() => onClick && onClick()} className="btn-primary">
            {btnLabel}
          </button>
        </div>
      </div>
    </animated.section>
  )
}
