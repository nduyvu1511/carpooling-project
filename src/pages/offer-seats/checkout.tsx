import { CountdownCompounding, ItemSelect } from "@/components"
import { RideContainer } from "@/container"
import {
  COMPOUNDING_VNPAY_CODE,
  formatMoneyVND,
  setToSessionStorage,
} from "@/helper"
import { CreateCompoundingCarRes, PaymentRes } from "@/models"
import { ridesApi } from "@/services"
import moment from "moment"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import { RiLoader4Line } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { usePayment, useToken } from "shared/hook"

const Checkout = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = useToken()
  const {
    paymentList,
    createPayment,
    isPaymentListLoading,
    setCurrentSelectPayment,
    currentSelectPayment,
    getCompoundingCarCustomerDetail,
  } = usePayment(false)

  const [compoundingCar, setCompoundingCar] =
    useState<CreateCompoundingCarRes>()

  const { compounding_car_customer_id, vnp_ResponseCode } = useMemo(() => {
    return router.query
  }, [router.query])
  const targetDate = useMemo(() => {
    return moment(new Date(), "DD/MM/YYYY hh:mm:ss")
      .add(compoundingCar?.second_remains, "seconds")
      .toString()
  }, [compoundingCar])

  // Get compounding detail
  useEffect(() => {
    if (!compounding_car_customer_id || !token) return
    console.log("fetch detail")
    getCompoundingCarCustomerDetail(
      Number(compounding_car_customer_id),
      (data) => {
        setCompoundingCar(data)
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compounding_car_customer_id, token])

  // Check valid of transaction
  useEffect(() => {
    if (!compounding_car_customer_id || !token || !compoundingCar?.state) return
    if (!vnp_ResponseCode) return
    if (vnp_ResponseCode !== "00") {
      dispatch(notify("Giao dịch thất bại, vui lòng thử lại sau", "error"))
      return
    }
    getCompoundingCarCustomerDetail(
      Number(compounding_car_customer_id),
      (data) => {
        if (data?.state === "deposit") {
          dispatch(notify("Thanh toán thành công", "success"))
          router.push("/offer-seats/checkout-success")
        }
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compounding_car_customer_id, vnp_ResponseCode, token])

  const handleConfirmTransaction = () => {
    if (
      !currentSelectPayment?.acquirer_id ||
      !compoundingCar?.compounding_car_customer_id
    )
      return

    createPayment({
      params: {
        acquirer_id: currentSelectPayment.acquirer_id,
        returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}${router.asPath}`,
        compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
        token,
      },
      onSuccess: (data) => {
        window
          .open(data.vnpay_payment_url, "name", "height=600,width=800")
          ?.focus()
        setToSessionStorage(COMPOUNDING_VNPAY_CODE, data.vnpay_code)
      },
    })
  }

  if (!compoundingCar) return null
  return (
    <RideContainer heading="Đặt cọc cho chuyến đi">
      <div className="rides__checkout">
        <div className="content-container px-24">
          <div className="rides__checkout-header">
            <h3 className="rides__checkout-header-title">
              Vui lòng đặt cọc số tiền{" "}
              <span>{formatMoneyVND(compoundingCar.down_payment)}</span> để hoàn
              tất giao dịch
            </h3>

            <div className="rides__checkout-header-remains px-24">
              <span className="rides__checkout-header-remains-l">
                Thời gian còn lại:
              </span>
              {compoundingCar.state !== "deposit" ? (
                <CountdownCompounding
                  type={compoundingCar.compounding_type}
                  targetDate={targetDate}
                />
              ) : null}
            </div>

            {!isPaymentListLoading ? (
              <>
                <div className="rides__checkout-list py-12">
                  {paymentList?.length > 0 &&
                    paymentList.map((item) => (
                      <ItemSelect
                        key={item.acquirer_id}
                        isChecked={
                          item.acquirer_id === currentSelectPayment?.acquirer_id
                        }
                        onCheck={() => setCurrentSelectPayment(item)}
                        title={item.name}
                      />
                    ))}
                </div>

                <button
                  onClick={handleConfirmTransaction}
                  className={`btn-primary rides__checkout-checkout-btn ${
                    currentSelectPayment?.acquirer_id ? "" : "btn-not-allowed"
                  } `}
                >
                  Tiến hành thanh toán
                </button>
              </>
            ) : (
              <div className="rides__checkout-loading">
                <RiLoader4Line className="loader" />
              </div>
            )}
          </div>
        </div>
      </div>
    </RideContainer>
  )
}

export default Checkout
