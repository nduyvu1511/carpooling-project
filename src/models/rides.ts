import {
  CountryId,
  DistrictId,
  ProvinceId,
  StationPickUpParams,
  WardId,
} from "./address"
import { CarAccountType, GenderType } from "./user"
import { CarId, CarIdType } from "./vehicle"

export interface DepartureForm {
  date: string
  time: string
  quality: string
  numberOfSeats: string
  vehicleType: string
  waitingTime: string
}

export type DepartureFormKey =
  | "date"
  | "time"
  | "quality"
  | "numberOfSeats"
  | "vehicleType"
  | "waitingTime"

export type QualityCarType = "5_star" | "4_star" | "3_star"

export type RidesFormFieldKey =
  | "compounding_type"
  | "from_province_id"
  | "to_province_id"
  | "expected_going_on_date"
  | "car_id"
  | "from_pick_up_station_id"
  | "to_pick_up_station_id"
  | "expected_picking_up_date"
  | "quality_car"
  | "number_seat"
  | "hour_of_wait_time"
  | "is_a_day_tour"
  | "check_policy"
  | "note"

export type CompoundingType = "one_way" | "two_way" | "compounding"

export interface CreateCompoundingCarNoTokenParams {
  compounding_type: CompoundingType
  from_province_id: number
  to_province_id: number
  expected_going_on_date: string
  car_id: number
  from_pick_up_station_id: number
  to_pick_up_station_id: number
  expected_picking_up_date: string
  quality_car?: QualityCarType
  number_seat: number
  is_a_day_tour: boolean
  hour_of_wait_time: string
  check_policy: boolean
  note?: string
  distance: number
}

export interface CreateCompoundingDefaultValues {
  compounding_type: CompoundingType | undefined
  from_province_id: number | undefined
  to_province_id: number | undefined
  expected_going_on_date: string | undefined
  car_id: number | undefined
  from_pick_up_station_id: number | undefined
  to_pick_up_station_id: number | undefined
  expected_picking_up_date: string | undefined
  quality_car?: QualityCarType | undefined
  number_seat: number | undefined
  is_a_day_tour: boolean | undefined
  hour_of_wait_time: string | undefined
  check_policy: boolean | undefined
  note?: string | undefined
}

export interface FromLocationRidesForm {
  from_address: string
  from_latitude: string
  from_longitude: string
}

export interface ToLocationRidesForm {
  to_address: string
  to_latitude: string
  to_longitude: string
}

export interface CreateCommonCompounding {
  compounding_type: CompoundingType
  from_province_id: number
  to_province_id: number
  car_id: number
  note?: string
  from_address: string
  to_address: string
  from_longitude: string
  from_latitude: string
  to_latitude: string
  to_longitude: string
  expected_going_on_date: string
  distance: number
}

export interface CreateExistedCarpoolingCompoundingCarNoToken {
  compounding_car_id: string
  from_pick_up_station_id: string
  is_picking_up_from_start: string
  to_pick_up_station_id: string
}

export interface CreateExistedCarpoolingCompoundingCar
  extends CreateExistedCarpoolingCompoundingCarNoToken {
  token: string
}

export interface CreateOneWayCompoundingNoToken
  extends CreateCommonCompounding {}

export interface UpdateOneWayCompoundingCarParamsNoToken
  extends CreateOneWayCompoundingNoToken {
  compounding_car_customer_id: number
}

export interface UpdateOneWayCompoundingCarParams
  extends UpdateOneWayCompoundingCarParamsNoToken {
  token: string
}

export interface CreateOneWayCompounding
  extends CreateOneWayCompoundingNoToken {
  token: string
}

export interface CreateTwoWayCompoundingNoToken
  extends CreateOneWayCompoundingNoToken {
  is_a_day_tour: boolean
  hour_of_wait_time?: HourWaitTimeType | false
  expected_picking_up_date?: string | false
}

export interface CreateTwoWayCompounding
  extends CreateTwoWayCompoundingNoToken {
  token: string
}

export interface UpdateTwoWayCompoundingCarParamsNoToken
  extends CreateTwoWayCompoundingNoToken {
  compounding_car_customer_id: number
}

export interface UpdateTwoWayCompoundingCar
  extends UpdateTwoWayCompoundingCarParamsNoToken {
  token: string
}

export interface CreateCarpoolCompoundingNoToken
  extends CreateCommonCompounding {
  from_pick_up_station_id: number
  to_pick_up_station_id: number
  number_seat: number
  distance: number
  is_picking_up_from_start: boolean
}

export interface UpdateCarpoolCompoundingNoToken
  extends CreateCarpoolCompoundingNoToken {
  compounding_car_customer_id: number
}

export interface UpdateCarpoolCompounding
  extends UpdateCarpoolCompoundingNoToken {
  token: string
}

export interface CreateCarpoolCompounding
  extends CreateCarpoolCompoundingNoToken {
  token: string
}

export interface UpdateCompoundingCarCustomer {
  compounding_car_customer_id: number
  token: string
}

export type UpdateCompoundingCar = (
  | UpdateOneWayCompoundingCarParams
  | UpdateTwoWayCompoundingCar
  | UpdateCarpoolCompounding
) & { compounding_car_customer_id: number }

export type HourWaitTimeType =
  | "01_hour"
  | "02_hour"
  | "03_hour"
  | "04_hour"
  | "05_hour"
  | "06_hour"
  | "07_hour"
  | "08_hour"
  | "09_hour"
  | "10_hour"
  | "11_hour"
  | "12_hour"

export interface CreateCompoundingCarParams
  extends CreateCompoundingCarNoTokenParams {
  token: string
}

export interface GetCompoundingCarParams {
  token: string
  from_province_id: number
  to_province_id: number
  car_id: number
  number_seat: number
  expected_going_on_date: string
  limit?: number
  offset?: number
}

export interface GetDetailCompounding {
  token: string
  compounding_car_id: number
}

export interface GetDetailCompoundingCustomer {
  token: string
  compounding_car_customer_id: number
}

export interface ConfirmCompoundingCar {
  token: string
  compounding_car_customer_id: number
}

export type RidesKeyType = "compounding_car_id"

export interface CarDriverId {
  partner_name: string
  avatar_url: string
  car_account_type: CarAccountType
  gender: string
  date_of_birth: string
  description: string
  car_information: any[]
}

export interface PriceUnit {
  name: string
  price_unit: number
}

export type CreateCompoundingParams =
  | CreateCarpoolCompoundingNoToken
  | CreateTwoWayCompoundingNoToken
  | CreateOneWayCompoundingNoToken

export type CreateCompoundingCarCustomerParams = CreateCompoundingParams & {
  token: string
  compounding_car_id: number
}

export interface CreateCompoundingCarRes extends CompoundingCarCustomer {}

export interface CompoundingCar {
  compounding_car_id: number
  compounding_car_code: boolean
  compounding_car_name: string
  car_driver_id: CarDriverId
  compounding_type: CompoundingType
  from_province: ProvinceId
  from_pick_up_station: StationPickUpParams
  to_province: ProvinceId
  to_pick_up_station: StationPickUpParams
  expected_going_on_date: string
  expected_picking_up_date: boolean
  car: CarId
  quality_car: QualityCarType
  number_seat_in_car: number
  number_available_seat: number
  price_unit: {
    name: string
    price_unit: number
  }
  state: string
}

export interface CompoundingCarCustomer {
  compounding_car_id: number
  compounding_car_customer_id: number
  from_province: ProvinceId
  from_pick_up_station: StationPickUpParams
  is_picking_up_from_start: boolean
  from_address: string
  from_longitude: string
  from_latitude: string
  to_province: ProvinceId
  to_pick_up_station: StationPickUpParams
  is_taking_to_final_destination: false
  to_address: string
  to_longitude: string
  to_latitude: string
  partner: PartnerCompoundingCar
  number_seat: number
  fee_final_destination: number
  promotion: string
  sale_order_id: SaleOrderCompoundingCar
  amount_total: number
  down_payment: number
  amount_due: number
  state: string
  compounding_type: CompoundingType
  expected_going_on_date: string
  expected_picking_up_date: string
  car: CarId
  car_driver_id: CarDriverId
  distance: number
  price_unit_id: number
  note: string
  hour_of_wait_time: HourWaitTimeType
  is_a_day_tour: boolean
  seconds_remains: number
}

export interface PartnerCompoundingCar {
  partner_name: string
  avatar_url: {
    image_id: number
    image_url: string
  }
  car_account_type: boolean
  gender: GenderType
  date_of_birth: string
  description: string
}

export interface SaleOrderCompoundingCar {
  sale_id: number
  sale_name: string
  partner: PartnerCompoundingCar
  order_line: CompoundingOrderLine[]
  amount_total: number
}

export interface OrderLineProductCompounding {
  product_id: number
  product_name: string
  representation_image: { image_id: string; image_url: string }
  image_urls: string[]
}

export interface CompoundingOrderLine {
  line_id: number
  line_name: string
  line_product: OrderLineProductCompounding
  line_product_uom: {
    uom_id: number
    uom_name: string
  }
  line_product_qty: number
}

export interface GetCompoundingCarCustomerList {
  token: string
  from_province_id: number
  to_province_id: number
  car_id: number
  number_seat: number
  expected_going_on_date: string
}
