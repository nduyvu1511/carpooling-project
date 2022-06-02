import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

export const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC7YLFeMoQfNoFg12e7R1waHWoJlmWWuvw",
    libraries: ["places"],
  })

  if (!isLoaded) return <div className="">Loading...</div>

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 10.826758, lng: 106.602697 }}
      mapContainerClassName="map-container"
      onClick={(e) => console.log(e)}
    ></GoogleMap>
  )
}
