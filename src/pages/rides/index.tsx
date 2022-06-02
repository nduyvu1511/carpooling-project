import { busIcon, carIcon, closeIcon } from "@/assets"
import { RidesFilter, RidesItem } from "@/components"
import { DEFAULT_TRANSITION, toggleHTMLOverflow } from "@/helper"
import { MainNoFooter } from "@/layout"
import { useState } from "react"
import { useTransition, animated } from "react-spring"

export const Rides = () => {
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false)
  const transition = useTransition(showFilterModal, DEFAULT_TRANSITION)

  const toggleShowFilterModal = () => {
    if (showFilterModal) {
      toggleHTMLOverflow("unset")
    } else {
      toggleHTMLOverflow("hidden")
    }
  }

  return (
    <section className="rides-available__container">
      <div className="container rides__available">
        <aside className="rides__available-left">
          <RidesFilter />
        </aside>

        <div className="rides__available-right">
          <div className="rides__vehicle-filter">
            <ul className="rides__vehicle-filter-list">
              <li className="rides__vehicle-filter-list-item">
                <div className="rides__vehicle-filter-item rides__vehicle-filter-item-active">
                  Tất cả
                  <span className="rides__vehicle-filter-item-quantity">2</span>
                </div>
              </li>
              <li className="rides__vehicle-filter-list-item">
                <div className="rides__vehicle-filter-item">
                  {carIcon()}
                  <span className="rides__vehicle-filter-item-quantity">3</span>
                </div>
              </li>
              <li className="rides__vehicle-filter-list-item">
                <div className="rides__vehicle-filter-item">
                  {busIcon()}
                  <span className="rides__vehicle-filter-item-quantity">1</span>
                </div>
              </li>
              <li className="rides__vehicle-filter-list-item">
                <div className="rides__vehicle-filter-item">
                  {busIcon()}
                  <span className="rides__vehicle-filter-item-quantity">4</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="rides-list__container">
            <ul className="rides__list">
              <li className="rides__list-item">
                <RidesItem />
              </li>

              <li className="rides__list-item">
                <RidesItem />
              </li>

              <li className="rides__list-item">
                <RidesItem />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          setShowFilterModal(true)
          toggleShowFilterModal()
        }}
        className="btn-primary rides__page-btn"
      >
        Lọc
      </button>

      {transition((style, show) =>
        show ? (
          <animated.section className="rides__filter-modal px-24" style={style}>
            <div className="rides__filter-modal-header px-24">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowFilterModal(false)
                  toggleShowFilterModal()
                }}
                className="btn-reset"
              >
                {closeIcon(20, "#00AFF5")}
              </button>

              <button className="btn-primary-text rides__available-left-btn">
                Xóa bộ lọc
              </button>
            </div>
            <RidesFilter />
          </animated.section>
        ) : null
      )}
    </section>
  )
}

Rides.Layout = MainNoFooter

export default Rides
