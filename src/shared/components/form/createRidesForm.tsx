import { FormContainer } from "@/container"
import { createCompoundingCarSchema } from "@/core/schema"
import { RootState } from "@/core/store"
import {
  DEFAULT_DATE_TIME_VALUE,
  DEFAULT_HOUR_BACK_VALUE,
  formatMoneyVND,
  getTimes,
  hoursBackList,
  lngLatToKms,
} from "@/helper"
import {
  CompoundingType,
  CreateCarpoolCompoundingNoToken,
  CreateCommonCompounding,
  CreateCompoundingCarNoTokenParams,
  CreateCompoundingDefaultValues,
  CreateCompoundingParams,
  CreateOneWayCompoundingNoToken,
  CreateTwoWayCompoundingNoToken,
  FromStationPickUpParams,
  HourWaitTimeType,
  LocationType,
  OptionModel,
} from "@/models"
import {
  ExpectedDateParams,
  RidesFormSlice,
  setBackInDay,
  setCarId,
  setDistance,
  setExpectedGoingOnDate,
  setExpectedPickingUpDate,
  setFromPickUpStationId,
  setFromProvinceId,
  setHourOfWaiting,
  setNumberSeat,
  setOpenLocationFormModal,
  setRidesNote,
  setToPickUpStationId,
  setToProvinceId,
} from "@/modules"
import { vehicleApi } from "@/services"
import { yupResolver } from "@hookform/resolvers/yup"
import moment from "moment"
import { useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { BiCalendar } from "react-icons/bi"
import { FiEdit } from "react-icons/fi"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { MdOutlineDateRange } from "react-icons/md"
import { RiCarWashingLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { notify } from "reapop"
import { useFetchCarType, useToken } from "shared/hook"
import { LatLng } from "use-places-autocomplete"
import { Toggle } from "../common"
import { InputCheckbox } from "../inputs"
import InputLocation from "../inputs/inputLocation"
import { InputRadio } from "../inputs/inputRadio"
import { LocationModal } from "../location"
import { Map } from "../map"
import { Modal } from "../modal"

interface CreateRidesFormProps {
  type: CompoundingType
  defaultValues?: CreateCompoundingDefaultValues
  mode?: "update" | "create"
  onSubmit?: (params: CreateCompoundingParams) => void
  onUpdate?: (params: CreateCompoundingParams) => void
}

export const CreateRidesForm = ({
  type,
  defaultValues,
  mode = "create",
  onSubmit,
  onUpdate,
}: CreateRidesFormProps) => {
  const dispatch = useDispatch()
  const { token } = useToken()
  const { vehicleTypeOptions: vehicleTypeOptionsProps } = useFetchCarType()
  const ridesFormState: RidesFormSlice = useSelector(
    (state: RootState) => state.ridesForm
  )
  const { distance } = useSelector((state: RootState) => state.ridesForm)
  const { isOpenLocationFormModal } = useSelector(
    (state: RootState) => state.common
  )
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState: { errors, dirtyFields, isValid },
    control,
  } = useForm<CreateCompoundingCarNoTokenParams>({
    resolver: yupResolver(createCompoundingCarSchema),
    mode: "all",
    defaultValues,
  })

  const [price, setPrice] = useState<number>()
  const [readOnly, setReadOnly] = useState<boolean>(mode === "update")

  // Functions
  const calculateKms = (locationType: LocationType, targetLocation: LatLng) => {
    if (!ridesFormState?.from_province_id && !ridesFormState?.to_province_id)
      return

    const { lat: latProps, lng: lngProps } = targetLocation

    if (locationType === "from_location") {
      if (!ridesFormState?.to_province_id) return

      const { lat, lng } = ridesFormState.to_province_id
      dispatch(
        setDistance(
          lngLatToKms({
            from: { lat, lng },
            to: { lat: latProps, lng: lngProps },
          })
        )
      )
    } else {
      if (!ridesFormState?.from_province_id) return

      const { lat, lng } = ridesFormState.from_province_id
      dispatch(
        setDistance(
          lngLatToKms({
            to: { lat, lng },
            from: { lat: latProps, lng: lngProps },
          })
        )
      )
    }
  }

  const getKmsByStation = (
    locationType: LocationType,
    targetLocation: LatLng
  ) => {
    if (
      !ridesFormState?.from_pick_up_station_id?.station_id &&
      !ridesFormState?.to_pick_up_station_id?.station_id
    )
      return

    if (locationType === "from_location") {
      if (!ridesFormState?.to_pick_up_station_id?.station_id) return

      const { longitude: lng, latitude: lat } =
        ridesFormState?.to_pick_up_station_id

      dispatch(
        setDistance(
          lngLatToKms({
            to: { lng, lat },
            from: {
              lat: targetLocation.lat,
              lng: targetLocation.lng,
            },
          })
        )
      )
    } else {
      if (!ridesFormState?.from_pick_up_station_id?.station_id) return
      const { longitude: lng, latitude: lat } =
        ridesFormState?.from_pick_up_station_id

      dispatch(
        setDistance(
          lngLatToKms({
            from: { lng, lat },
            to: {
              lat: targetLocation.lat,
              lng: targetLocation.lng,
            },
          })
        )
      )
    }
  }

  const handleToggleCheckbox = (): boolean | undefined => {
    const isChecked = getValues("check_policy")
    if (!isChecked) {
      clearErrors("check_policy")
      return true
    }
    return
  }

  const vehicleTypeOptions = useMemo(() => {
    return vehicleTypeOptionsProps()
  }, [vehicleTypeOptionsProps])

  const seats = (): OptionModel[] =>
    Array.from({
      length: Number(ridesFormState?.car_id?.number_seat) || 3,
    }).map((item, index) => ({
      label: `${index + 1} Chỗ`,
      value: index + 1 + "",
    }))

  const handleOpenLocationForm = (type: "from_location" | "to_location") => {
    dispatch(setOpenLocationFormModal(type))
  }

  const handleToggleStatus = (value: boolean) => {
    setValue("is_a_day_tour", value)
    dispatch(setBackInDay(value))

    if (value) {
      if (!getValues("expected_picking_up_date")) {
        setValue("expected_picking_up_date", DEFAULT_DATE_TIME_VALUE)
        clearErrors("expected_picking_up_date")
      }

      if (getValues("hour_of_wait_time") === DEFAULT_HOUR_BACK_VALUE) {
        setValue("hour_of_wait_time", undefined as any)
        dispatch(setHourOfWaiting(undefined))
        setError("hour_of_wait_time", {})
      }
    } else {
      if (!getValues("hour_of_wait_time")) {
        setValue("hour_of_wait_time", DEFAULT_HOUR_BACK_VALUE)
        clearErrors("expected_picking_up_date")
      }

      if (getValues("expected_picking_up_date") === DEFAULT_DATE_TIME_VALUE) {
        setValue("expected_picking_up_date", undefined as any)
        dispatch(setExpectedPickingUpDate(undefined))
        setError("expected_picking_up_date", {})
      }
    }
  }

  const getPriceFromProvince = async (car_id: number) => {
    if (!car_id || !token) return
    if (
      !ridesFormState?.from_province_id?.province_id ||
      !ridesFormState?.to_province_id?.province_id
    )
      return

    const { province_id: from_province_id } = ridesFormState.from_province_id
    const { province_id: to_province_id } = ridesFormState.to_province_id

    try {
      const res: any = await vehicleApi.getCarPriceUnit({
        token,
        car_id,
        from_province_id,
        to_province_id,
      })

      if (!res?.result?.success) return

      console.log(res?.result?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmitHandler = (
    data: CreateCompoundingCarNoTokenParams & { mode: "update" | "create" }
  ) => {
    const { mode = "create" } = data
    if (type === "compounding") {
      if (
        !ridesFormState?.from_pick_up_station_id ||
        !ridesFormState?.to_pick_up_station_id
      ) {
        dispatch(notify("Missing required field", "error"))
        return
      }
    } else {
      if (
        !ridesFormState?.from_province_id ||
        !ridesFormState?.to_province_id
      ) {
        dispatch(notify("Missing required field", "error"))
        return
      }
    }
    console.log(data)

    const commonParams: CreateCommonCompounding = {
      distance: ridesFormState?.distance || getDistanceFromStoredData() || 0,
      car_id: data.car_id,
      compounding_type: data.compounding_type,
      from_province_id:
        type === "compounding"
          ? ridesFormState.from_pick_up_station_id?.province_id.province_id ||
            Number(data.from_province_id)
          : Number(data.from_province_id),
      to_province_id:
        type === "compounding"
          ? ridesFormState.to_pick_up_station_id?.province_id.province_id ||
            Number(data.to_province_id)
          : Number(data.to_province_id),
      note: data?.note,
      from_address: ridesFormState.from_province_id?.address || "",
      to_address: ridesFormState.to_province_id?.address || "",
      from_latitude: ridesFormState.from_province_id?.lat + "",
      from_longitude: ridesFormState.from_province_id?.lng + "",
      to_latitude: ridesFormState.to_province_id?.lat + "",
      to_longitude: ridesFormState.to_province_id?.lng + "",
      expected_going_on_date: data.expected_going_on_date,
    }

    let params: CreateCompoundingParams = { ...commonParams }
    if (type === "one_way") {
      params = {
        ...commonParams,
      } as CreateOneWayCompoundingNoToken
    } else if (type === "two_way") {
      params = {
        ...commonParams,
        is_a_day_tour: data.is_a_day_tour,
        expected_picking_up_date: !data.is_a_day_tour
          ? data.expected_picking_up_date
          : false,
        hour_of_wait_time: data.is_a_day_tour
          ? (data.hour_of_wait_time as HourWaitTimeType)
          : false,
      } as CreateTwoWayCompoundingNoToken
    } else if (type === "compounding") {
      params = {
        ...commonParams,
        from_pick_up_station_id: Number(data.from_pick_up_station_id),
        to_pick_up_station_id: Number(data.to_pick_up_station_id),
        number_seat: Number(data.number_seat),
      } as CreateCarpoolCompoundingNoToken
    }

    if (mode === "update") {
      onUpdate && onUpdate(params)
    } else {
      onSubmit && onSubmit(params)
    }
  }

  console.log(errors)

  const getDistanceFromStoredData = (): number | undefined => {
    const {
      from_pick_up_station_id,
      to_pick_up_station_id,
      to_province_id,
      from_province_id,
    } = ridesFormState

    let distance = 0

    if (type === "compounding") {
      if (!from_pick_up_station_id || !to_pick_up_station_id) {
        console.log("missing from location or to location")
        return
      }

      distance = lngLatToKms({
        from: {
          lng: Number(from_pick_up_station_id.longitude),
          lat: Number(from_pick_up_station_id.latitude),
        },
        to: {
          lng: Number(to_pick_up_station_id.longitude),
          lat: Number(to_pick_up_station_id.latitude),
        },
      })
    } else {
      if (!from_province_id || !to_province_id) {
        console.log("missing from location or to location")
        return
      }

      distance = lngLatToKms({
        from: {
          lng: Number(from_province_id.lng),
          lat: Number(from_province_id.lat),
        },
        to: {
          lng: Number(to_province_id.lng),
          lat: Number(to_province_id.lat),
        },
      })
    }
    dispatch(setDistance(distance))
    return distance
  }

  return (
    <>
      {/* <Modal title="Chọn điểm đi">
        <Map />
      </Modal> */}
      <FormContainer
        onAction={handleSubmit((data) => {
          onSubmitHandler({ ...data, mode: "create" })
        })}
        isBtnDisabled={mode === "create" ? !isValid : false}
        btnLabel={mode === "create" ? "Tiếp tục" : "Xác nhận"}
        skipBtnLabel={mode === "update" ? "Lưu chỉnh sửa" : undefined}
        onSkipBtnClick={handleSubmit((data) =>
          onSubmitHandler({ ...data, mode: "update" })
        )}
      >
        <InputLocation
          control={control}
          label="Chọn vị trí"
          name="location"
          onChooseLocation={() => {}}
        />

        <form
          onSubmit={handleSubmit((data) => {
            onSubmitHandler({ ...data, mode: "create" })
          })}
          className={`rides__form ${readOnly ? "rides__form-disabled" : ""}`}
        >
          {mode === "update" ? (
            <div className="rides__form-header">
              <p>Chỉnh sửa</p>
              <Toggle
                onChange={() => setReadOnly(!readOnly)}
                status={!readOnly}
              />
            </div>
          ) : null}

          <div className="rides__form-body">
            <div className="rides__form-location">
              <div className="rides__form-location-item">
                <label className="form-item-label">
                  <HiOutlineLocationMarker />
                  Địa điểm
                </label>
                <div className="rides__form-location-input">
                  <span className="rides__form-location-input-type">Đi:</span>

                  <input
                    onClick={() =>
                      !readOnly && handleOpenLocationForm("from_location")
                    }
                    readOnly
                    className={`form-item-input ${
                      (
                        type === "compounding"
                          ? errors?.from_pick_up_station_id
                          : errors?.from_province_id
                      )
                        ? "form-item-input-error"
                        : ""
                    }`}
                    id={
                      type === "compounding"
                        ? "from_pick_up_station_id"
                        : "from_location"
                    }
                    type="text"
                    placeholder="Điểm đi"
                    value={
                      type === "compounding"
                        ? ridesFormState?.from_pick_up_station_id?.station_name
                        : ridesFormState?.from_province_id?.address
                    }
                    {...register(
                      type === "compounding"
                        ? "from_pick_up_station_id"
                        : "from_province_id",
                      {
                        required: true,
                      }
                    )}
                  />
                </div>
                {errors?.from_pick_up_station_id ||
                dirtyFields?.from_pick_up_station_id ||
                errors?.from_province_id ||
                dirtyFields?.from_province_id ? (
                  <p className="form-item-input-text-error">
                    Vui lòng nhập điểm đi
                  </p>
                ) : null}
              </div>

              <div className="rides__form-location-item">
                <div className="rides__form-location-input">
                  <span className="rides__form-location-input-type">Đến:</span>
                  <input
                    onClick={() =>
                      !readOnly && handleOpenLocationForm("to_location")
                    }
                    readOnly
                    className={`form-item-input ${
                      (
                        type === "compounding"
                          ? errors?.to_pick_up_station_id
                          : errors?.to_province_id
                      )
                        ? "form-item-input-error"
                        : ""
                    }`}
                    id={type === "compounding" ? "to_location" : "to_location"}
                    type="text"
                    placeholder="Điểm đến"
                    value={
                      type === "compounding"
                        ? ridesFormState?.to_pick_up_station_id?.station_name
                        : ridesFormState?.to_province_id?.address
                    }
                    {...register(
                      type === "compounding"
                        ? "to_pick_up_station_id"
                        : "to_province_id",
                      {
                        required: true,
                      }
                    )}
                  />
                </div>
                {errors?.to_pick_up_station_id ||
                dirtyFields?.to_pick_up_station_id ||
                errors?.to_province_id ||
                dirtyFields?.to_province_id ? (
                  <p className="form-item-input-text-error">
                    Vui lòng điểm đến
                  </p>
                ) : null}
              </div>

              <div className="rides__form-location-info">
                <div className="rides__form-location-info-distance">
                  Giá: {formatMoneyVND(1200000)}
                </div>

                <div className="rides__form-location-info-distance">
                  {distance ? `${distance.toFixed(2)}km` : ""}
                </div>
              </div>
            </div>

            <div className="form-item">
              <label htmlFor="car_id" className="form-item-label">
                <RiCarWashingLine />
                Loại xe
              </label>

              <Controller
                control={control}
                name={"car_id"}
                render={({ field: { onChange, onBlur } }) => (
                  <Select
                    defaultValue={ridesFormState?.car_id}
                    placeholder="loại xe"
                    options={vehicleTypeOptions}
                    onChange={(val) => {
                      if (!val?.value) return
                      onChange(Number(val.value))
                      dispatch(setCarId(val))
                      getPriceFromProvince(Number(val.value))
                      getDistanceFromStoredData()
                    }}
                    onBlur={onBlur}
                    id={"car_id"}
                    className={`${
                      errors?.car_id ? "form-item-select-error" : ""
                    }`}
                  />
                )}
                rules={{ required: true }}
              />
              {errors?.car_id || dirtyFields?.car_id ? (
                <p className="form-item-input-text-error">
                  {errors?.car_id?.message}
                </p>
              ) : null}
            </div>

            <div className="form-item">
              <label
                htmlFor={"expected_going_on_date"}
                className="form-item-label"
              >
                <MdOutlineDateRange />
                Ngày đi
              </label>
              <div style={{ marginBottom: 0 }} className="form-item-inline">
                <div className="form-item-inline-item">
                  <Controller
                    control={control}
                    name={"expected_going_on_date"}
                    render={({ field: { onChange, onBlur } }) => (
                      <input
                        className={`form-item-input ${
                          errors?.expected_going_on_date
                            ? "form-item-input-error"
                            : ""
                        }`}
                        id={"expected_going_on_date"}
                        type="date"
                        onBlur={onBlur}
                        placeholder="ngày đi"
                        onChange={(e) => {
                          const value = e.target.value
                          const date = `${value} ${ridesFormState?.expected_going_on_date?.time?.value}`
                          onChange(date)

                          dispatch(
                            setExpectedGoingOnDate({
                              ...ridesFormState?.expected_going_on_date,
                              date_time: date,
                            } as ExpectedDateParams)
                          )
                        }}
                        defaultValue={ridesFormState?.expected_going_on_date?.date_time?.slice(
                          0,
                          10
                        )}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </div>
                <div className="form-item-inline-item">
                  <label
                    className="form-item-label show-on-mobile"
                    htmlFor="gender"
                  >
                    Giờ khởi hành
                  </label>
                  <Controller
                    control={control}
                    name={"expected_going_on_date"}
                    render={({ field: { onChange, onBlur } }) => (
                      <Select
                        className={`${
                          errors?.expected_going_on_date
                            ? "form-item-select-error"
                            : ""
                        }`}
                        placeholder="giờ đi"
                        options={getTimes()}
                        onChange={(val) => {
                          if (!val?.value) return
                          const newDate = `${ridesFormState?.expected_going_on_date?.date_time?.slice(
                            0,
                            10
                          )} ${val.value}`
                          onChange(newDate)

                          dispatch(
                            setExpectedGoingOnDate({
                              date_time: newDate,
                              time: val,
                            })
                          )
                        }}
                        onBlur={onBlur}
                        isSearchable={false}
                        defaultValue={
                          ridesFormState?.expected_going_on_date?.time
                        }
                      />
                    )}
                    rules={{ required: true }}
                  />
                </div>
              </div>
              {errors?.expected_going_on_date ||
              dirtyFields?.expected_going_on_date ? (
                <p className="form-item-input-text-error">
                  {errors?.expected_going_on_date?.message}
                </p>
              ) : null}
            </div>

            {type === "compounding" ? (
              <div className="form-item">
                <label htmlFor={"number_seat"} className="form-item-label">
                  <RiCarWashingLine />
                  Số hành khách
                </label>
                <Controller
                  control={control}
                  name={"number_seat"}
                  render={({ field: { onChange, onBlur } }) => (
                    <Select
                      placeholder="Số hành khách"
                      options={seats()}
                      onChange={(val) => {
                        if (!val?.value) return
                        const numberSeat = Number(val.value)
                        onChange(numberSeat)
                        dispatch(setNumberSeat(val))
                      }}
                      onBlur={onBlur}
                      defaultValue={ridesFormState?.number_seat}
                      id={"car_id"}
                      className={`${
                        errors?.number_seat ? "form-item-select-error" : ""
                      }`}
                    />
                  )}
                  rules={{ required: true }}
                />
                {errors?.number_seat || dirtyFields?.number_seat ? (
                  <p className="form-item-input-text-error">
                    {errors?.number_seat?.message}
                  </p>
                ) : null}
              </div>
            ) : null}

            {type === "two_way" ? (
              <div className="rides__form-return">
                <label htmlFor={"number_seat"} className="form-item-label">
                  <BiCalendar />
                  Thời gian về
                </label>

                <div className="rides__form-return-radio">
                  <div className="rides__form-return-radio-item">
                    <InputRadio
                      onCheck={() => {}}
                      isChecked={!!ridesFormState?.is_a_day_tour}
                    />
                    <span onClick={() => handleToggleStatus(true)}>
                      Về trong ngày
                    </span>
                  </div>

                  <div className="rides__form-return-radio-item">
                    <InputRadio
                      onCheck={() => {
                        handleToggleStatus(false)
                      }}
                      isChecked={!ridesFormState?.is_a_day_tour}
                    />
                    <span onClick={() => handleToggleStatus(false)}>
                      Về khác ngày
                    </span>
                  </div>
                </div>

                {ridesFormState?.is_a_day_tour ? (
                  <div className="form-select">
                    <Controller
                      control={control}
                      name={"hour_of_wait_time"}
                      render={({ field: { onChange, onBlur } }) => (
                        <Select
                          placeholder="Số giờ"
                          options={hoursBackList}
                          onChange={(val) => {
                            if (!val?.value) return
                            onChange(val?.value)
                            dispatch(setHourOfWaiting(val))

                            if (!getValues("expected_picking_up_date")) {
                              setValue(
                                "expected_picking_up_date",
                                DEFAULT_DATE_TIME_VALUE
                              )
                            }
                          }}
                          onBlur={onBlur}
                          defaultValue={ridesFormState?.hour_of_wait_time}
                          id={"hour_of_wait_time"}
                          className={`${
                            errors?.hour_of_wait_time
                              ? "form-item-select-error"
                              : ""
                          }`}
                        />
                      )}
                      rules={{ required: true }}
                    />

                    {errors?.hour_of_wait_time ||
                    dirtyFields?.hour_of_wait_time ? (
                      <p className="form-item-input-text-error">
                        {errors?.hour_of_wait_time?.message}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <>
                    <Controller
                      control={control}
                      name={"expected_picking_up_date"}
                      render={({ field: { onChange, onBlur } }) => (
                        <input
                          className={`form-item-input ${
                            errors?.expected_picking_up_date
                              ? "form-item-input-error"
                              : ""
                          }`}
                          id={"expected_picking_up_date"}
                          type="datetime-local"
                          onBlur={onBlur}
                          placeholder="ngày giờ về"
                          onChange={(e) => {
                            const value = e.target.value
                            const val = value
                              ? moment(value).format("YYYY-MM-DD HH:MM:SS")
                              : undefined
                            dispatch(setExpectedPickingUpDate(val))
                            onChange(val)

                            if (!getValues("hour_of_wait_time")) {
                              setValue(
                                "hour_of_wait_time",
                                DEFAULT_HOUR_BACK_VALUE
                              )
                            }
                          }}
                          defaultValue={
                            ridesFormState?.expected_picking_up_date
                          }
                        />
                      )}
                      rules={{ required: true }}
                    />

                    {errors?.expected_picking_up_date ||
                    dirtyFields?.expected_picking_up_date ? (
                      <p className="form-item-input-text-error">
                        {errors?.expected_picking_up_date?.message}
                      </p>
                    ) : null}
                  </>
                )}
              </div>
            ) : null}

            <div className="form-item">
              <label htmlFor="note" className="form-item-label">
                <FiEdit />
                Ghi chú
              </label>

              <Controller
                control={control}
                name="note"
                render={({ field: { onChange, onBlur } }) => (
                  <textarea
                    className="form-textarea form-item-input"
                    name="note"
                    id="note"
                    cols={10}
                    onBlur={onBlur}
                    placeholder="Ghi chú thêm cho chuyến đi..."
                    defaultValue={ridesFormState?.note || ""}
                    onChange={(e) => {
                      const value = e.target.value
                      if (!value) return

                      dispatch(setRidesNote(value))
                      onChange(value)
                    }}
                  ></textarea>
                )}
                rules={{ required: false }}
              />
            </div>

            {mode === "create" ? (
              <Controller
                control={control}
                name={"check_policy"}
                render={({ field: { onChange, onBlur } }) => (
                  <div
                    className={`form-item-label-policy ${
                      errors?.check_policy ? "form-item-label-policy-error" : ""
                    }`}
                  >
                    <InputCheckbox
                      isChecked={getValues("check_policy")}
                      onCheck={() => {
                        onBlur()
                        onChange(handleToggleCheckbox())
                      }}
                      type="square"
                    />
                    <span
                      className={`form-item-label-policy-text ${
                        errors?.check_policy
                          ? "form-item-label-policy-text-error"
                          : ""
                      }`}
                      onClick={() => {
                        onBlur()
                        onChange(handleToggleCheckbox())
                      }}
                    >
                      Tôi đồng ý với tất cả điều khoản
                    </span>
                  </div>
                )}
                rules={{ required: true }}
              />
            ) : null}
          </div>
        </form>
      </FormContainer>

      {isOpenLocationFormModal && type ? (
        <LocationModal
          compoundingType={type as CompoundingType}
          locationType={isOpenLocationFormModal}
          onChooseLocation={(data) => {
            if (isOpenLocationFormModal === "from_location") {
              if (type === "compounding") {
                dispatch(
                  setFromPickUpStationId({
                    ...ridesFormState.from_pick_up_station_id,
                    from_station_location: {
                      from_address: data.address,
                      from_longitude: data.lng + "",
                      from_latitude: data.lat + "",
                    },
                  } as FromStationPickUpParams)
                )
              } else {
                setValue("from_province_id", data.province_id)
                dispatch(setFromProvinceId(data))
                clearErrors("from_province_id")
              }
            } else {
              setValue("to_province_id", data.province_id)
              dispatch(setToProvinceId(data))
              clearErrors("to_province_id")
            }

            calculateKms(isOpenLocationFormModal, data)
          }}
          onChooseStation={(data) => {
            if (isOpenLocationFormModal === "from_location") {
              setValue("from_pick_up_station_id", data.station_id)
              dispatch(setFromPickUpStationId(data))
              clearErrors("from_pick_up_station_id")
            } else {
              setValue("to_pick_up_station_id", data.station_id)
              dispatch(setToPickUpStationId(data))
              clearErrors("to_pick_up_station_id")
            }

            getKmsByStation(isOpenLocationFormModal, {
              lat: data.latitude,
              lng: data.longitude,
            })
          }}
          title={
            isOpenLocationFormModal === "from_location" ? "Điểm đi" : "Điểm đến"
          }
        />
      ) : null}
    </>
  )
}
