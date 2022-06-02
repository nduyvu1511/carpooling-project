import { arrowRightIcon, closeIcon } from "@/assets"
import { PRIMARY_COLOR, toggleHTMLOverflow } from "@/helper"
import { ReactNode, useEffect } from "react"
import { useSpring, animated } from "react-spring"

interface ModalProps {
  mainChildren: ReactNode
  headerChildren?: ReactNode
  onClose: Function
  className?: string
  zIndex?: number
  view?: "large" | "small"
}

export const Modal = ({
  mainChildren,
  headerChildren,
  onClose,
  className = "",
  zIndex = 2000,
  view = "large",
}: ModalProps) => {
  const props = useSpring({
    from: { opacity: 0, transform: "translateY(100%)" },
    to: { opacity: 1, transform: "translateY(0)" },
  })

  useEffect(() => {
    toggleHTMLOverflow("hidden")
    return () => {
      toggleHTMLOverflow("unset")
    }
  }, [])

  return (
    <animated.div style={{ ...props, zIndex }} className={`modal ${className}`}>
      {view === "large" ? (
        <>
          <header className="modal-header">
            {headerChildren ? (
              <>
                <button
                  onClick={() => onClose()}
                  className="btn-reset modal-header-btn"
                >
                  {arrowRightIcon()}
                </button>
                <div className="modal-header-child">{headerChildren}</div>
              </>
            ) : null}
          </header>

          <div className="modal-body">{mainChildren}</div>
        </>
      ) : (
        <div className="modal-small content-container">
          <header className="modal-small-header px-24">
            {headerChildren || null}

            <button
              onClick={() => onClose()}
              className="btn-reset modal-small-close-btn"
            >
              {closeIcon(24, PRIMARY_COLOR)}
            </button>
          </header>

          <div className="modal-small-body">{mainChildren}</div>
        </div>
      )}
    </animated.div>
  )
}
