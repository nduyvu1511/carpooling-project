export interface locationHistory {
  longitude: number
  latitude: number
  name: string
  place_id: string
}

export interface LatlngAddress {
  address: string
  lng: number
  lat: number
}

export interface LocationHistory {
  from: LatlngAddress
  to: LatlngAddress
}

export interface LocationHistorySlice {
  searchHistory: LocationSearchHistory[]
  history: LocationHistory[]
}

export interface LatLng {
  lat: number
  lng: number
}

export interface LocationLatLng {
  lng: number
  lat: number
  address: string
}

export interface FromLocation extends LocationLatLng {
  province_id: number
}

export interface LocationSearchHistory extends FromLocation {
  id: string
}

export type LocationType = "from_location" | "to_location"
