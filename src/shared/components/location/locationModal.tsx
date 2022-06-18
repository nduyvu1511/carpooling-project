import { RootState } from "@/core/store"
import { toggleBodyOverflow } from "@/helper"
import {
  CompoundingType,
  FromLocation,
  LocationType,
  StationPickUpParams,
} from "@/models"
import { setOpenLocationFormModal } from "@/modules"
import { useEffect } from "react"
import { CgClose } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import { LocationForm } from "."

interface LocationModalProps {
  title: string
  onChooseLocation: (params: FromLocation) => void
  onChooseStation: (params: StationPickUpParams) => void
  locationType: LocationType
  compoundingType: CompoundingType
}

export const LocationModal = ({
  title,
  onChooseLocation,
  onChooseStation,
  locationType,
  compoundingType,
}: LocationModalProps) => {
  const dispatch = useDispatch()
  const {
    from_pick_up_station_id,
    from_province_id,
    to_pick_up_station_id,
    to_province_id,
    is_picking_up_from_start,
  } = useSelector((state: RootState) => state.ridesForm)

  useEffect(() => {
    toggleBodyOverflow("hidden")
    return () => {
      toggleBodyOverflow("unset")
    }
  }, [])

  const closeModal = () => {
    dispatch(setOpenLocationFormModal(undefined))
  }

  return (
    <section className="location__modal">
      <div className="location__modal-content">
        <header className="location__modal-header">
          <h1 className="location__modal-header-title">{title}</h1>
          <button
            onClick={closeModal}
            className="btn-reset location__modal-header-close"
          >
            <CgClose />
          </button>
        </header>
        <div className="location__modal-body">
          <LocationForm
            isPickingUpFromStart={!!is_picking_up_from_start}
            onChooseLocation={(data) => {
              onChooseLocation(data)
            }}
            onChooseStation={(data) => {
              onChooseStation(data)
            }}
            showMap={compoundingType !== "compounding"}
            onCloseModal={closeModal}
            locationType={locationType}
            defaultLocation={
              locationType === "from_location"
                ? from_province_id
                : to_province_id
            }
            defaultStation={
              compoundingType === "compounding"
                ? locationType === "from_location"
                  ? from_pick_up_station_id
                  : to_pick_up_station_id
                : to_pick_up_station_id
            }
          />
        </div>
      </div>

      <div className="location__modal-overlay"></div>
    </section>
  )
}

export default LocationModal
