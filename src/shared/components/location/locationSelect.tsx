import { Input } from "@/components"
import { provinces } from "@/helper"
import { setOpenMapModal } from "@/modules"
import { useRouter } from "next/router"
import { useState } from "react"
import { BiCurrentLocation } from "react-icons/bi"
import { useDispatch } from "react-redux"
import Select from "react-select"

interface LocationSelectProps {
  onChooseLocation?: Function
}

const LocationSelect = ({ onChooseLocation }: LocationSelectProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState(null)


  return (
    <div className="location">
      <div className="location-select">
        <Select
          placeholder="Chọn tỉnh"
          defaultValue={selectedOption}
          onChange={(data) => {}}
          options={provinces}
        />
      </div>

      <div className="location-search">
        <Input
          attributes={{
            placeholder: "Trần Hưng Đạo...",
          }}
          onChange={(text) => console.log(text)}
        />
        <button
          onClick={() => dispatch(setOpenMapModal(true))}
          className="btn-reset"
        >
          <BiCurrentLocation />
        </button>
      </div>
    </div>
  )
}

export default LocationSelect
