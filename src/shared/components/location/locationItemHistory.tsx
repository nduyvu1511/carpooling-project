import { clockIcon } from "@/assets"
import { LocationSearchHistory } from "@/models"

interface LocationItemHistoryProps {
  location: LocationSearchHistory
  onSelect?: (location: LocationSearchHistory) => void
}

export const LocationItemHistory = ({
  location,
  onSelect,
}: LocationItemHistoryProps) => {
  return (
    <div
      onClick={() => onSelect && onSelect(location)}
      className="location-history__item"
    >
      {clockIcon(18)}
      <div className="location-history__item-content">
        <p className="location-history__item-content-name">
          {location.address}
        </p>
      </div>
    </div>
  )
}
