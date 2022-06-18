import { arrowRightIcon } from "@/assets"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { animated, useSpring } from "react-spring"

interface ScreenContainerProps {
  children: ReactNode
  heading: string
  onBackBtnClick?: Function
}

export const ScreenContainer = ({
  children,
  heading,
  onBackBtnClick,
}: ScreenContainerProps) => {
  const router = useRouter()
  const transition = useSpring({
    from: { opacity: 0 },
    to: {
      opacity: 1,
    },
  })

  return (
    <animated.section style={transition} className="screen__container">
      <header className="content-container px-24 screen__container-header">
        <button
          onClick={() => (!onBackBtnClick ? router.back() : onBackBtnClick())}
          className="btn-reset screen__container-header-btn"
        >
          {arrowRightIcon(30)}
        </button>
        <h3 className="screen__container-header-heading">{heading}</h3>
      </header>
      <div className="screen__container-body">{children}</div>
    </animated.section>
  )
}
