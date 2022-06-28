import { ProvinceId, StationId, StationPickUpParams } from "./address"
import { OptionModel } from "./common"
import { FromLocation } from "./location"
import { CarAccountType, GenderType, UserInfo } from "./user"
import { CarId } from "./vehicle"

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

export interface CreateOneWayCompoundingNoToken extends CreateCommonCompounding {}

export interface UpdateOneWayCompoundingCarParamsNoToken extends CreateOneWayCompoundingNoToken {
  compounding_car_customer_id: number
}

export interface UpdateOneWayCompoundingCarParams extends UpdateOneWayCompoundingCarParamsNoToken {
  token: string
}

export interface CreateOneWayCompounding extends CreateOneWayCompoundingNoToken {
  token: string
}

export interface CreateTwoWayCompoundingNoToken extends CreateOneWayCompoundingNoToken {
  is_a_day_tour: boolean
  hour_of_wait_time?: HourWaitTimeType | false
  expected_picking_up_date?: string | false
}

export interface CreateTwoWayCompoundingSubmitForm extends CreateTwoWayCompoundingNoToken {
  mode: "create" | "update"
}

export interface CreateCommonCompoundingForm {
  from_location: FromLocation
  to_location: FromLocation
  car_id: OptionModel
  note?: string
  expected_going_on_date: string
  distance: number
  is_checked_policy: boolean
}

export interface CreateOneWayCompoundingForm extends CreateCommonCompoundingForm {
  price?: number
}

export interface CreateTwoWayCompoundingForm extends CreateCommonCompoundingForm {
  is_a_day_tour: boolean
  hour_of_wait_time?: OptionModel
  expected_picking_up_date?: string
  price?: number
}

export interface CreateCarpoolingCompoundingForm {
  car_id: OptionModel & { number_seat: number }
  // is_picking_up_from_start: boolean
  price_per_passenger?: number
  number_seat: OptionModel
  from_station: StationId
  to_station: StationId
  from_location?: FromLocation
  note?: string
  expected_going_on_date: string
  distance: number
  is_checked_policy: boolean
}

export interface CreateTwoWayCompounding extends CreateTwoWayCompoundingNoToken {
  token: string
}

export interface UpdateTwoWayCompoundingCarParamsNoToken extends CreateTwoWayCompoundingNoToken {
  compounding_car_customer_id: number
}

export interface UpdateTwoWayCompoundingCar extends UpdateTwoWayCompoundingCarParamsNoToken {
  token: string
}

export interface CreateCarpoolCompoundingNoToken extends CreateCommonCompounding {
  from_pick_up_station_id: number
  to_pick_up_station_id: number
  number_seat: number
  is_picking_up_from_start: boolean
  price_per_passenger?: number
  compounding_car_id?: number
}

export interface UpdateCarpoolCompoundingNoToken extends CreateCarpoolCompoundingNoToken {
  compounding_car_customer_id: number
}

export interface UpdateCarpoolCompounding extends UpdateCarpoolCompoundingNoToken {
  token: string
}

export interface CreateCarpoolCompounding extends CreateCarpoolCompoundingNoToken {
  token: string
}

export interface UpdateCompoundingCarCustomer {
  compounding_car_customer_id: number
  token: string
}

export interface GetDetailCompoundingCarCustomer {
  compounding_car_customer_id?: number
  compounding_customer_id?: number
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

export interface CreateCompoundingCarParams extends CreateCompoundingCarNoTokenParams {
  token: string
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

export interface CompoundingCarRes {
  compounding_car_id: number
  compounding_car_code: string
  compounding_car_name: string
  car_driver_id: CarDriverId
  compounding_type: CompoundingType
  from_province: ProvinceId
  to_province: ProvinceId
  expected_going_on_date: string
  expected_picking_up_date: string
  car: ActivityCarId
  quality_car: string
  number_seat_in_car: number
  number_available_seat: number
  state: CompoundingCarDriverState
  price_unit: {
    name: string
    price_unit: number
  }
  note: string
  second_remains: number
  compounding_car_customers: CompoundingCarCustomer[]
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
  payment_method: "cash" | "transfer" | false
  amount_due: number
  state: CompoundingCarCustomerState
  compounding_type: CompoundingType
  expected_going_on_date: string
  expected_picking_up_date: string
  car: CarId
  car_driver_id: CarDriverId
  distance: number
  note: string
  hour_of_wait_time: HourWaitTimeType
  is_a_day_tour: boolean
  second_remains: number
  number_available_seat: number
}

export interface PartnerCompoundingCar {
  partner_id: number
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

export interface CreatePaymentParams {
  token: string
  acquirer_id: number
  compounding_car_customer_id: number
  returned_url: string
}

export interface CreatePaymentDriverParams {
  token: string
  acquirer_id: number
  compounding_car_id: number
  returned_url: string
  payment_id: number
}

export interface ConfirmTransactionParams {
  token: string
  sale_order_id: number
}

export interface CompoundingListDriverParams {
  from_province_id?: number
  to_province_id?: number
  car_id?: number
  from_expected_going_on_date?: string
  to_expected_going_on_date?: string
  compounding_type?: CompoundingType
  sort_by_lowest_price?: boolean
  sort_by_highest_price?: boolean
  sort_by_distance?: boolean
  limit?: number
  offset?: number
  current_latitude?: string
  current_longitude?: string
}

export interface GetCompoundingListForDriver extends CompoundingListDriverParams {
  token: string
}

export interface PaymentRes {
  acquirer_id: number
  name: string
  provider: string
  state: "enabled"
  image: string
}

export interface CreatePaymentRes {
  vnpay_payment_url: string
  vnpay_code: string
}

export type CompoundingOrderField =
  | "sort_by_lowest_price"
  | "sort_by_highest_price"
  | "sort_by_distance"

export interface CompoundingFilterFormParams {
  order_by?: CompoundingOrderField
  from_province_id?: number
  to_province_id?: number
  car_id?: number
  from_expected_going_on_date?: string
  to_expected_going_on_date?: string
  compounding_type?: CompoundingType
  current_latitude?: string
  current_longitude?: string
}

export interface CompoundingCarCustomerFilterForm extends CompoundingFilterFormParams {
  number_seat?: number
}

export interface GetCompoundingCarCustomerList {
  token: string
  from_province_id?: number
  to_province_id?: number
  car_id?: number
  number_seat?: number
  from_expected_going_on_date?: string
  to_expected_going_on_date?: string
  sort_by_lowest_price?: boolean
  sort_by_highest_price?: boolean
  sort_by_distance?: boolean
  current_latitude?: string
  current_longitude?: string
  limit?: number
  offset?: number
}

export interface CompoundingDriverDepositRes {
  payment_id: number
  payment_type: string
  partner_type: string
  partner_id: UserInfo
  amount_total: number
  state: "draft" | "posted" | "cancel"
  date: string
  compounding_car: {
    compounding_car_id: number
    compounding_car_name: string
  }
}

export interface RidesDraftParams {
  token: string
  limit?: number
  offset?: number
}

export interface CreateCompoundinCarDriver {
  token: string
  compounding_type: CompoundingType
  from_province_id: number
  to_province_id: number
  expected_going_on_date: string
  car_id: number
  note?: string
  from_longitude: string
  from_latitude: string
  to_longitude: string
  to_latitude: string
}

export interface UpdateCompoundingCarDriver extends CreateCompoundinCarDriver {
  compounding_car_id: number
}

export type CompoundingCarDriverState =
  | "draft"
  | "waiting"
  | "waiting_deposit"
  | "confirm_deposit"
  | "confirm"
  | "start_running"
  | "stop_picking"
  | "done"
  | "cancel"

export type CompoundingCarCustomerState =
  | "draft"
  | "confirm"
  | "deposit"
  | "waiting"
  | "assign"
  | "in_process"
  | "done"
  | "customer_pay"
  | "confirm_paid"
  | "cancel"

export interface GetCompoundingCarCustomerStateParams {
  token: string
  compounding_car_state?: CompoundingCarCustomerState[]
  limit?: number
  offset?: number
}

export interface GetCompoundingCarDriverStateParams {
  token: string
  compounding_car_state?: CompoundingCarDriverState[]
  limit?: number
  offset?: number
}

export interface ActivityCarId extends CarId {
  icon: {
    icon_id: string
    icon_url: string
  }
}

export interface CustomerActivityItem {
  compounding_car_id: number
  compounding_car_name: string
  compounding_car_customer_id: number
  compounding_type: CompoundingType
  expected_going_on_date: string
  expected_picking_up_date: string
  car: ActivityCarId
  from_province: ProvinceId
  from_pick_up_station: StationPickUpParams
  is_picking_up_from_start: boolean
  from_address: string
  from_longitude: string
  from_latitude: string
  to_province: ProvinceId
  to_pick_up_station: StationPickUpParams
  is_taking_to_final_destination: boolean
  to_address: string
  to_longitude: string
  to_latitude: string
  is_a_day_tour: string
  hour_of_wait_time: string
  distance: number
  number_seat: number
  amount_total: number
  down_payment: number
  amount_due: number
  state: CompoundingCarCustomerState
  second_remains: number
}

export interface DepositCompoundingCarDriverRes {
  payment_id: number
  payment_type: string
  partner_type: string
  partner_id: UserInfo
  amount_total: number
  state: "draft" | "confirm_depost" | string
  date: string
  compounding_car: {
    compounding_car_id: number
    compounding_car_name: string
  }
  second_remains: number
}

export interface DepositCompoundingCarDriverFailureRes {
  message: string
  data: DepositCompoundingCarDriverRes[]
}

export interface DriverActivityItem {
  compounding_car_id: number
  compounding_car_name: string
  compounding_car_customer_id: number
  compounding_type: CompoundingType
  expected_going_on_date: string
  expected_picking_up_date: string
  car: ActivityCarId
  from_province: ProvinceId
  from_pick_up_station: StationPickUpParams
  is_picking_up_from_start: boolean
  from_address: string
  from_longitude: string
  from_latitude: string
  to_province: ProvinceId
  to_pick_up_station: StationPickUpParams
  is_taking_to_final_destination: boolean
  to_address: string
  to_longitude: string
  to_latitude: string
  is_a_day_tour: boolean
  hour_of_wait_time: string
  distance: number
  number_seat: number
  amount_total: number
  down_payment: number
  amount_due: number
  state: CompoundingCarDriverState
  second_remains: number
}

export interface GetDriverSchedulesParams {
  token: string
  offset?: number
  limit?: number
}

export interface DriverSchedule {
  compounding_car_id: number
  compounding_car_code: string
  compounding_car_name: string
  compounding_type: CompoundingType
  from_province: ProvinceId
  to_province: ProvinceId
  distance: 165
  start_going_on_date: string
  end_going_on_date: string
  start_picking_up_date: string
  end_picking_up_date: string
  car: ActivityCarId
  number_picked_seat: number
  amount_total: number
}

export interface CreatePaymentMethodParams {
  compounding_car_customer_id: number
  payment_method: "cash" | "transfer"
  token: string
}

export interface DriverConfirmCompoundingCarCustomerParams {
  token: string
  compounding_car_customer_id: number
  customer_id: number
}
