import { CalendarBox, InputCheckbox, SuccessScreen, Tag } from "@/components"
import LocationSelect from "@/components/location/locationSelect"
import { RideContainer } from "@/container"
import { formatMoneyVND, models } from "@/helper"
import { setOpenPromotionModal } from "@/modules"
import { useState } from "react"
import { AiFillStar } from "react-icons/ai"
import { useDispatch } from "react-redux"
import Select from "react-select"

const OfferSeat = () => {
  const dispatch = useDispatch()

  const [checkedPickup, setCheckedPickup] = useState<boolean>(false)
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [model, setModel] = useState(null)
  const [star, setStar] = useState<3 | 4 | 5>()
  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false)

  return (
    <RideContainer
      btnLabel="Xác nhận"
      showBtn={true}
      onClick={() => setShowSuccessScreen(true)}
      heading="Xác nhận"
    >
      <section className="booking">
        <div className="booking__inner px-24 content-container">
          <h1 className="booking-heading">Xác nhận thông tin của chuyến đi</h1>

          <div className="booking__form">
            <div className="booking__form-item booking__form-location">
              <label htmlFor="">Điểm đến</label>
              <LocationSelect />
            </div>

            <div
              style={{ justifyContent: "space-between" }}
              className="booking__form-item booking__form-item-inline"
            >
              <div className="booking__form-item-checkbox">
                <label
                  style={{ width: "unset" }}
                  onClick={() => setCheckedPickup(!checkedPickup)}
                  className="cursor-pointer"
                >
                  Đưa đến tận nơi
                </label>
                <InputCheckbox
                  isChecked={checkedPickup}
                  onCheck={() => setCheckedPickup(!checkedPickup)}
                />
              </div>

              <button
                onClick={() => dispatch(setOpenPromotionModal(true))}
                className="btn-primary-text"
              >
                Chọn khuyến mãi
              </button>
            </div>

            <div className="booking__form-item booking__form-item-inline">
              <label
                onClick={() => setShowCalendar(!showCalendar)}
                className="cursor-pointer"
              >
                Thời gian xuất phát dự kiến
              </label>
              <div className="booking__form-item-calendar">
                date
                {showCalendar ? (
                  <div className="booking__form-item-calendar-absolute">
                    <CalendarBox />
                  </div>
                ) : null}
              </div>
            </div>

            <div className="booking__form-item booking__form-item-inline">
              <label>Chọn loại xe</label>
              <Select
                placeholder="Chọn hãng xe"
                defaultValue={model}
                onChange={(data) => {}}
                options={models}
              />
            </div>

            <div className="booking__form-item booking__form-item-inline">
              <label className="cursor-pointer">Chất lượng xe</label>

              <ul className="tag__list">
                {[3, 4, 5].map((_star, index) => (
                  <li key={index} className="tag__list-item">
                    <Tag
                      onClick={() => setStar(_star as 3 | 4 | 5)}
                      icon={<AiFillStar />}
                      value={_star}
                      label={`${_star} sao`}
                      active={_star === star}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="booking__form-item booking__form-item-inline">
              <label className="booking__form-item-title">
                Chi phí đưa đến tận nơi:
              </label>
              <p className="booking__form-item-result">
                {formatMoneyVND(500000)}
              </p>
            </div>

            <div className="booking__form-item booking__form-item-inline">
              <label className="booking__form-item-title">Tổng chi phí:</label>
              <p className="booking__form-item-result">
                {formatMoneyVND(500000)}
              </p>
            </div>

            <div className="booking__form-item booking__form-item-inline">
              <label className="booking__form-item-title">
                Tiền thanh toán tối thiểu:
              </label>

              <p className="booking__form-item-result">
                {formatMoneyVND(500000)}
              </p>
            </div>

            <div className="booking__form-item booking__form-item-inline">
              <label className="cursor-pointer">Quy định</label>
              <textarea
                name=""
                id=""
                className="form-textarea"
                rows={4}
              ></textarea>
            </div>

            {/* <div className="booking__form-item">
              <button className="btn-primary booking__form-item-submit">
                Xác nhận
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {showSuccessScreen ? (
        <SuccessScreen
          title="Tạo chuyến đi thành công, bây giờ, hành khách có thể thấy và đi với bạn"
          onClick={() => {
            setShowSuccessScreen(false)
          }}
        />
      ) : null}
    </RideContainer>
  )
}

export default OfferSeat
