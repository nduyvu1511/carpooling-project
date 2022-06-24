/* eslint-disable react-hooks/exhaustive-deps */
import { oneWayCompoundingCarSchema } from "@/core/schema"
import {
  formatMoneyVND,
  ONE_WAY_CAR_ID,
  ONE_WAY_DISTANCE,
  ONE_WAY_EXPECTED_GOING_ON_DATE,
  ONE_WAY_FROM_LOCATION,
  ONE_WAY_IS_CHECKED_POLICY,
  ONE_WAY_NOTE,
  ONE_WAY_PRICE,
  ONE_WAY_TO_LOCATION,
  setToLocalStorage,
} from "@/helper"
import {
  CreateOneWayCompoundingForm,
  CreateOneWayCompoundingNoToken,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { MdOutlineDateRange } from "react-icons/md"
import { RiCarWashingLine } from "react-icons/ri"
import { useCompoundingForm } from "shared/hook"
import {
  InputCarType,
  InputCheckbox,
  InputDateTime,
  InputLocation,
} from "../../inputs"

interface OneWayCompoundingFormProps {
  onSubmit: (
    params: CreateOneWayCompoundingNoToken & { mode: "update" | "create" }
  ) => void
  defaultValues?: CreateOneWayCompoundingForm
  mode?: "create" | "update"
}

export const OneWayCompoundingForm = ({
  onSubmit,
  defaultValues,
  mode = "create",
}: OneWayCompoundingFormProps) => {
  const modeRef = useRef<"create" | "update">("create")
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm<CreateOneWayCompoundingForm>({
    resolver: yupResolver(oneWayCompoundingCarSchema),
    mode: "all",
    defaultValues,
  })
  const {
    vehicleTypeOptions,
    calcPriceFromProvinceIds,
    calculateDistanceBetweenTwoCoordinates,
  } = useCompoundingForm()
  const [distance, setDistance] = useState<number>(getValues("distance"))
  const [price, setPrice] = useState<number>(getValues("price") || 0)

  // Get Distance
  const calcDistance = () => {
    const fromLocation = getValues("from_location")
    const toLocation = getValues("to_location")
    if (!fromLocation?.province_id || !toLocation?.province_id) return

    calculateDistanceBetweenTwoCoordinates({
      params: {
        origin: { lat: +fromLocation.lat, lng: +fromLocation.lng },
        destination: { lat: +toLocation.lat, lng: +toLocation.lng },
      },
      onSuccess: (distance) => {
        setDistance(distance)
        setToLocalStorage(ONE_WAY_DISTANCE, distance)
        setValue("distance", distance)
      },
    })
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
        setToLocalStorage(ONE_WAY_PRICE, data)
        setPrice(data)
      },
    })
  }

  const onSubmitHandler = (data: CreateOneWayCompoundingForm) => {
    const params: CreateOneWayCompoundingNoToken & {
      mode: "update" | "create"
    } = {
      car_id: Number(data.car_id.value),
      compounding_type: "one_way",
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
      mode: modeRef.current,
    }

    onSubmit(params)
  }

  const handleTogglePolicy = (): boolean | undefined => {
    const isChecked = getValues("is_checked_policy")
    if (!isChecked) {
      clearErrors("is_checked_policy")
      setToLocalStorage(ONE_WAY_IS_CHECKED_POLICY, true)
      return true
    }
    setToLocalStorage(ONE_WAY_IS_CHECKED_POLICY, undefined)
    return
  }

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmitHandler(data)
      })}
      className="rides__form"
    >
      <div className="rides__form-location">
        <label className="form-item-label">
          <HiOutlineLocationMarker />
          Địa điểm
        </label>

        <div className="rides__form-location-item">
          <Controller
            control={control}
            name={"from_location"}
            render={({ field: { onChange, onBlur } }) => (
              <InputLocation
                defaultLocation={getValues("from_location")}
                isError={!!errors?.from_location?.province_id}
                type="from"
                onBlur={onBlur}
                value={
                  getValues("from_location")?.address ||
                  defaultValues?.from_location?.address ||
                  ""
                }
                label="Điểm đi"
                onChange={(location) => {
                  setToLocalStorage(ONE_WAY_FROM_LOCATION, location)
                  onChange(location)
                  calcDistance()
                  calcPrice()
                }}
                prevProvinceId={getValues("to_location.province_id")}
              />
            )}
            rules={{ required: true }}
          />
        </div>
        <br />

        <div className="ridse__form-location-item">
          <Controller
            control={control}
            name={"to_location"}
            render={({ field: { onChange, onBlur } }) => (
              <InputLocation
                isError={!!errors?.to_location?.province_id}
                type="to"
                onBlur={onBlur}
                value={
                  getValues("to_location")?.address ||
                  defaultValues?.to_location?.address ||
                  ""
                }
                label="Điểm đến"
                onChange={(location) => {
                  setToLocalStorage(ONE_WAY_TO_LOCATION, location)
                  onChange(location)
                  calcDistance()
                  calcPrice()
                }}
                prevProvinceId={getValues("from_location.province_id")}
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
              isError={!!errors?.car_id?.value}
              label=""
              onBlur={onBlur}
              onChange={(option) => {
                setToLocalStorage(ONE_WAY_CAR_ID, option)
                onChange(option)
                calcPrice()
              }}
              options={vehicleTypeOptions}
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
              value={defaultValues?.expected_going_on_date || ""}
              label=""
              onBlur={onBlur}
              onChange={(val) => {
                setToLocalStorage(ONE_WAY_EXPECTED_GOING_ON_DATE, val)
                onChange(val)
              }}
              isError={!!errors?.expected_going_on_date}
            />
          )}
          rules={{ required: true }}
        />
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
            setToLocalStorage(ONE_WAY_NOTE, e.target.value)
            setValue("note", e.target.value)
            calcPrice()
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
                onChange(handleTogglePolicy())
                onBlur()
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
                onChange(handleTogglePolicy())
                onBlur()
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
                handleSubmit((data) => {
                  onSubmitHandler(data)
                })
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
              handleSubmit((data) => {
                console.log("create")
                onSubmitHandler(data)
              })
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
