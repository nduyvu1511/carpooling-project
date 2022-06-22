/* eslint-disable react-hooks/exhaustive-deps */
import { twoWayCompoundingCarSchema } from "@/core/schema"
import {
  DEFAULT_DATE_TIME_VALUE,
  DEFAULT_HOUR_BACK_VALUE,
  formatMoneyVND,
  hoursBackList,
  lngLatToKms,
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
  TWO_WAY_TO_LOCATION
} from "@/helper"
import {
  CreateTwoWayCompoundingForm,
  CreateTwoWayCompoundingSubmitForm,
  HourWaitTimeType
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { BiCalendar } from "react-icons/bi"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { MdOutlineDateRange } from "react-icons/md"
import { RiCarWashingLine } from "react-icons/ri"
import Select from "react-select"
import { useCompoundingForm, useToken } from "shared/hook"
import {
  InputCarType,
  InputCheckbox,
  InputDateTime,
  InputLocation,
  InputRadio
} from "../../inputs"

interface TwoWayCompoundingFormProps {
  onSubmit: (params: CreateTwoWayCompoundingSubmitForm) => void
  defaultValues?: CreateTwoWayCompoundingForm
  mode?: "create" | "update"
}

export const TwoWayCompoundingForm = ({
  onSubmit,
  defaultValues,
  mode = "create",
}: TwoWayCompoundingFormProps) => {
  const { token } = useToken()
  const modeRef = useRef<"create" | "update">("create")

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState: { errors, isValid, isDirty },
    control,
  } = useForm<CreateTwoWayCompoundingForm>({
    resolver: yupResolver(twoWayCompoundingCarSchema),
    mode: "all",
    defaultValues,
  })
  const { carTypes, calcPriceFromProvinceIds } = useCompoundingForm()

  const [isADayTour, setADayTour] = useState<boolean>(
    getValues("is_a_day_tour")
  )
  const [distance, setDistance] = useState<number>(getValues("distance"))
  const [price, setPrice] = useState<number>(getValues("price") || 0)

  const calcDistance = () => {
    const fromStation = getValues("from_location")
    const toStation = getValues("to_location")
    if (!fromStation?.province_id || !toStation?.province_id) return

    const distance = lngLatToKms({
      from: {
        lat: +fromStation.lat,
        lng: +fromStation.lng,
      },
      to: {
        lat: +toStation.lat,
        lng: +toStation.lng,
      },
    })

    setToLocalStorage(TWO_WAY_DISTANCE, distance)
    setValue("distance", distance)
    setDistance(distance)
  }

  const calcPrice = async () => {
    const fromLocation = getValues("from_location")
    const toLocation = getValues("to_location")
    const carId = getValues("car_id")
    if (!fromLocation?.province_id || !toLocation?.province_id || !carId?.value)
      return

    calcPriceFromProvinceIds({
      params: {
        car_id: +carId.value,
        from_province_id: fromLocation.province_id,
        to_province_id: toLocation.province_id,
      },
      onSuccess: (data) => {
        setValue("price", data)
        setToLocalStorage(TWO_WAY_PRICE, data)
        setPrice(data)
      },
    })
  }

  const handleToggleStatus = (value: boolean) => {
    setValue("is_a_day_tour", value)
    setToLocalStorage(TWO_WAY_IS_A_DAY_TOUR, value)
    setADayTour(value)
    handleSetDefaultValueForPickingUpdate(value)
  }

  const handleSetDefaultValueForPickingUpdate = (status: boolean) => {
    const hour = getValues("hour_of_wait_time")
    const dateTime = getValues("expected_picking_up_date")

    if (status) {
      if (!dateTime) {
        setValue("expected_picking_up_date", DEFAULT_DATE_TIME_VALUE)
        setToLocalStorage(
          TWO_WAY_EXPECTED_PICKING_UP_DATE,
          DEFAULT_DATE_TIME_VALUE
        )
        clearErrors("expected_picking_up_date")
      }

      if (hour?.value === DEFAULT_HOUR_BACK_VALUE?.value) {
        setValue("hour_of_wait_time", undefined as any)
        setToLocalStorage(TWO_WAY_HOUR_OF_WAIT_TIME, undefined)
        setError("hour_of_wait_time", {})
      }
    } else {
      if (!hour) {
        setValue("hour_of_wait_time", DEFAULT_HOUR_BACK_VALUE)
        clearErrors("expected_picking_up_date")
        setToLocalStorage(TWO_WAY_HOUR_OF_WAIT_TIME, DEFAULT_HOUR_BACK_VALUE)
      }

      if (dateTime === DEFAULT_DATE_TIME_VALUE) {
        setValue("expected_picking_up_date", undefined as any)
        setError("expected_picking_up_date", {})
        setToLocalStorage(TWO_WAY_EXPECTED_PICKING_UP_DATE, undefined)
      }
    }
  }

  useEffect(() => {
    if (getValues("is_a_day_tour") === undefined) {
      setValue("is_a_day_tour", false)
    }
    handleSetDefaultValueForPickingUpdate(getValues("is_a_day_tour"))
  }, [])

  console.log(errors)

  const onSubmitHandler = (data: CreateTwoWayCompoundingForm) => {
    const { is_a_day_tour } = data

    const params: CreateTwoWayCompoundingSubmitForm = {
      car_id: Number(data.car_id.value),
      compounding_type: "two_way",
      distance: data.distance,
      expected_going_on_date: data.expected_going_on_date,
      from_address: data.from_location.address,
      from_latitude: data.from_location.lat + "",
      from_longitude: data.from_location.lng + "",
      to_address: data.to_location.address,
      to_latitude: data.to_location.lat + "",
      to_longitude: data.to_location.lng + "",
      from_province_id: data.from_location.province_id,
      to_province_id: data.to_location.province_id,
      note: data?.note || "",
      is_a_day_tour,
      expected_picking_up_date: !is_a_day_tour
        ? data.expected_picking_up_date
        : false,
      hour_of_wait_time: is_a_day_tour
        ? (data.hour_of_wait_time?.value as HourWaitTimeType)
        : false,
      mode: modeRef.current,
    }
    if (params.mode === "update" && !isDirty) return
    onSubmit(params)
  }

  const handleTogglePolicy = (): boolean | undefined => {
    const isChecked = getValues("is_checked_policy")
    if (!isChecked) {
      clearErrors("is_checked_policy")
      setToLocalStorage(TWO_WAY_IS_CHECKED_POLICY, true)
      return true
    }
    setToLocalStorage(TWO_WAY_IS_CHECKED_POLICY, undefined)
    return
  }
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmitHandler({ ...data })
      })}
      className="rides__form"
    >
      <div className="rides__form-location">
        <div className="rides__form-location-item">
          <label className="form-item-label">
            <HiOutlineLocationMarker />
            Địa điểm
          </label>

          <Controller
            control={control}
            name={"from_location"}
            render={({ field: { onChange, onBlur } }) => (
              <InputLocation
                prevProvinceId={getValues("to_location.province_id")}
                isError={!!errors?.from_location}
                type="from"
                onBlur={onBlur}
                value={getValues("from_location")?.address}
                label="Điểm đi"
                onChange={(location) => {
                  setToLocalStorage(TWO_WAY_FROM_LOCATION, location)
                  onChange(location)
                  calcPrice()
                  calcDistance()
                }}
                defaultLocation={getValues("from_location")}
              />
            )}
            rules={{ required: true }}
          />
        </div>

        <div className="rides__form-location-item">
          <Controller
            control={control}
            name={"to_location"}
            render={({ field: { onChange, onBlur } }) => (
              <InputLocation
                prevProvinceId={getValues("from_location.province_id")}
                isError={!!errors?.to_location}
                type="to"
                onBlur={onBlur}
                value={
                  getValues("to_location")?.address ||
                  defaultValues?.to_location?.address ||
                  ""
                }
                label="Điểm đến"
                onChange={(location) => {
                  setToLocalStorage(TWO_WAY_TO_LOCATION, location)
                  onChange(location)
                  calcPrice()
                  calcDistance()
                }}
                defaultLocation={getValues("to_location")}
              />
            )}
            rules={{ required: true }}
          />
        </div>

        <div className="rides__form-location-info">
          {price ? (
            <p className="rides__form-location-info-price">
              Giá: {formatMoneyVND(price)}
            </p>
          ) : null}
          {distance ? (
            <p className="rides__form-location-info-distance">
              Quãng đường: {distance.toFixed(2)}km
            </p>
          ) : null}
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
            <InputCarType
              value={getValues("car_id") || defaultValues?.car_id}
              isError={!!errors?.car_id}
              label=""
              onBlur={onBlur}
              onChange={(option) => {
                setToLocalStorage(TWO_WAY_CAR_ID, option)
                onChange(option)
                calcPrice()
              }}
              options={carTypes}
            />
          )}
          rules={{ required: true }}
        />
      </div>

      <div className="form-item">
        <label htmlFor={"expected_going_on_date"} className="form-item-label">
          <MdOutlineDateRange />
          Ngày khởi hành
        </label>

        <Controller
          control={control}
          name={"expected_going_on_date"}
          render={({ field: { onChange, onBlur } }) => (
            <InputDateTime
              value={defaultValues?.expected_going_on_date}
              label=""
              onBlur={onBlur}
              onChange={(val) => {
                setToLocalStorage(TWO_WAY_EXPECTED_GOING_ON_DATE, val)
                onChange(val)
              }}
              isError={!!errors?.expected_going_on_date}
            />
          )}
          rules={{ required: true }}
        />
      </div>

      <div className="rides__form-return">
        <label htmlFor={"number_seat"} className="form-item-label">
          <BiCalendar />
          Thời gian chờ
        </label>
        <div className="rides__form-return-radio">
          <div className="rides__form-return-radio-item">
            <InputRadio
              onCheck={() => {
                handleToggleStatus(true)
              }}
              isChecked={!!getValues("is_a_day_tour")}
            />
            <span onClick={() => handleToggleStatus(true)}>Trong ngày</span>
          </div>

          <div className="rides__form-return-radio-item">
            <InputRadio
              onCheck={() => {
                handleToggleStatus(false)
              }}
              isChecked={!getValues("is_a_day_tour")}
            />
            <span onClick={() => handleToggleStatus(false)}>Khác ngày</span>
          </div>
        </div>

        {getValues("is_a_day_tour") ? (
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
                    onChange(val)
                    setToLocalStorage(TWO_WAY_HOUR_OF_WAIT_TIME, val)

                    if (!getValues("expected_picking_up_date")) {
                      setValue(
                        "expected_picking_up_date",
                        DEFAULT_DATE_TIME_VALUE
                      )
                    }
                  }}
                  onBlur={onBlur}
                  defaultValue={defaultValues?.hour_of_wait_time}
                  id={"hour_of_wait_time"}
                  className={`${
                    errors?.hour_of_wait_time ? "form-item-select-error" : ""
                  }`}
                />
              )}
              rules={{ required: true }}
            />

            {errors?.hour_of_wait_time ? (
              <p className="form-item-input-text-error">
                Vui lòng nhập trường này
              </p>
            ) : null}
          </div>
        ) : (
          <>
            <Controller
              control={control}
              name={"expected_picking_up_date"}
              render={({ field: { onChange, onBlur } }) => (
                <InputDateTime
                  value={defaultValues?.expected_picking_up_date}
                  label=""
                  onBlur={onBlur}
                  onChange={(val) => {
                    setToLocalStorage(TWO_WAY_EXPECTED_PICKING_UP_DATE, val)
                    onChange(val)

                    if (!getValues("hour_of_wait_time")) {
                      setValue("hour_of_wait_time", DEFAULT_HOUR_BACK_VALUE)
                    }
                  }}
                  isError={!!errors?.expected_picking_up_date}
                />
              )}
              rules={{ required: true }}
            />

            {errors?.expected_picking_up_date ? (
              <p className="form-item-input-text-error">
                {errors?.expected_picking_up_date?.message}
              </p>
            ) : null}
          </>
        )}
      </div>

      <div className="form-item">
        <label htmlFor="car_id" className="form-item-label">
          <RiCarWashingLine />
          Ghi chú cho chuyến đi
        </label>

        <textarea
          {...register}
          className="form-textarea form-item-input"
          name="note"
          id="note"
          cols={10}
          placeholder="Ghi chú thêm cho chuyến đi..."
          defaultValue={defaultValues?.note}
          onChange={(e) => {
            setValue("note", e.target.value)
            setToLocalStorage(TWO_WAY_NOTE, e.target.value)
          }}
        ></textarea>
      </div>

      <Controller
        control={control}
        name={"is_checked_policy"}
        render={({ field: { onChange, onBlur } }) => (
          <div
            className={`form-item-label-policy ${
              errors?.is_checked_policy ? "form-item-label-policy-error" : ""
            }`}
          >
            <InputCheckbox
              isChecked={getValues("is_checked_policy")}
              onCheck={() => {
                onBlur()
                onChange(handleTogglePolicy())
              }}
              type="square"
            />
            <span
              className={`form-item-label-policy-text ${
                errors?.is_checked_policy
                  ? "form-item-label-policy-text-error"
                  : ""
              }`}
              onClick={() => {
                onBlur()
                onChange(handleTogglePolicy())
              }}
            >
              Tôi đồng ý với tất cả điều khoản
            </span>
          </div>
        )}
        rules={{ required: true }}
      />

      <div className="rides__form-footer">
        <div className="content-container">
          {mode === "update" ? (
            <button
              onClick={() => {
                modeRef.current = "update"
                handleSubmit((data) => onSubmitHandler(data))
              }}
              className={`btn-primary rides__form-save ${
                !isValid || !isDirty ? "btn-disabled" : ""
              }`}
            >
              Lưu Chỉnh sửa
            </button>
          ) : null}

          <button
            onClick={() => {
              modeRef.current = "create"
              handleSubmit((data) => onSubmitHandler(data))
            }}
            className={`btn-primary rides__form-submit ${
              !isValid ? "btn-not-allowed" : ""
            }`}
          >
            {mode === "create" ? "Tiếp tục" : "Xác nhận"}
          </button>
        </div>
      </div>
    </form>
  )
}
