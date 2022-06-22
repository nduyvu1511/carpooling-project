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
import { useToken } from "shared/hook"
import { usePayment } from "shared/hook/usePayment"
import useSWR from "swr"

const CustomerCheckout = () => {
  const router = useRouter()
  const { token } = useToken()
  const { compounding_car_customer_id } = router.query

  const { data: compoundingCar, isValidating } =
    useSWR<CreateCompoundingCarRes>(
      "compounding_car_customer_checkout",
      token && compounding_car_customer_id
        ? () =>
            ridesApi
              .getDetailCompoundingCarCustomer({
                token,
                compounding_car_customer_id: Number(
                  compounding_car_customer_id
                ),
              })
              .then((res: any) => res?.result?.data)
              .catch((err) => console.log(err))
        : null,
      {
        dedupingInterval: 1000,
      }
    )

  useEffect(() => {
    if (!compoundingCar?.state) return
    if (compoundingCar?.state !== "deposit") return

    router.push("/customer/checkout-success")
  }, [compoundingCar, router])

  const {
    data: paymentList,
    createPayment,
    isValidating: paymentLoading,
  } = usePayment(true)
  const [currentPayment, setCurrentPayment] = useState<PaymentRes>()
  // const { getDetailCompoundingCarCustomer } = useCreateRides()

  const targetDate = useMemo(() => {
    return moment(new Date(), "DD/MM/YYYY hh:mm:ss")
      .add(compoundingCar?.second_remains, "seconds")
      .toString()
  }, [compoundingCar])

  const handleConfirmTransaction = () => {
    if (
      !currentPayment?.acquirer_id ||
      !compoundingCar?.compounding_car_customer_id
    )
      return

    createPayment({
      params: {
        acquirer_id: currentPayment.acquirer_id,
        returned_url: `http://localhost:3000/customer/confirmed-checkout?compounding_car_customer_id=${compounding_car_customer_id}`,
        compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
        token: "",
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

            {!paymentLoading ? (
              <>
                <div className="rides__checkout-list py-12">
                  {paymentList?.length > 0 &&
                    paymentList.map((item) => (
                      <ItemSelect
                        key={item.acquirer_id}
                        isChecked={
                          item.acquirer_id === currentPayment?.acquirer_id
                        }
                        onCheck={() => {
                          setCurrentPayment(item)
                        }}
                        title={item.name}
                      />
                    ))}
                </div>

                <button
                  onClick={handleConfirmTransaction}
                  className={`btn-primary rides__checkout-checkout-btn ${
                    currentPayment?.acquirer_id ? "" : "btn-not-allowed"
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

export default CustomerCheckout
