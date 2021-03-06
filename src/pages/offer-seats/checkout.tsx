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

const Checkout = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = useToken()
  const { compounding_car_customer_id } = router.query
  const { createPayment } = useCustomerCheckout()
  const { paymentList, isLoading, setCurrentSelectPayment, currentSelectPayment } = usePayment()
  const { data: compoundingCar, isValidating } = useFetchCompoundingCarCustomerDetail(
    "get_compounding_car_customer_to_check_deposit"
  )

  // Check deposit status
  useEffect(() => {
    if (compoundingCar?.state === "deposit") {
      router.push(
        `/offer-seats/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

  const handleConfirmTransaction = () => {
    if (!currentSelectPayment?.acquirer_id || !compoundingCar?.compounding_car_customer_id) return

    createPayment({
      params: {
        acquirer_id: currentSelectPayment.acquirer_id,
        returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/offer-seats/checking-deposit-status?compounding_car_customer_id=${compounding_car_customer_id}`,
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
    <RideContainer heading="?????t c???c cho chuy???n ??i">
      <div className="rides__checkout">
        <div className="content-container px-24">
          <div className="rides__checkout-header">
            <h3 className="rides__checkout-header-title">
              Vui l??ng ?????t c???c s??? ti???n <span>{formatMoneyVND(compoundingCar.down_payment)}</span> ?????
              ho??n t???t giao d???ch
            </h3>

            <div className="rides__checkout-header-remains px-24">
              <span className="rides__checkout-header-remains-l">Th???i gian c??n l???i:</span>
              {compoundingCar.second_remains ? (
                <CountdownCompounding
                  onExpiredCoundown={() => {
                    dispatch(notify("H???t h???n phi??n giao d???ch, vui l??ng th??? l???i sau", "warning"))
                  }}
                  secondsRemains={compoundingCar.second_remains}
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
                  Ti???n h??nh thanh to??n
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
