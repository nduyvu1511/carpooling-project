import { FormContainer } from "@/container"
import { RootState } from "@/core/store"
import { formatMoneyVND, getTimes } from "@/helper"
import { CreateOneWayCompoundingNoToken } from "@/models"
import {
  ExpectedDateParams,
  RidesFormSlice,
  setCarId,
  setExpectedGoingOnDate,
  setNumberSeat,
  setRidesNote,
} from "@/modules"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import { FiEdit } from "react-icons/fi"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { MdOutlineDateRange } from "react-icons/md"
import { RiCarWashingLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { useToken } from "shared/hook"
import { Toggle } from "../common"
import { InputCheckbox } from "../inputs"
import InputLocation from "../inputs/inputLocation"

interface OneWayCompoundingFormProps {
  onSubmit: (params: CreateOneWayCompoundingNoToken) => void
}

export const OneWayCompoundingForm = ({
  onSubmit,
}: OneWayCompoundingFormProps) => {
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
    // defaultValues,
  })

  const [price, setPrice] = useState<number>()
  const [readOnly, setReadOnly] = useState<boolean>(mode === "update")

  return (
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
                <p className="form-item-input-text-error">Vui lòng điểm đến</p>
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
  )
}
