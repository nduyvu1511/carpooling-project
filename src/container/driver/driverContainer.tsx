import { arrowRightIcon } from "@/assets"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { animated, useSpring } from "react-spring"

interface DriverContainerProps {
  children: ReactNode
  heading: string
  onAction?: Function
  btnLabel?: string
}

export const DriverContainer = ({
  children,
  heading,
  onAction,
  btnLabel,
}: DriverContainerProps) => {
  const router = useRouter()
  const transition = useSpring({
    from: { opacity: 0 },
    to: {
      opacity: 1,
    },
  })

  return (
    <animated.section style={transition} className="driver__container">
      <header className="content-container px-24 driver__container-header">
        <button
          onClick={() => router.back()}
          className="btn-reset driver__container-header-btn"
        >
          {arrowRightIcon(30)}
        </button>
        <h3 className="driver__container-header-heading">{heading}</h3>
      </header>
      <div className="driver__container-body">{children}</div>

      <div className="driver__container-footer">
        <button
          onClick={() => onAction && onAction()}
          className="btn-primary driver__container-footer-btn"
        >
          {btnLabel}
        </button>
      </div>
    </animated.section>
  )
}
