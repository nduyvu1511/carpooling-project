import { ItemSelect } from "@/components"
import { RideContainer } from "@/container"
import { setScreenLoading } from "@/modules"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useToken } from "shared/hook"

const CheckoutOptions = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { token } = useToken()
  const { compounding_car_customer_id } = router.query
  const [paymentType, setPaymentType] = useState<"cash" | "transfer">()

  const handleCheckoutMethod = async () => {
    if (!token || !paymentType) return
    try {
      dispatch(setScreenLoading(true))
      const res: any = await ridesApi.payForRemainingAmount({
        compounding_car_customer_id: Number(compounding_car_customer_id),
        token,
        payment_method: paymentType,
      })
      dispatch(setScreenLoading(false))
      if (!res?.result?.success) return
      if (paymentType === "cash") {
        dispatch(
          notify("Chọn phương thức thanh toán thành công, Vui lòng chờ tài xế xác nhận", "success")
        )
        router.push("/")
      } else {
        router.push(
          `/order-done/checkout?compounding_car_customer_id=${compounding_car_customer_id}`
        )
      }
    } catch (error) {
      dispatch(setScreenLoading(false))
    }
  }

  if (!compounding_car_customer_id) return null
  return (
    <RideContainer heading="Chọn phương thức thanh toán">
      <div className="checkout-done-options">
        <div className="content-container px-24">
          <ItemSelect
            isChecked={paymentType === "cash"}
            title="Thanh toán bằng tiền mặt"
            onCheck={() => setPaymentType("cash")}
          />

          <ItemSelect
            isChecked={paymentType === "transfer"}
            title="Thanh toán online"
            onCheck={() => setPaymentType("transfer")}
          />
          <br />

          <button
            onClick={handleCheckoutMethod}
            style={{ margin: "0 auto" }}
            className={`btn-primary ${!paymentType ? "btn-disabled" : ""}`}
          >
            Tiến hành thanh toán
          </button>
        </div>
      </div>
    </RideContainer>
  )
}

export default CheckoutOptions
