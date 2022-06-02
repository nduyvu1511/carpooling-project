import { calendarIcon, userIcon } from "@/assets"
import { useRef, useState } from "react"
import { useClickOutside } from "shared/hook"
import { CalendarBox } from "../common"
import { InputQuantity } from "../inputs"
import { Modal } from "../modal"
import { InputRidesSearch } from "./inputRidesSearch"

export const RidesForm = () => {
  const calendarRef = useRef<HTMLDivElement>(null)
  const calendarBtnRef = useRef<HTMLDivElement>(null)
  const quantityRef = useRef<HTMLDivElement>(null)
  const quantityBtnRef = useRef<HTMLDivElement>(null)

  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [showQuantity, setShowQuantity] = useState<boolean>(false)
  const [showCalendarModal, setShowCalendarModal] = useState<boolean>(false)
  const [showQuantityModal, setShowQuantityModal] = useState<boolean>(false)

  const [quantity, setQuantity] = useState<number>(1)

  useClickOutside([calendarRef, calendarBtnRef], () => {
    setShowCalendar(false)
  })

  useClickOutside([quantityRef, quantityBtnRef], () => {
    setShowQuantity(false)
  })

  return (
    <>
      <div className="search__rides">
        <div className="search__rides-inner">
          {/* Search From */}
          <div className="search__rides-item search__rides-input search__rides-from">
            <InputRidesSearch
              type="from"
              onChange={(val) => console.log("From: ", val)}
            />
          </div>

          {/* Search To */}
          <div className="search__rides-item search__rides-input search__rides-to">
            <InputRidesSearch
              type="to"
              onChange={(val) => console.log("To: ", val)}
            />
          </div>

          <div className="search__rides-item search__rides-info">
            {/* Calendar */}
            <div className="search__rides-info-calendar hide-on-tablet-flex">
              <div
                onClick={() => setShowCalendar(!showCalendar)}
                ref={calendarBtnRef}
                className="search__rides-info-calendar-btn"
              >
                {calendarIcon()}
                <span>Hôm nay</span>
              </div>

              {showCalendar ? (
                <div ref={calendarRef}>
                  <CalendarBox />
                </div>
              ) : null}
            </div>

            <div
              onClick={() => setShowCalendarModal(true)}
              className="search__rides-info-calendar show-on-tablet-flex"
            >
              {calendarIcon()}
              <span>Hôm nay</span>
            </div>

            {/* Quantity */}
            <div className="rides__quantity hide-on-tablet-flex">
              <div
                className="rides__quantity-btn"
                ref={quantityBtnRef}
                onClick={() => setShowQuantity(!showQuantity)}
              >
                {userIcon()}
                <span>{quantity}</span>
              </div>

              {showQuantity ? (
                <div ref={quantityRef} className="rides__quantity-box">
                  <p className="rides__quantity-box-text">Số hành khách</p>
                  <InputQuantity
                    quantity={quantity}
                    onChangeQuantity={(q) => setQuantity(q)}
                  />
                </div>
              ) : null}
            </div>

            <div
              // ref={}
              onClick={() => setShowQuantityModal(!showQuantityModal)}
              className="rides__quantity show-on-tablet-flex"
            >
              {userIcon()}
              <span>{quantity}</span>
            </div>
          </div>
        </div>
        <div className="search__rides-item search__rides-button">
          <button className="btn-reset">Search</button>
        </div>
      </div>

      {showCalendarModal ? (
        <Modal
          className="calendar__modal"
          headerChildren={
            <h3 className="modal__mobile-header-heading">Hôm nay</h3>
          }
          mainChildren={<CalendarBox />}
          onClose={() => {
            setShowCalendarModal(false)
          }}
        />
      ) : null}

      {showQuantityModal ? (
        <Modal
          className="calendar__modal"
          headerChildren={
            <h3 className="modal__mobile-header-heading">
              {quantity} Hành khách
            </h3>
          }
          mainChildren={
            <div className="rides__quantity-large">
              <InputQuantity
                quantity={quantity}
                onChangeQuantity={(q) => setQuantity(q)}
              />
            </div>
          }
          onClose={() => {
            setShowQuantityModal(false)
          }}
        />
      ) : null}
    </>
  )
}
