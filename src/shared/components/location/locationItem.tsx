import { arrowRightIcon } from "@/assets"
import { TiLocation } from "react-icons/ti"

type GoogleMapLocation = google.maps.places.AutocompletePrediction

interface LocationItemProps {
  location: GoogleMapLocation
  onSelect?: (value: GoogleMapLocation) => void
  isLoading?: boolean
}

export const LocationItem = ({
  location,
  onSelect,
  isLoading,
}: LocationItemProps) => {
  if (isLoading)
    return (
      <div className="location__item-loading">
        <div className="location__item-loading-top"></div>
        <div className="location__item-loading-bottom"></div>
      </div>
    )

  return (
    <div
      onClick={() => onSelect && onSelect(location)}
      className="location__item px-12"
    >
      <div className="location__item-inner">
        <TiLocation />
        <p className="location__item-desc">{location.description}</p>
      </div>

      <span className="btn-reset location__item-icon">{arrowRightIcon()}</span>
    </div>
  )
}
