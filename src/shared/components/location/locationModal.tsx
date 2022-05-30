import { RootState } from "@/core/store"
import { useSelector } from "react-redux"
import { animated, useTransition } from "react-spring"

const LocationModal = () => {
  const { isOpenModal } = useSelector((state: RootState) => state.location)

  const transition = useTransition(isOpenModal, {
    from: {
      opacity: 0,
      transform: "translateY(100%)",
    },
    enter: {
      opacity: 1,
      transform: "translateY(0%)",
    },
    leave: {
      opacity: 0,
      transform: "translateY(100%)",
    },
  })
  return (
    <>
      {transition((style, show) =>
        show ? (
          <animated.section
            className="location__modal"
            style={{
              ...style,
              position: "fixed",
              inset: 0,
              zIndex: 2000,
            }}
          >
            <div className=""></div>
          </animated.section>
        ) : null
      )}
    </>
  )
}

export default LocationModal
