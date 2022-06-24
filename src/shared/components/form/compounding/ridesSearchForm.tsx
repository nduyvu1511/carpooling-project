import { useRef } from "react"
import Select from "react-select"
import { useAddressOptions, useCompoundingForm } from "shared/hook"

export const RidesSearchForm = () => {
  const ref = useRef<HTMLInputElement>(null)
  const { vehicleTypeOptions } = useCompoundingForm()
  const { provinceOptions } = useAddressOptions()

  return (
    <div className="search__rides">
      <div className="search__rides-inner">
        {/* Search From */}
        <div className="search__rides-item search__rides-input search__rides-from">
          <Select options={provinceOptions} />
        </div>

        {/* Search To */}
        <div className="search__rides-item search__rides-input search__rides-to">
          <Select options={provinceOptions} />
        </div>

        <div className="search__rides-item search__rides-vehicle">
          <Select placeholder="Loại xe" options={vehicleTypeOptions} />
        </div>

        <div className="search__rides-item search__rides-calendar">
          <div className="search__rides-info-calendar">
            <input
              ref={ref}
              className="search__rides-info-calendar-input"
              type="date"
              name=""
              id=""
              placeholder="Chọn ngày"
            />
          </div>
        </div>
      </div>
      <div className="search__rides-item search__rides-button">
        <button className="btn-reset">Tìm Chuyến Đi</button>
      </div>
    </div>
  )
}
