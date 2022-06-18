import { CountdownMinute, ItemSelect } from "@/components"
import { RideContainer } from "@/container"
import { formatMoneyVND } from "@/helper"
import moment from "moment"
import React from "react"
import { useFetchCompoundingCarCustomer } from "shared/hook"

const Checkout = () => {
  const { isValidating, data: compoundingCar } =
    useFetchCompoundingCarCustomer()

  const targetDate = moment(new Date(), "DD/MM/YYYY hh:mm:ss")
    .add(compoundingCar?.seconds_remains, "seconds")
    .toString()

  console.log(compoundingCar)

  return (
    <RideContainer heading="Đặt cọc cho chuyến đi">
      <div className="rides__checkout">
        <div className="content-container px-24">
          <div className="rides__checkout-header">
            <h3 className="rides__checkout-header-title">
              Vui lòng đặt cọc số tiền <span>{formatMoneyVND(120000)}</span> để
              hoàn tất giao dịch
            </h3>

            <div className="rides__checkout-header-remains px-24">
              <span className="rides__checkout-header-remains-l">
                Thời gian còn lại:{" "}
              </span>
              <CountdownMinute targetDate={targetDate} />
            </div>

            <br />

            <div className="rides__checkout-list">
              <ItemSelect isChecked={true} onCheck={() => {}} title="VNPAY" />
              <ItemSelect
                isChecked={true}
                onCheck={() => {}}
                title="Thanh toán cho tài xế"
              />
            </div>
          </div>
        </div>
      </div>
    </RideContainer>
  )
}

export default Checkout
