import { getFromSessionStorage, setToSessionStorage } from "@/helper"
import {
  CarIdType,
  CompoundingType,
  FromLocation,
  FromLocationRidesForm,
  FromStationPickUpParams,
  HourWaitTimeType,
  OptionModel,
  QualityCarType,
  RidesFormFieldKey,
  StationPickUpParams,
  ToLocationRidesForm,
} from "@/models"
import { createSlice } from "@reduxjs/toolkit"

export interface ExpectedDateParams {
  time: OptionModel
  date_time: string
}

export interface RidesFormSlice {
  compounding_type: CompoundingType | undefined
  from_province_id: FromLocation | undefined
  to_province_id: FromLocation | undefined
  expected_going_on_date: ExpectedDateParams | undefined
  car_id: CarIdType | undefined
  price_unit_id: number | undefined
  from_pick_up_station_id: FromStationPickUpParams | undefined
  to_pick_up_station_id: StationPickUpParams | undefined
  expected_picking_up_date: string | undefined
  quality_car: QualityCarType | undefined
  number_seat: OptionModel | undefined
  is_a_day_tour: boolean | undefined
  hour_of_wait_time: { value: HourWaitTimeType; label: string } | undefined
  check_policy: undefined | boolean
  note: string | undefined
  distance: number | undefined
}

let initialState: RidesFormSlice = {
  compounding_type: undefined,
  from_province_id: undefined,
  to_province_id: undefined,
  expected_going_on_date: undefined,
  car_id: undefined,
  price_unit_id: undefined,
  from_pick_up_station_id: undefined,
  to_pick_up_station_id: undefined,
  expected_picking_up_date: undefined,
  quality_car: undefined,
  number_seat: undefined,
  hour_of_wait_time: undefined,
  is_a_day_tour: true,
  check_policy: undefined,
  note: undefined,
  distance: undefined,
}

try {
  Object.keys(initialState).forEach((item) => {
    initialState[item as RidesFormFieldKey] = getFromSessionStorage(item)
  })
  initialState.is_a_day_tour = true
} catch (error) {
  console.log(error)
}

const ridesFormSlice = createSlice({
  name: "rides_form",
  initialState,
  reducers: {
    setCompoundingType: (
      state,
      { payload }: { payload: CompoundingType | undefined }
    ) => {
      state.compounding_type = payload
      setToSessionStorage("compounding_type", payload)
    },

    setFromProvinceId: (
      state,
      { payload }: { payload: FromLocation | undefined }
    ) => {
      state.from_province_id = payload
      setToSessionStorage("from_province_id", payload)
    },

    setToProvinceId: (
      state,
      { payload }: { payload: FromLocation | undefined }
    ) => {
      state.to_province_id = payload
      setToSessionStorage("to_province_id", payload)
    },

    setExpectedGoingOnDate: (
      state,
      { payload }: { payload: ExpectedDateParams | undefined }
    ) => {
      state.expected_going_on_date = payload
      setToSessionStorage("expected_going_on_date", payload)
    },

    setCarId: (state, { payload }: { payload: CarIdType | undefined }) => {
      state.car_id = payload
      setToSessionStorage("car_id", payload)
    },

    setPriceUnitId: (state, { payload }: { payload: number | undefined }) => {
      state.price_unit_id = payload
      setToSessionStorage("price_unit_id", payload)
    },

    setFromPickUpStationId: (
      state,
      { payload }: { payload: FromStationPickUpParams | undefined }
    ) => {
      state.from_pick_up_station_id = payload
      setToSessionStorage("from_pick_up_station_id", payload)
    },

    setToPickUpStationId: (
      state,
      { payload }: { payload: StationPickUpParams | undefined }
    ) => {
      state.to_pick_up_station_id = payload
      setToSessionStorage("to_pick_up_station_id", payload)
    },

    setExpectedPickingUpDate: (
      state,
      { payload }: { payload: string | undefined }
    ) => {
      state.expected_picking_up_date = payload
      setToSessionStorage("expected_picking_up_date", payload)
    },

    setQualityCar: (
      state,
      { payload }: { payload: QualityCarType | undefined }
    ) => {
      state.quality_car = payload
      setToSessionStorage("quality_car", payload)
    },

    setNumberSeat: (
      state,
      { payload }: { payload: undefined | OptionModel }
    ) => {
      state.number_seat = payload
      setToSessionStorage("number_seat", payload)
    },

    setBackInDay: (state, { payload }: { payload: boolean }) => {
      state.is_a_day_tour = payload
      setToSessionStorage("is_a_day_tour", payload)
    },

    setHourOfWaiting: (
      state,
      {
        payload,
      }: { payload: { label: string; value: HourWaitTimeType } | undefined }
    ) => {
      state.hour_of_wait_time = payload
      setToSessionStorage("hour_of_wait_time", payload)
    },

    setRidesNote: (state, { payload }: { payload: string | undefined }) => {
      state.note = payload
      setToSessionStorage("note", payload)
    },

    setDistance: (state, { payload }: { payload: number | undefined }) => {
      state.distance = payload
      setToSessionStorage("distance", payload)
    },

    resetRidesForm: (state) => {
      Object.keys(state).forEach((item) => {
        state[item as RidesFormFieldKey] = undefined
        setToSessionStorage(item, undefined)
      })
    },

    setRidesForm: (state, { payload }: { payload: RidesFormSlice }) => {
      Object.keys(payload).map((item) => {
        setToSessionStorage(item, payload?.[item as RidesFormFieldKey])
      })
      state = payload
    },
  },
})

export default ridesFormSlice.reducer
export const {
  setCompoundingType,
  setFromProvinceId,
  setExpectedGoingOnDate,
  setFromPickUpStationId,
  setToPickUpStationId,
  setExpectedPickingUpDate,
  setQualityCar,
  setCarId,
  setPriceUnitId,
  setToProvinceId,
  setNumberSeat,
  setHourOfWaiting,
  setBackInDay,
  resetRidesForm,
  setRidesNote,
  setDistance,
  setRidesForm,
} = ridesFormSlice.actions
