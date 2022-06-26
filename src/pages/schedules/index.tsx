import { CompoundingFilterForm, RidesItem } from "@/components"
import { RideContainer } from "@/container"
import { useRouter } from "next/router"
import React from "react"
import { useCompoundingCarDriverList } from "shared/hook"

const Schedules = () => {
  const router = useRouter()
  const { data: carpoolingList, isLimit } = useCompoundingCarDriverList({})

  return (
    <RideContainer heading="Lịch trình sắp tới">
      <div className="schedules-container px-24 container">
        <div className="schedules__inner">
          <div className="schedules__inner-left">
            <CompoundingFilterForm
              type="customer"
              onChange={(data) => {
                console.log(data)
              }}
            />
          </div>
          <div className="schedules__inner-right">
            {carpoolingList?.length > 0 &&
              carpoolingList.map((item) => (
                <RidesItem
                  onClick={() => {
                    router.push("/schedules/12")
                  }}
                  key={item.compounding_car_id}
                  rides={item}
                />
              ))}
          </div>
        </div>
      </div>
    </RideContainer>
  )
}

export default Schedules
