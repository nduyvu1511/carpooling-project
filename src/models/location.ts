import { CountryId, DistrictId, ProvinceId, WardId } from "./address"

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

export interface StationRes {
  station_name: string
  station_id: number
  station_image: {
    id: number
    url: string
  }
  latitude: string
  longitude: string
  country_id: CountryId
  province_id: ProvinceId
  district_id: DistrictId
  ward_id: WardId
  street: string
}
