import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

export const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC65jtDXmns-eBPyN99KitIkrryTCnLWF4",
  })

  if (!isLoaded) return <div className="">Loading...</div>

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 10.826758, lng: 106.602697 }}
      mapContainerClassName="map-container"
    ></GoogleMap>
  )
}
