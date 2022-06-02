import { RideContainer } from "@/container"
import { getTimes } from "@/helper"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import Select from "react-select"

const DepartureTime = () => {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState(null)
  const times = getTimes()

  return (
    <RideContainer
      showBtn
      onClick={() => router.push("/offer-seats/select-vehicle")}
      heading="Chọn giờ"
    >
      <div className="departure-time__container content-container px-24">
        <div className="departure-time__inner">
          <div className="select-large">
            <Select
              placeholder="Chọn giờ"
              defaultValue={times[48]}
              onChange={(data) => {}}
              options={times}
            />
          </div>
        </div>
      </div>
    </RideContainer>
  )
}

export default DepartureTime
