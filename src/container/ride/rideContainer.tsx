import { arrowRightIcon } from "@/assets"
import { HEADER_HEIGHT } from "@/helper"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { animated, useSpring } from "react-spring"
import { useScrollTop } from "shared/hook"

interface RideHeaderProps {
  heading: string
  showBackBtn?: boolean
  showForwardBtn?: boolean
  onRedirectToNext?: Function
  onClickBackBtn?: Function
}

interface RideContainerProps extends RideHeaderProps {
  children: ReactNode
  showPadding?: boolean
  showBtn?: boolean
  onClick?: Function
  btnLabel?: string
}

export const RideHeader = ({
  heading,
  showBackBtn = true,
  showForwardBtn = false,
  onRedirectToNext,
  onClickBackBtn,
}: RideHeaderProps) => {
  const router = useRouter()
  const height = useScrollTop()

  return (
    <header
      className={`ride__header ${
        height > HEADER_HEIGHT ? "ride__header-active" : ""
      }`}
    >
      <div className="ride__header-inner header-container px-24">
        <button
          onClick={() => {
            onClickBackBtn ? onClickBackBtn() : router.back()
          }}
          className={`btn-reset ride__header-back ${
            showBackBtn ? "show" : "hidden"
          }`}
        >
          {arrowRightIcon()}
        </button>

        <h1 className="ride__header-heading">{heading}</h1>

        <button
          onClick={() => onRedirectToNext && onRedirectToNext()}
          className={`btn-reset ride__header-forward ${
            showForwardBtn ? "show" : "hidden"
          }`}
        >
          {arrowRightIcon()}
        </button>
      </div>
    </header>
  )
}

export const RideContainer = ({
  children,
  heading,
  showBackBtn = true,
  showForwardBtn = false,
  onRedirectToNext,
  showPadding = true,
  onClick,
  showBtn,
  btnLabel = "Tiếp theo",
  onClickBackBtn,
}: RideContainerProps) => {
  const transition = useSpring({
    from: { opacity: 0 },
    to: {
      opacity: 1,
    },
  })

  return (
    <animated.section style={transition} className="ride__container">
      <RideHeader
        heading={heading}
        showBackBtn={showBackBtn}
        onClickBackBtn={onClickBackBtn}
        showForwardBtn={showForwardBtn}
        onRedirectToNext={onRedirectToNext}
      />

      <div
        className={`ride__container-body ${
          showPadding ? "ride__container-body-padding" : ""
        }`}
      >
        <div className="ride__container-body-child">{children}</div>

        {showBtn ? (
          <div className="ride__container-footer">
            <button
              onClick={() => onClick && onClick()}
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
