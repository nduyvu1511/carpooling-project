import { ItemSelect } from "@/components/inputs"
import { compoundingOrderList } from "@/helper"
import {
  CompoundingCarCustomerFilterForm,
  CompoundingFilterFormParams,
} from "@/models"
import { setScreenLoading } from "@/modules"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import Select from "react-select"
import { useAddress, useFetchCarType, useInputText } from "shared/hook"

type CompoundingFilterForm = CompoundingFilterFormParams &
  CompoundingCarCustomerFilterForm

interface CompoundingFilterFormProps {
  type: "driver" | "customer"
  onChange: (params: CompoundingFilterForm | undefined) => void
  defaultValues?: CompoundingFilterForm
}

export const CompoundingFilterForm = ({
  onChange,
  defaultValues,
  type,
}: CompoundingFilterFormProps) => {
  const dispatch = useDispatch()
  const { stateOptions, getProvinceOptionById } = useAddress(true)
  const { vehicleTypeOptions } = useFetchCarType()
  const { onChange: onChangeFromDate, value: valueFromDate } = useInputText()
  const { onChange: onChangeToDate, value: valueToDate } = useInputText()

  const provinces = useMemo(() => {
    return stateOptions()
  }, [])

  return (
    <div className="compounding__filter">
      <div className="compounding__filter-item">
        <h3 className="compounding__filter-title">Lọc theo</h3>

        <div className="compounding__filter-item-item">
          <h3 className="compounding__filter-item-title">Ngày đi</h3>
          <div className="form-select">
            <input
              className="form-item-input"
              defaultValue={defaultValues?.from_expected_going_on_date}
              value={valueFromDate}
              onChange={(e) => {
                onChangeFromDate(e)
                const { value } = e.target
                const val = {
                  ...defaultValues,
                  from_expected_going_on_date: value,
                }
                onChange(val)
              }}
              type="date"
              name=""
              id=""
            />
          </div>
        </div>

        <div className="compounding__filter-item-item">
          <h3 className="compounding__filter-item-title">Ngày về</h3>
          <div className="form-select">
            <input
              className="form-item-input"
              defaultValue={defaultValues?.to_expected_going_on_date}
              value={valueToDate}
              onChange={(e) => {
                onChangeToDate(e)
                const { value } = e.target
                const val = {
                  ...defaultValues,
                  to_expected_going_on_date: value,
                }
                onChange(val)
              }}
              type="date"
              name=""
              id=""
            />
          </div>
        </div>

        <div className="compounding__filter-item-item">
          <h3 className="compounding__filter-item-title">Xuất phát tại</h3>
          <div className="form-select">
            <Select
              placeholder="Từ tỉnh"
              options={provinces}
              defaultValue={getProvinceOptionById(
                Number(defaultValues?.from_province_id) || 0
              )}
              onChange={(data) => {
                if (!data?.value) return
                const val = {
                  ...defaultValues,
                  from_province_id: +data.value,
                }
                onChange(val)
              }}
            />
          </div>
        </div>

        <div className="compounding__filter-item-item">
          <h3 className="compounding__filter-item-title">Kết thúc tại</h3>
          <div className="form-select">
            <Select
              placeholder="Đến tỉnh"
              options={stateOptions()}
              onChange={(data) => {
                if (!data?.value) return
                onChange({
                  ...defaultValues,
                  to_province_id: +data.value,
                })
              }}
              defaultValue={getProvinceOptionById(
                Number(defaultValues?.to_province_id) || 0
              )}
            />
          </div>
        </div>

        <div className="compounding__filter-item-item">
          <h3 className="compounding__filter-item-title">Loại xe</h3>
          <div className="form-select">
            <Select
              placeholder="Chọn loại xe"
              onChange={(data) => {
                if (!data?.value) return
                const val = {
                  ...defaultValues,
                  car_id: Number(data.value),
                }
                onChange(val)
              }}
              options={vehicleTypeOptions()}
            />
          </div>
        </div>

        {type === "customer" ? (
          <div className="compounding__filter-item-item">
            <h3 className="compounding__filter-item-title">Số chỗ ngồi</h3>
            <div className="form-select">
              <Select
                placeholder="Chọn số chỗ"
                defaultValue={{ value: 1, label: "1 Chỗ" }}
                onChange={(data) => {
                  if (!data?.value) return
                  const val = {
                    ...defaultValues,
                    car_id: Number(data.value),
                  }
                  onChange(val)
                }}
                options={Array.from({ length: 16 }).map((_, index) => ({
                  label: `${index + 1} Chỗ`,
                  value: index + 1,
                }))}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="compounding__filter-item">
        <h3 className="compounding__filter-title">Sắp xếp theo</h3>

        <div className="compounding__filter-sort">
          {compoundingOrderList.map((item) => (
            <ItemSelect
              key={item.value}
              title={item.label}
              isChecked={item.value === defaultValues?.order_by}
              onCheck={() => {
                const val = {
                  ...defaultValues,
                  order_by: item.value,
                }

                if (item.value === "sort_by_distance") {
                  if (navigator?.geolocation) {
                    dispatch(setScreenLoading(true))
                    navigator.geolocation.getCurrentPosition(
                      ({ coords: { latitude, longitude } }) => {
                        console.log(latitude, longitude)
                        dispatch(setScreenLoading(false))

                        onChange({
                          ...val,
                          current_longitude: longitude + "",
                          current_latitude: latitude + "",
                        })
                      },
                      () => {
                        dispatch(setScreenLoading(false))
                      }
                    )
                  }
                } else {
                  onChange(val)
                }
              }}
            />
          ))}
        </div>
      </div>

      <div className="compounding__filter-item">
        <button
          onClick={() => {
            onChange(undefined)
          }}
          className="btn-primary compounding__filter-clear"
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>
  )
}
