import { QualityCarType } from "./rides"

export interface VehicleTypeParams {
  car_id: number
  name: string
  number_seat: number
}

export interface CarId extends VehicleTypeParams {}

export interface VehicleBrandRes {
  icon: {
    icon_id: number
    icon_url: string
  }
  brand_id: number
  brand_name: string
}

export interface GetPriceUnitParams {
  token: string
  from_province_id: number
  to_province_id: number
  car_id: number
  quality_car?: QualityCarType
}

export interface CarIdType {
  label: string
  value: number
  number_seat: number
}
