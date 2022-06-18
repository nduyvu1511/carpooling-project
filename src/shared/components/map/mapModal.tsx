import { closeIcon } from "@/assets"
import { RootState } from "@/core/store"
import { setOpenMapModal } from "@/modules"
import { useDispatch, useSelector } from "react-redux"
import { animated, useTransition } from "react-spring"
import { Map } from "./map"

export const MapModal = () => {
  const dispatch = useDispatch()
  const { isOpenMapModal } = useSelector((state: RootState) => state.location)

  return isOpenMapModal ? (
    <div
      className="map-modal"
      style={{
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
            className="btn-reset map__modal-close"
          >
            {closeIcon(30)}
          </button>
        </div>
        <div className="map__modal-body">
          <Map />
        </div>
      </div>
    </div>
  ) : null
}
