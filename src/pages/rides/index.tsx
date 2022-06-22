import { closeIcon } from "@/assets"
import { InfiniteScrollWrapper, RidesFilter, RidesItem } from "@/components"
import { DEFAULT_TRANSITION, toggleBodyOverflow } from "@/helper"
import { MainNoFooter } from "@/layout"
import { useRouter } from "next/router"
import { useState } from "react"
import { animated, useTransition } from "react-spring"
import { useCarpoolingList } from "shared/hook"

export const Rides = () => {
  const router = useRouter()
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false)
  const transition = useTransition(showFilterModal, DEFAULT_TRANSITION)
  const { data: carpoolingList, isValidating } = useCarpoolingList({
    token: "",
    limit: 12,
  })

  const toggleShowFilterModal = () => {
    if (showFilterModal) {
      toggleBodyOverflow("unset")
    } else {
      toggleBodyOverflow("hidden")
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
            {/* <ul className="rides__vehicle-filter-list">
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
            </ul> */}
          </div>
          <InfiniteScrollWrapper
            isLoading={isValidating}
            onBottom={() => {
              router.push({
                pathname: router.pathname,
                query: {
                  ...router.query,
                  offset: (Number(router.query?.offset) || 0) + 12,
                },
              })
            }}
          >
            <div className="rides__list grid grid-col-1 grid-col-sm-2 grid-col-lg-3">
              {carpoolingList.map((item, index) => (
                <RidesItem rides={item} key={index} />
              ))}
            </div>
          </InfiniteScrollWrapper>
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
