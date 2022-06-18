import { getTimes, hoursBackList } from "@/helper"
import {
  CompoundingCar,
  CompoundingCarCustomer,
  CreateCarpoolCompoundingNoToken,
  CreateCompoundingCarNoTokenParams,
  CreateCompoundingCarRes,
  CreateOneWayCompoundingNoToken,
  CreateTwoWayCompoundingNoToken,
  HourWaitTimeType,
  OptionModel,
  UpdateCompoundingCar,
  UseParams,
} from "@/models"
import { RidesFormSlice, setScreenLoading } from "@/modules"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useToken } from "./useToken"

interface UseCreateRidesRes {
  createCompounding: (
    params: UseParams<
      | CreateOneWayCompoundingNoToken
      | CreateTwoWayCompoundingNoToken
      | CreateCarpoolCompoundingNoToken,
      CreateCompoundingCarRes
    >
  ) => void
  confirmCompounding: (
    _params: UseParams<{ compounding_car_customer_id: number }, any>
  ) => void
  updateCompounding: (
    _params: UseParams<UpdateCompoundingCar, CreateCompoundingCarRes>
  ) => void
  getDetailCompoundingCar: (
    _params: UseParams<{ compounding_car_id: number }, CompoundingCar>
  ) => void
  getDetailCompoundingCarCustomer: (
    _params: UseParams<
      { compounding_car_customer_id: number },
      CompoundingCarCustomer
    >
  ) => void
  compoundingCarCustomerResToRidesFormSlice: (
    params: CompoundingCarCustomer
  ) => RidesFormSlice
  compoundingCarCustomerResToRidesForm: (
    params: CompoundingCarCustomer
  ) => CreateCompoundingCarNoTokenParams
}

export const useCreateRides = (): UseCreateRidesRes => {
  const { token } = useToken()
  const dispatch = useDispatch()
  const router = useRouter()

  const createCompounding = async (
    _params: UseParams<
      | CreateCarpoolCompoundingNoToken
      | CreateOneWayCompoundingNoToken
      | CreateTwoWayCompoundingNoToken,
      CreateCompoundingCarRes
    >
  ) => {
    if (!token) return
    const { params, onSuccess, onError } = _params

    try {
      dispatch(setScreenLoading(true))
      const res: any = await ridesApi.createCompoundingCar({ ...params, token })
      dispatch(setScreenLoading(false))
      if (!res?.result?.success) {
        dispatch(notify(res?.result?.message || "Failure", "error"))
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      dispatch(setScreenLoading(false))
      onError && onError()
      console.log(error)
    }
  }

  const confirmCompounding = async (
    _params: UseParams<{ compounding_car_customer_id: number }, any>
  ) => {
    if (!token) {
      router.push("/login")
      return
    }

    const {
      params: { compounding_car_customer_id },
      onSuccess,
      onError,
    } = _params

    try {
      dispatch(setScreenLoading(true))
      const res: any = await ridesApi.confirmCompoundingCar({
        compounding_car_customer_id,
        token,
      })
      dispatch(setScreenLoading(false))
      if (!res?.result?.success) {
        dispatch(notify(res?.result?.message || "Failure", "error"))
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      dispatch(setScreenLoading(false))
      onError && onError()
      console.log(error)
    }
  }

  const getDetailCompoundingCar = async (
    _params: UseParams<{ compounding_car_id: number }, CompoundingCar>
  ) => {
    if (!token) {
      router.push("/login")
      return
    }

    const {
      params: { compounding_car_id },
      onSuccess,
      onError,
    } = _params

    try {
      const res: any = await ridesApi.getDetailCompoundingCar({
        compounding_car_id,
        token,
      })
      if (!res?.result?.success) {
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      onError && onError()
      console.log(error)
    }
  }

  const getDetailCompoundingCarCustomer = async (
    _params: UseParams<
      { compounding_car_customer_id: number },
      CompoundingCarCustomer
    >
  ) => {
    if (!token) {
      router.push("/login")
      return
    }

    const {
      params: { compounding_car_customer_id },
      onSuccess,
      onError,
    } = _params

    try {
      const res: any = await ridesApi.getDetailCompoundingCarCustomer({
        compounding_car_customer_id,
        token,
      })
      if (!res?.result?.success) {
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      onError && onError()
      console.log(error)
    }
  }

  const updateCompounding = async (
    _params: UseParams<UpdateCompoundingCar, any>
  ) => {
    if (!token) {
      router.push("/login")
      return
    }

    const { params, onSuccess, onError } = _params
    try {
      dispatch(setScreenLoading(true))
      const res: any = await ridesApi.updateCompoundingCar({
        ...params,
        token,
      })
      dispatch(setScreenLoading(false))
      if (!res?.result?.success) {
        dispatch(notify(res?.result?.message || "Failure", "error"))
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      dispatch(setScreenLoading(false))
      onError && onError()
      console.log(error)
    }
  }

  const compoundingCarCustomerResToRidesFormSlice = (
    params: CompoundingCarCustomer
  ): RidesFormSlice => {
    return {
      car_id: {
        label: params.car.name,
        value: params.car.car_id,
        number_seat: params.car.number_seat,
      },
      check_policy: true,
      compounding_type: params.compounding_type,
      distance: params.distance,
      expected_going_on_date: {
        date_time: params.expected_going_on_date,
        time: getTimes().find(
          (item) => item.value === params.expected_going_on_date.slice(11)
        ) as OptionModel,
      },
      expected_picking_up_date: params.expected_picking_up_date,
      from_pick_up_station_id: {
        ...params.from_pick_up_station,
        from_station_location: {
          from_address: params.from_address,
          from_latitude: params.from_latitude,
          from_longitude: params.from_longitude,
        },
      },
      from_province_id: {
        province_id: params.from_province.province_id,
        address: params.from_address,
        lat: Number(params.from_latitude),
        lng: Number(params.from_longitude),
      },
      hour_of_wait_time: hoursBackList.find(
        (item) => item.value === params.hour_of_wait_time
      ) as { value: HourWaitTimeType; label: string },
      is_a_day_tour: params.is_a_day_tour,
      note: params.note,
      number_seat: {
        label: params.car.name,
        value: params.car.number_seat,
      },
      price_unit_id: 0,
      quality_car: undefined,
      to_pick_up_station_id: params.to_pick_up_station,
      to_province_id: {
        address: params.to_address,
        lat: Number(params.to_latitude),
        lng: Number(params.to_longitude),
        province_id: params.to_province.province_id,
      },
    }
  }

  const compoundingCarCustomerResToRidesForm = (
    params: CompoundingCarCustomer
  ): CreateCompoundingCarNoTokenParams => {
    return {
      car_id: params.car.car_id,
      check_policy: true,
      compounding_type: params.compounding_type,
      distance: params.distance,
      expected_going_on_date: params.expected_going_on_date,
      expected_picking_up_date: params.expected_picking_up_date,
      from_pick_up_station_id: params.from_pick_up_station.station_id,
      from_province_id: params.from_province.province_id,
      hour_of_wait_time: params.hour_of_wait_time,
      is_a_day_tour: params.is_a_day_tour,
      note: params.note,
      number_seat: params.number_seat,
      quality_car: undefined,
      to_pick_up_station_id: params.to_pick_up_station.station_id,
      to_province_id: params.to_province.province_id,
    }
  }

  return {
    confirmCompounding,
    createCompounding,
    updateCompounding,
    getDetailCompoundingCar,
    getDetailCompoundingCarCustomer,
    compoundingCarCustomerResToRidesFormSlice,
    compoundingCarCustomerResToRidesForm,
  }
}
