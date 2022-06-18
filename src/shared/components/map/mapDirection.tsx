import { GoogleMap } from "@react-google-maps/api"
import { Direction } from "react-static-google-map"

export const MapDirection = () => {
  return (
    <GoogleMap
      zoom={16}
      center={{ lng: 9.188576, lat: 105.177556 }}
      mapContainerClassName="map-container"
      options={{ disableDefaultUI: true, clickableIcons: false }}
    >
      <Direction
        destination={{
          lng: 9.188576,
          lat: 105.177556,
        }}
        origin={{
          lng: 10.829326,
          lat: 106.604024,
        }}
      />
    </GoogleMap>
  )
}
