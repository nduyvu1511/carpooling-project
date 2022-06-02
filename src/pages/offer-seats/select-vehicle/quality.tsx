import { Tag } from "@/components"
import { RideContainer } from "@/container"
import { ratings } from "@/helper"
import { useRouter } from "next/router"
import { useState } from "react"
import { AiFillStar } from "react-icons/ai"
import Select from "react-select"

const SelectQuality = () => {
  const router = useRouter()
  const [star, setStar] = useState<3 | 4 | 5>()

  return (
    <RideContainer
      onClick={() => router.push("/offer-seats/comment")}
      showBtn
      heading="Chọn chất lượng"
    >
      <div className="rides-quality__container">
        <div className="content-container px-24 rides__quality">
          <ul className="rides__quality-list">
            <div className="select-large">
              <Select
                placeholder="Chọn loại xe"
                defaultValue={null}
                onChange={(data) => {}}
                options={ratings}
              />
            </div>
          </ul>
        </div>
      </div>
    </RideContainer>
  )
}

export default SelectQuality
