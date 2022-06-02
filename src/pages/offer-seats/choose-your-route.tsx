import { ItemSelect, Map } from "@/components"
import { RideContainer } from "@/container"
import { useRouter } from "next/router"
import React from "react"

const Route = () => {
  const router = useRouter()

  return (
    <RideContainer
      showBtn
      onClick={() => router.push("/offer-seats/declared-stopovers")}
      showPadding={false}
      heading="Chọn tuyến"
    >
      <div className="route__container grid grid-col-sm-2 grid-col-1">
        <div className="route__container-left">
          <div className="route__left">
            <div className="route__inner">
              <ul className="route__list">
                <li className="route__list-item">
                  <ItemSelect
                    title="55/4a Quốc lộ 1A, Bà Điểm, Hóc Môn"
                    isChecked={true}
                    onCheck={() => {}}
                  />
                </li>

                <li className="route__list-item">
                  <ItemSelect
                    title="55/4a Quốc lộ 1A, Bà Điểm, Hóc Môn"
                    isChecked={false}
                    onCheck={() => {}}
                  />
                </li>

                <li className="route__list-item">
                  <ItemSelect
                    title="55/4a Quốc lộ 1A, Bà Điểm, Hóc Môn"
                    isChecked={false}
                    onCheck={() => {}}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="route__container-right">
          <Map />
        </div>
      </div>
    </RideContainer>
  )
}

export default Route
