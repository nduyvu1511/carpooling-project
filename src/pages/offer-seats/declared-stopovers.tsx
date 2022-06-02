import { ItemSelect, Modal, RideResultItem } from "@/components"
import LocationSelect from "@/components/location/locationSelect"
import { RideContainer } from "@/container"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"

const Stopovers = () => {
  const router = useRouter()
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <RideContainer
      showBtn
      onClick={() => router.push("/offer-seats/departure-date")}
      heading="Điểm dừng chân"
    >
      <div className="stopovers__container content-container">
        {showModal ? (
          <Modal
            view="small"
            onClose={() => setShowModal(false)}
            mainChildren={
              <div className="stopovers__location content-container">
                <div className="px-24">
                  <LocationSelect />
                </div>
                <div className="stopovers__result">
                  <ul className="stopovers__result__list">
                    <li className="stopovers__result__list-item">
                      <RideResultItem type="history" />
                    </li>
                    <li className="stopovers__result__list-item">
                      <RideResultItem type="history" />
                    </li>
                    <li className="stopovers__result__list-item">
                      <RideResultItem type="history" />
                    </li>
                  </ul>
                </div>
              </div>
            }
          />
        ) : null}

        <div className="stopovers__address">
          <ul className="stopovers__list">
            <li className="stopovers__list-item">
              <ItemSelect
                type="checkbox"
                title="55/4a Quốc lộ 1A, Bà Điểm, Hóc Môn"
                isChecked={true}
                onCheck={() => {}}
              />
            </li>
            <li className="stopovers__list-item">
              <ItemSelect
                type="checkbox"
                title="55/4a Quốc lộ 1A, Bà Điểm, Hóc Môn"
                isChecked={true}
                onCheck={() => {}}
              />
            </li>

            <div className="stopovers__list-item">
              <button
                onClick={() => setShowModal(true)}
                className="btn-primary-text stopovers__list-item-btn px-24"
              >
                Thêm địa điểm
              </button>
            </div>
          </ul>
        </div>
      </div>
    </RideContainer>
  )
}

export default Stopovers
