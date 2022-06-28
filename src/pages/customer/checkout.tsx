import { CountdownCompounding, ItemSelect } from "@/components"
import { RideContainer } from "@/container"
import { COMPOUNDING_VNPAY_CODE, formatMoneyVND, setToSessionStorage } from "@/helper"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { RiLoader4Line } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import {
  useCustomerCheckout,
  useFetchCompoundingCarCustomerDetail,
  usePayment,
  useToken
} from "shared/hook"

const CustomerCheckout = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = useToken()
  const { compounding_car_customer_id } = router.query
  const { paymentList, isLoading, currentSelectPayment, setCurrentSelectPayment } = usePayment()
  const { createPayment } = useCustomerCheckout()
  const { data: compoundingCar, isValidating } = useFetchCompoundingCarCustomerDetail(
    "get_compounding_car_detail_customer_checkout"
  )

  useEffect(() => {
    if (compoundingCar?.state === "deposit") {
      router.push(
        `/customer/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

  const handleCreatePayment = () => {
    if (
      !token ||
      !currentSelectPayment?.acquirer_id ||
      !compoundingCar?.compounding_car_customer_id
    )
      return

    createPayment({
      params: {
        acquirer_id: currentSelectPayment.acquirer_id,
        returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/customer/checking-deposit-status?compounding_car_customer_id=${compounding_car_customer_id}`,
        compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
        token,
      },
      onSuccess: (data) => {
        window.open(data.vnpay_payment_url, "name", "height=600,width=800")?.focus()
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
              Vui lòng đặt cọc số tiền <span>{formatMoneyVND(compoundingCar.down_payment)}</span> để
              hoàn tất giao dịch
            </h3>

            <div className="rides__checkout-header-remains px-24">
              <span className="rides__checkout-header-remains-l">Thời gian còn lại:</span>
              {compoundingCar.state !== "deposit" ? (
                <CountdownCompounding
                  secondsRemains={compoundingCar.second_remains}
                  onExpiredCoundown={() => {
                    dispatch(notify("Hết hạn phiên giao dịch, vui lòng thử lại sau", "warning"))
                    router.push("/")
                  }}
                />
              ) : null}
            </div>

            {!isLoading ? (
              <>
                <div className="rides__checkout-list py-12">
                  {paymentList?.length > 0 &&
                    paymentList.map((item) => (
                      <ItemSelect
                        key={item.acquirer_id}
                        isChecked={item.acquirer_id === currentSelectPayment?.acquirer_id}
                        onCheck={() => {
                          setCurrentSelectPayment(item)
                        }}
                        title={item.name}
                      />
                    ))}
                </div>

                <button
                  onClick={handleCreatePayment}
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

export default CustomerCheckout
