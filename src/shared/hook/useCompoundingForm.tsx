import {
  CARPOOLING_CAR_ID,
  CARPOOLING_DISTANCE,
  CARPOOLING_EXPECTED_GOING_ON_DATE,
  CARPOOLING_FROM_PICK_UP_STATION_ID,
  CARPOOLING_FROM_STATION,
  CARPOOLING_IS_CHECKED_POLICY,
  CARPOOLING_IS_PICKING_UP_FROM_START,
  CARPOOLING_NOTE,
  CARPOOLING_NUMBER_SEAT,
  CARPOOLING_PRICE_PER_PASSENGER,
  CARPOOLING_TO_PICK_UP_FROM_START,
  CARPOOLING_TO_STATION,
  COMPOUNDING_VNPAY_CODE,
  getFromLocalStorage,
  hoursBackList,
  ONE_WAY_CAR_ID,
  ONE_WAY_DISTANCE,
  ONE_WAY_EXPECTED_GOING_ON_DATE,
  ONE_WAY_FROM_LOCATION,
  ONE_WAY_IS_CHECKED_POLICY,
  ONE_WAY_NOTE,
  ONE_WAY_PRICE,
  ONE_WAY_TO_LOCATION,
  setToLocalStorage,
  TWO_WAY_CAR_ID,
  TWO_WAY_DISTANCE,
  TWO_WAY_EXPECTED_GOING_ON_DATE,
  TWO_WAY_EXPECTED_PICKING_UP_DATE,
  TWO_WAY_FROM_LOCATION,
  TWO_WAY_HOUR_OF_WAIT_TIME,
  TWO_WAY_IS_A_DAY_TOUR,
  TWO_WAY_IS_CHECKED_POLICY,
  TWO_WAY_NOTE,
  TWO_WAY_PRICE,
  TWO_WAY_TO_LOCATION,
} from "@/helper"
import {
  CompoundingCarRes,
  CreateCarpoolingCompoundingForm,
  CreateCommonCompoundingForm,
  CreateCompoundingCarRes,
  CreateOneWayCompoundingForm,
  CreateTwoWayCompoundingForm,
  OptionModel,
} from "@/models"
import { vehicleApi } from "@/services"
import { useMemo } from "react"
import { useFetchCarType } from "./useFetchCarType"
import { useToken } from "./useToken"

export interface CalcPriceParams {
  params: { to_province_id: number; from_province_id: number; car_id: number }
  onSuccess: (params: number) => void
  onErr?: Function
}

interface Res {
  carTypes: { value: number; label: string; number_seat: number }[]
  seats: (limit: number) => OptionModel[]
  clearOneWayCompoundingCar: Function
  clearTwoWayCompoundingCar: Function
  clearCarpoolingWayCompoundingCar: Function
  calcPriceFromProvinceIds: (params: CalcPriceParams) => void
  compoundingCarCustomerResToCarpoolingForm: (
    compoundingCar: CreateCompoundingCarRes
  ) => CreateCarpoolingCompoundingForm
  compoundingCarCustomerResToTwoWayForm: (
    compoundingCar: CreateCompoundingCarRes
  ) => CreateTwoWayCompoundingForm
  compoundingCarCustomerResToOneWayForm: (
    compoundingCar: CreateCompoundingCarRes
  ) => CreateOneWayCompoundingForm
  carpoolingCompoundingFormFromLocalStorage: () => CreateCarpoolingCompoundingForm
  twoWayCompoundingCarFormFromLocalStorage: () => CreateTwoWayCompoundingForm
  oneWayCompoundingCarFormFromLocalStorage: () => CreateOneWayCompoundingForm
  compoundingCarResToCarpoolingForm: (
    compoundingCar: CompoundingCarRes
  ) => CreateCarpoolingCompoundingForm
}

export const useCompoundingForm = (): Res => {
  const { vehicleTypeOptions: vehicleTypeOptionsProps } = useFetchCarType()
  const { token } = useToken()

  const seats = (limit: number) =>
    Array.from({
      length: limit - 1,
    }).map((item, index) => ({
      label: `${index + 1} hành khách`,
      value: index + 1 + "",
    }))

  const carTypes = useMemo(() => {
    return vehicleTypeOptionsProps()
  }, [vehicleTypeOptionsProps])

  const clearOneWayCompoundingCar = () => {
    setToLocalStorage(ONE_WAY_FROM_LOCATION, undefined)
    setToLocalStorage(ONE_WAY_DISTANCE, undefined)
    setToLocalStorage(ONE_WAY_TO_LOCATION, undefined)
    setToLocalStorage(ONE_WAY_CAR_ID, undefined)
    setToLocalStorage(ONE_WAY_EXPECTED_GOING_ON_DATE, undefined)
    setToLocalStorage(ONE_WAY_NOTE, undefined)
    setToLocalStorage(ONE_WAY_IS_CHECKED_POLICY, undefined)
    setToLocalStorage(ONE_WAY_PRICE, undefined)
  }

  const clearTwoWayCompoundingCar = () => {
    setToLocalStorage(TWO_WAY_FROM_LOCATION, undefined)
    setToLocalStorage(TWO_WAY_DISTANCE, undefined)
    setToLocalStorage(TWO_WAY_PRICE, undefined)
    setToLocalStorage(TWO_WAY_TO_LOCATION, undefined)
    setToLocalStorage(TWO_WAY_CAR_ID, undefined)
    setToLocalStorage(TWO_WAY_EXPECTED_GOING_ON_DATE, undefined)
    setToLocalStorage(TWO_WAY_NOTE, undefined)
    setToLocalStorage(TWO_WAY_IS_A_DAY_TOUR, undefined)
    setToLocalStorage(TWO_WAY_HOUR_OF_WAIT_TIME, undefined)
    setToLocalStorage(TWO_WAY_IS_CHECKED_POLICY, undefined)
    setToLocalStorage(TWO_WAY_EXPECTED_PICKING_UP_DATE, undefined)
  }

  const clearCarpoolingWayCompoundingCar = () => {
    setToLocalStorage(CARPOOLING_FROM_STATION, undefined)
    setToLocalStorage(CARPOOLING_FROM_PICK_UP_STATION_ID, undefined)
    setToLocalStorage(CARPOOLING_DISTANCE, undefined)
    setToLocalStorage(CARPOOLING_TO_STATION, undefined)
    setToLocalStorage(CARPOOLING_CAR_ID, undefined)
    setToLocalStorage(CARPOOLING_EXPECTED_GOING_ON_DATE, undefined)
    setToLocalStorage(CARPOOLING_NOTE, undefined)
    setToLocalStorage(CARPOOLING_IS_CHECKED_POLICY, undefined)
    setToLocalStorage(CARPOOLING_TO_PICK_UP_FROM_START, undefined)
    setToLocalStorage(CARPOOLING_PRICE_PER_PASSENGER, undefined)
    setToLocalStorage(CARPOOLING_NUMBER_SEAT, undefined)
    setToLocalStorage(CARPOOLING_IS_PICKING_UP_FROM_START, undefined)
    setToLocalStorage(COMPOUNDING_VNPAY_CODE, undefined)
  }

  const calcPriceFromProvinceIds = async (params: CalcPriceParams) => {
    const {
      params: { car_id, from_province_id, to_province_id },
      onSuccess,
      onErr,
    } = params
    try {
      const res: any = await vehicleApi.getCarPriceUnit({
        token,
        car_id,
        from_province_id,
        to_province_id,
      })

      if (!res?.result?.success) {
        onErr && onErr()
        return
      }
      const price = Number(res?.result?.data?.[0]?.price_unit)
      onSuccess(price || 0)
      setToLocalStorage(CARPOOLING_PRICE_PER_PASSENGER, price)
    } catch (error) {
      onErr && onErr()
      console.log(error)
    }
  }

  const compoundingCarCustomerResToCarpoolingForm = (
    compoundingCar: CreateCompoundingCarRes
  ): CreateCarpoolingCompoundingForm => {
    return {
      car_id: {
        label: compoundingCar.car.name,
        value: compoundingCar.car.car_id,
        number_seat: compoundingCar.car.number_seat,
      },
      distance: compoundingCar.distance,
      expected_going_on_date: compoundingCar.expected_going_on_date,
      from_location: {
        address: compoundingCar.from_address,
        lat: Number(compoundingCar.from_latitude),
        lng: Number(compoundingCar.from_longitude),
        province_id: Number(compoundingCar.from_province.province_id),
      },
      is_checked_policy: true,
      note: compoundingCar.note,
      price_per_passenger: compoundingCar.amount_total,
      from_station: {
        address: compoundingCar.from_address,
        lat: compoundingCar.from_pick_up_station.latitude + "",
        lng: compoundingCar.from_pick_up_station.longitude + "",
        province_name:
          compoundingCar.from_pick_up_station.province_id.province_name,
        province_id:
          compoundingCar.from_pick_up_station.province_id.province_id,
        station_id: compoundingCar.from_pick_up_station.station_id,
        station_name: compoundingCar.from_pick_up_station.station_name,
      },
      to_station: {
        address: compoundingCar.to_address,
        lat: compoundingCar.to_pick_up_station.latitude + "",
        lng: compoundingCar.to_pick_up_station.longitude + "",
        province_name:
          compoundingCar.to_pick_up_station.province_id.province_name,
        province_id: compoundingCar.to_pick_up_station.province_id.province_id,
        station_id: compoundingCar.to_pick_up_station.station_id,
        station_name: compoundingCar.to_pick_up_station.station_name,
      },
      is_picking_up_from_start: compoundingCar.is_picking_up_from_start,
      number_seat: {
        label: `${compoundingCar.number_seat} hành khách`,
        value: compoundingCar.number_seat,
      },
    }
  }

  const commonCompoundingParams = (
    compoundingCar: CreateCompoundingCarRes
  ): CreateCommonCompoundingForm => {
    return {
      car_id: {
        label: compoundingCar.car.name,
        value: compoundingCar.car.car_id,
      },
      distance: compoundingCar.distance,
      expected_going_on_date: compoundingCar.expected_going_on_date,
      from_location: {
        address: compoundingCar.from_address,
        lat: Number(compoundingCar.from_latitude),
        lng: Number(compoundingCar.from_longitude),
        province_id: Number(compoundingCar.from_province.province_id),
      },
      to_location: {
        address: compoundingCar.to_address,
        lat: Number(compoundingCar.to_latitude),
        lng: Number(compoundingCar.to_longitude),
        province_id: Number(compoundingCar.to_province.province_id),
      },
      is_checked_policy: true,
      note: compoundingCar.note,
    }
  }

  const compoundingCarCustomerResToTwoWayForm = (
    compoundingCar: CreateCompoundingCarRes
  ): CreateTwoWayCompoundingForm => {
    return {
      ...commonCompoundingParams(compoundingCar),
      is_a_day_tour: compoundingCar.is_a_day_tour,
      expected_picking_up_date: (compoundingCar?.expected_picking_up_date ||
        undefined) as string,
      hour_of_wait_time: hoursBackList.find(
        (item) => item.value === compoundingCar.hour_of_wait_time
      ),
    }
  }

  const compoundingCarCustomerResToOneWayForm = (
    compoundingCar: CreateCompoundingCarRes
  ): CreateOneWayCompoundingForm => {
    return {
      ...commonCompoundingParams(compoundingCar),
    }
  }

  const compoundingCarResToCarpoolingForm = (
    compoundingCar: CompoundingCarRes
  ): CreateCarpoolingCompoundingForm => ({
    from_station: {
      address: compoundingCar.from_address,
      lat: compoundingCar.from_latitude,
      lng: compoundingCar.from_longitude,
      province_id: compoundingCar.from_province.province_id,
      province_name: compoundingCar.from_province.province_name,
      station_id: compoundingCar.from_pick_up_station.station_id,
      station_name: compoundingCar.from_pick_up_station.station_name,
    },
    number_seat: {
      label: `${compoundingCar.number_available_seat} Hành khách`,
      value: compoundingCar.number_available_seat,
    },
    price_per_passenger: compoundingCar.price_unit.price_unit,
    is_picking_up_from_start: false,
    car_id: {
      label: compoundingCar.car.name,
      number_seat: compoundingCar.car.number_seat,
      value: compoundingCar.car.car_id,
    },
    expected_going_on_date: compoundingCar.expected_going_on_date,
    is_checked_policy: true,
    to_station: {
      address: compoundingCar.to_address,
      lat: compoundingCar.to_latitude,
      lng: compoundingCar.to_longitude,
      province_id: compoundingCar.to_province.province_id,
      province_name: compoundingCar.to_province.province_name,
      station_id: compoundingCar.to_pick_up_station.station_id,
      station_name: compoundingCar.to_pick_up_station.station_name,
    },
    note: compoundingCar.note,
    distance: compoundingCar.distance,
  })

  const carpoolingCompoundingFormFromLocalStorage =
    (): CreateCarpoolingCompoundingForm => ({
      car_id: getFromLocalStorage(CARPOOLING_CAR_ID),
      distance: getFromLocalStorage(CARPOOLING_DISTANCE),
      expected_going_on_date: getFromLocalStorage(
        CARPOOLING_EXPECTED_GOING_ON_DATE
      ),
      from_station: getFromLocalStorage(CARPOOLING_FROM_STATION),
      to_station: getFromLocalStorage(CARPOOLING_TO_STATION),
      is_checked_policy: getFromLocalStorage(CARPOOLING_IS_CHECKED_POLICY),
      note: getFromLocalStorage(CARPOOLING_NOTE),
      is_picking_up_from_start: getFromLocalStorage(
        CARPOOLING_IS_PICKING_UP_FROM_START
      ),
      number_seat: getFromLocalStorage(CARPOOLING_NUMBER_SEAT),
      price_per_passenger: getFromLocalStorage(CARPOOLING_PRICE_PER_PASSENGER),
    })

  const twoWayCompoundingCarFormFromLocalStorage =
    (): CreateTwoWayCompoundingForm => ({
      car_id: getFromLocalStorage(TWO_WAY_CAR_ID),
      distance: getFromLocalStorage(TWO_WAY_DISTANCE),
      expected_going_on_date: getFromLocalStorage(
        TWO_WAY_EXPECTED_GOING_ON_DATE
      ),
      from_location: getFromLocalStorage(TWO_WAY_FROM_LOCATION),
      to_location: getFromLocalStorage(TWO_WAY_TO_LOCATION),
      is_checked_policy: getFromLocalStorage(TWO_WAY_IS_CHECKED_POLICY),
      note: getFromLocalStorage(TWO_WAY_NOTE),
      is_a_day_tour: getFromLocalStorage(TWO_WAY_IS_A_DAY_TOUR),
      expected_picking_up_date: getFromLocalStorage(
        TWO_WAY_EXPECTED_PICKING_UP_DATE
      ),
      hour_of_wait_time: getFromLocalStorage(TWO_WAY_HOUR_OF_WAIT_TIME),
    })

  const oneWayCompoundingCarFormFromLocalStorage =
    (): CreateOneWayCompoundingForm => ({
      car_id: getFromLocalStorage(ONE_WAY_CAR_ID),
      distance: getFromLocalStorage(ONE_WAY_DISTANCE),
      expected_going_on_date: getFromLocalStorage(
        ONE_WAY_EXPECTED_GOING_ON_DATE
      ),
      from_location: getFromLocalStorage(ONE_WAY_FROM_LOCATION),
      to_location: getFromLocalStorage(ONE_WAY_TO_LOCATION),
      is_checked_policy: getFromLocalStorage(ONE_WAY_IS_CHECKED_POLICY),
      note: getFromLocalStorage(ONE_WAY_NOTE),
    })

  return {
    seats,
    carTypes,
    clearCarpoolingWayCompoundingCar,
    clearOneWayCompoundingCar,
    clearTwoWayCompoundingCar,
    calcPriceFromProvinceIds,
    compoundingCarCustomerResToCarpoolingForm,
    compoundingCarCustomerResToOneWayForm,
    compoundingCarCustomerResToTwoWayForm,
    carpoolingCompoundingFormFromLocalStorage,
    oneWayCompoundingCarFormFromLocalStorage,
    twoWayCompoundingCarFormFromLocalStorage,
    compoundingCarResToCarpoolingForm,
  }
}
