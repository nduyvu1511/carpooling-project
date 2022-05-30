import { closeIcon } from "@/assets"
import { RootState } from "@/core/store"
import { setOpenMapModal } from "@/modules"
import { useDispatch, useSelector } from "react-redux"
import { animated, useTransition } from "react-spring"
import { Map } from "./map"

export const MapModal = () => {
  const dispatch = useDispatch()
  const { isOpenMapModal } = useSelector((state: RootState) => state.location)
  const transition = useTransition(isOpenMapModal, {
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
          <animated.div
            className="map-modal"
            style={{
              ...style,
              position: "fixed",
              inset: 0,
              zIndex: 2000,
            }}
          >
            <div
              onKeyDown={(e) =>
                e.key === "Escape" ? dispatch(setOpenMapModal(false)) : null
              }
              className="map__modal"
            >
              <div className="map__modal-header">
                <button
                  onClick={() => dispatch(setOpenMapModal(false))}
                  className="btn-reset"
                >
                  {closeIcon(30)}
                </button>
              </div>
              <div className="map__modal-body">
                <Map />
              </div>
            </div>
          </animated.div>
        ) : null
      )}
    </>
  )
}
