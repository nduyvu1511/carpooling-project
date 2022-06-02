import { ReactNode } from "react"
import { animated, useSpring } from "react-spring"

interface VehicleContainerProps {
  children: ReactNode
  heading?: string
  btnLabel?: string
  onBtnClick?: Function
}

export const VehicleContainer = ({
  children,
  heading,
  btnLabel,
  onBtnClick,
}: VehicleContainerProps) => {
  const transition = useSpring({
    from: { opacity: 0 },
    to: {
      opacity: 1,
    },
  })

  return (
    <animated.section style={transition} className="vehicle__container">
      <div className="vehicle__container-header">
        {heading ? <h1 className="page-heading">{heading}</h1> : null}
      </div>
      <div
        className={`content-container vehicle__container-body ${
          btnLabel ? "vehicle__container-body-padding" : ""
        }`}
      >
        {children}
        {btnLabel ? (
          <div className="vehicle__container-footer">
            <button
              onClick={() => onBtnClick && onBtnClick()}
              className="btn-primary"
            >
              {btnLabel}
            </button>
          </div>
        ) : null}
      </div>
    </animated.section>
  )
}
