/* eslint-disable react-hooks/exhaustive-deps */
import { Alert } from "@/components/dialog"
import { Map } from "@/components/map"
import { Modal } from "@/components/modal"
import { carpoolingCompoundingCarSchema } from "@/core/schema"
import {
  CARPOOLING_CAR_ID,
  CARPOOLING_DISTANCE,
  CARPOOLING_EXPECTED_GOING_ON_DATE,
  CARPOOLING_FROM_LOCATION,
  CARPOOLING_FROM_STATION,
  CARPOOLING_IS_CHECKED_POLICY,
  CARPOOLING_NOTE,
  CARPOOLING_NUMBER_SEAT,
  CARPOOLING_PRICE_PER_PASSENGER,
  CARPOOLING_TO_STATION,
  formatMoneyVND,
  setToLocalStorage
} from "@/helper"
import {
  CreateCarpoolCompoundingNoToken,
  CreateCarpoolingCompoundingForm,
  NumberSeatOptionModel
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { MdOutlineDateRange } from "react-icons/md"
import { RiCarWashingLine } from "react-icons/ri"
import { useDispatch } from "react-redux"
import Select from "react-select"
import { notify } from "reapop"
import { useCompoundingForm } from "shared/hook"
import { InputCarType, InputCheckbox, InputDateTime, InputStation } from "../../inputs"

interface CarpoolingCompoundingFormProps {
  onSubmit: (params: CreateCarpoolCompoundingNoToken & { mode: "update" | "create" }) => void
  defaultValues?: CreateCarpoolingCompoundingForm
  mode?: "create" | "update"
  type?: "new" | "existed"
  limitNumberSeat?: number
}

export const CarpoolingCompoundingForm = ({
  onSubmit,
  defaultValues,
  mode = "create",
  type = "new",
  limitNumberSeat,
}: CarpoolingCompoundingFormProps) => {
  const dispatch = useDispatch()
  const modeRef = useRef<"create" | "update">("create")
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors, isValid, isDirty },
    control,
  } = useForm<CreateCarpoolingCompoundingForm>({
    resolver: yupResolver(carpoolingCompoundingCarSchema),
    mode: "all",
    defaultValues,
  })
  const {
    vehicleTypeOptions,
    seats,
    calcPriceFromProvinceIds,
    calculateDistanceBetweenTwoCoordinates,
  } = useCompoundingForm()
  const [numberSeat, setNumberSeat] = useState<number>(
    limitNumberSeat || getValues("car_id.number_seat")
  )
  const [distance, setDistance] = useState<number>(getValues("distance"))
  const [price, setPrice] = useState<number>(getValues("price_per_passenger") || 0)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [showMap, setShowMap] = useState<boolean>(false)
  const [isPickingFromStart, setPickingFromStart] = useState<boolean>()

  const calcDistance = () => {
    const fromStation = getValues("from_station")
    const toStation = getValues("to_station")
    if (!fromStation?.province_id || !toStation?.province_id) return

    calculateDistanceBetweenTwoCoordinates({
      params: {
        origin: { lat: +fromStation.lat, lng: +fromStation.lng },
        destination: { lat: +toStation.lat, lng: +toStation.lng },
      },
      onSuccess: (distance) => {
        setToLocalStorage(CARPOOLING_DISTANCE, distance)
        setValue("distance", distance)
        setDistance(distance)
      },
    })
  }

  const handleGetFromLocation = () => {
    const value = getValues("from_location")?.province_id
    if (value) {
      setPickingFromStart(false)
      setValue("from_location", undefined)
      setToLocalStorage(CARPOOLING_FROM_LOCATION, undefined)
    } else {
      setShowAlert(true)
    }
  }

  const calcPrice = async () => {
    const fromLocation = getValues("from_station")
    const toLocation = getValues("to_station")
    const carId = getValues("car_id")
    if (!fromLocation?.province_id || !toLocation?.province_id || !carId?.value) return
    calcPriceFromProvinceIds({
      params: {
        car_id: +carId.value,
        from_province_id: fromLocation.province_id,
        to_province_id: toLocation.province_id,
      },
      onSuccess: (data) => {
        setValue("price_per_passenger", data)
        setToLocalStorage(CARPOOLING_PRICE_PER_PASSENGER, data)
        setPrice(data)
      },
    })
  }

  const onSubmitHandler = (data: CreateCarpoolingCompoundingForm) => {
    const params: CreateCarpoolCompoundingNoToken & {
      mode: "update" | "create"
    } = {
      car_id: Number(data.car_id.value),
      compounding_type: "compounding",
      distance: data.distance,
      expected_going_on_date: data.expected_going_on_date,
      from_address: data.from_station.address,
      from_latitude: data.from_station.lat + "",
      from_longitude: data.from_station.lng + "",
      to_address: data.to_station.address,
      to_latitude: data.to_station.lat + "",
      to_longitude: data.to_station.lng + "",
      from_province_id: data.from_station.province_id,
      to_province_id: data.to_station.province_id,
      note: data?.note || "",
      from_pick_up_station_id: data.from_station.station_id,
      is_picking_up_from_start: !!data?.from_location?.province_id,
      number_seat: Number(data.number_seat.value),
      to_pick_up_station_id: data.to_station.station_id,
      price_per_passenger: data.price_per_passenger,
      mode: modeRef.current,
    }
    onSubmit(params)
  }

  const handleTogglePolicy = (): boolean | undefined => {
    const isChecked = getValues("is_checked_policy")
    if (!isChecked) {
      clearErrors("is_checked_policy")
      setToLocalStorage(CARPOOLING_IS_CHECKED_POLICY, true)
      return true
    }
    setToLocalStorage(CARPOOLING_IS_CHECKED_POLICY, undefined)
    return
  }

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmitHandler(data)
        })}
        className="rides__form"
      >
        <div className="rides__form-location">
          <div className="rides__form-location-item">
            <label className="form-item-label">
              <HiOutlineLocationMarker />
              ?????a ??i???m
            </label>

            <Controller
              control={control}
              name={"from_station"}
              render={({ field: { onChange, onBlur } }) => (
                <InputStation
                  prevProvinceId={getValues("to_station.province_id")}
                  isError={!!errors?.from_station}
                  type="from"
                  value={getValues("from_station")?.station_name}
                  label="??i???m ??i"
                  onChange={(location) => {
                    setToLocalStorage(CARPOOLING_FROM_STATION, location)
                    onChange(location)
                    calcDistance()
                  }}
                  defaultValue={getValues("from_station")}
                />
              )}
              rules={{ required: true }}
            />

            {type === "new" ? (
              <>
                {getValues("from_station")?.province_id ? (
                  <div className="rides__form-remind">
                    <InputCheckbox
                      size={17}
                      onCheck={handleGetFromLocation}
                      isChecked={!!getValues("from_location")?.province_id}
                    />
                    <p onClick={handleGetFromLocation}>
                      ????n t???n n??i
                      <span>(Chi ph?? ph??t sinh th??m v???i t??i x???)</span>
                    </p>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>

          <div className="rides__form-location-item">
            <Controller
              control={control}
              name={"to_station"}
              render={({ field: { onChange, onBlur } }) => (
                <InputStation
                  prevProvinceId={getValues("from_station.province_id")}
                  isError={!!errors?.to_station}
                  type="to"
                  value={
                    getValues("to_station")?.station_name ||
                    defaultValues?.to_station?.address ||
                    ""
                  }
                  label="??i???m ?????n"
                  onChange={(location) => {
                    setToLocalStorage(CARPOOLING_TO_STATION, location)
                    onChange(location)
                    calcDistance()
                    calcPrice()
                  }}
                  defaultValue={getValues("to_station")}
                />
              )}
              rules={{ required: true }}
            />
          </div>

          <div className="rides__form-location-info">
            {price ? (
              <p className="rides__form-location-info-price">Gi??: {formatMoneyVND(price || 0)}</p>
            ) : null}
            {distance ? (
              <p className="rides__form-location-info-distance">
                Qu??ng ???????ng: {distance.toFixed(2)}km
              </p>
            ) : null}
          </div>
        </div>

        <div
          style={{
            opacity: type === "new" ? 1 : 0.7,
            pointerEvents: type === "new" ? "unset" : "none",
          }}
          className="form-item"
        >
          <label htmlFor="car_id" className="form-item-label">
            <RiCarWashingLine />
            Lo???i xe
          </label>

          <Controller
            control={control}
            name={"car_id"}
            render={({ field: { onChange, onBlur } }) => (
              <InputCarType
                value={getValues("car_id") || defaultValues?.car_id}
                isError={!!errors?.car_id}
                label="Ch???n lo???i xe"
                onBlur={onBlur}
                onChange={(option) => {
                  if (getValues("number_seat")?.value >= (option as any).number_seat) {
                    setValue("number_seat", undefined as any)
                    dispatch(notify("Vui l??ng ch???n l???i s??? h??nh kh??ch", "error"))
                  }
                  setNumberSeat((option as any).number_seat)
                  setToLocalStorage(CARPOOLING_CAR_ID, option)
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
            Ng??y kh???i h??nh
          </label>

          <Controller
            control={control}
            name={"expected_going_on_date"}
            render={({ field: { onChange, onBlur } }) => (
              <InputDateTime
                value={getValues("expected_going_on_date")}
                label=""
                onBlur={onBlur}
                onChange={(val) => {
                  setToLocalStorage(CARPOOLING_EXPECTED_GOING_ON_DATE, val)
                  onChange(val)
                }}
                subtractHoursToSeven
                isError={!!errors?.expected_going_on_date}
              />
            )}
            rules={{ required: true }}
          />
        </div>

        <div className="form-item">
          <label htmlFor={"number_seat"} className="form-item-label">
            <RiCarWashingLine />
            S??? gh???
          </label>
          <Controller
            control={control}
            name={"number_seat"}
            render={({ field: { onChange, onBlur } }) => (
              <Select
                placeholder="S??? gh???"
                options={seats(limitNumberSeat || numberSeat || 0) as NumberSeatOptionModel[]}
                onChange={(val) => {
                  if (!val?.value) return
                  setToLocalStorage(CARPOOLING_NUMBER_SEAT, val)
                  onChange({ ...val, value: Number(val.value) })
                  setValue("number_seat", val)
                }}
                onBlur={onBlur}
                defaultValue={getValues("number_seat")}
                id={"number_seat"}
                className={`${errors?.number_seat ? "form-item-select-error" : ""}`}
              />
            )}
            rules={{ required: true }}
          />

          {errors?.number_seat ? (
            <p className="form-item-input-text-error">Vui l??ng nh???p tr?????ng n??y</p>
          ) : null}
        </div>

        <div className="form-item">
          <label htmlFor="car_id" className="form-item-label">
            <RiCarWashingLine />
            Ghi ch?? cho chuy???n ??i
          </label>

          <textarea
            {...register}
            className="form-textarea form-item-input"
            name="note"
            id="note"
            cols={10}
            placeholder="Ghi ch?? th??m cho chuy???n ??i..."
            defaultValue={getValues("note")}
            onChange={(e) => {
              setValue("note", e.target.value)
              setToLocalStorage(CARPOOLING_NOTE, e.target.value)
            }}
          ></textarea>
        </div>

        {mode === "create" ? (
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
                    errors?.is_checked_policy ? "form-item-label-policy-text-error" : ""
                  }`}
                  onClick={() => {
                    onBlur()
                    onChange(handleTogglePolicy())
                  }}
                >
                  T??i ?????ng ?? v???i t???t c??? ??i???u kho???n
                </span>
              </div>
            )}
            rules={{ required: true }}
          />
        ) : null}

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
                L??u Ch???nh s???a
              </button>
            ) : null}

            <button
              onClick={() => {
                modeRef.current = "create"
                handleSubmit((data) => {
                  onSubmitHandler(data)
                })
              }}
              className={`btn-primary rides__form-submit ${!isValid ? "btn-not-allowed" : ""}`}
            >
              {mode === "create" ? "Ti???p t???c" : "X??c nh???n"}
            </button>
          </div>
        </div>
      </form>

      {showAlert ? (
        <Alert
          heading="Nh???c nh???"
          onClose={() => setShowAlert(false)}
          onConfirm={() => {
            setShowAlert(false)
            setShowMap(true)
          }}
          title="N???u ??i gh??p, Exxe ch??? c?? th??? cung c???p c??c tr???m ????n tr??n m???i t???nh, n???u b???n ch???n ????n t???n n??i, chi ph?? ph??t sinh n??y s??? ???????c b???n v?? t??i x??? gi???i quy???t"
        />
      ) : null}

      {showMap ? (
        <Modal onClose={() => setShowMap(false)} title="Ch???n ??i???m ????n t???i">
          <Map
            defaultLocation={{
              address: getValues("from_station.address"),
              lat: +getValues("from_station.lat"),
              lng: +getValues("from_station.lng"),
              province_id: getValues("from_station.province_id"),
            }}
            prevProvinceId={getValues("to_station.province_id")}
            onChooseLocation={(location) => {
              setValue("from_location", location)
              setPickingFromStart(true)
              setToLocalStorage(CARPOOLING_FROM_LOCATION, location)
              setShowMap(false)
            }}
          />
        </Modal>
      ) : null}
    </>
  )
}
