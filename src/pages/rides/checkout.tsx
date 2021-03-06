import { Alert, CountdownCompounding, ItemSelect } from "@/components"
import { RideContainer } from "@/container"
import {
  COMPOUNDING_VNPAY_CODE,
  formatMoneyVND,
  isObjectHasValue,
  setToSessionStorage,
} from "@/helper"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { RiLoader4Line } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useDriverCheckout, useFetchCompoundingCarDetail, usePayment, useToken } from "shared/hook"

const DriverCheckout = () => {
  const dispatch = useDispatch()
  const secondRef = useRef<boolean>(false)
  const router = useRouter()
  const { token } = useToken()
  const { compounding_car_id } = router.query
  const {
    deposit,
    depositLoading,
    depositFailure,
    setDepositFailure,
    cancelDepositCompoundingCarDriver,
    createPaymentForDriver,
  } = useDriverCheckout()
  const { paymentList, isLoading, currentSelectPayment, setCurrentSelectPayment } = usePayment()
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const { data: compoundingCar } = useFetchCompoundingCarDetail({
    key: "get_compounding_car_detail_to_deposit_driver",
    type: "autoFocus",
  })

  useEffect(() => {
    if (!secondRef?.current) {
      secondRef.current = true
      return
    }
    if (compoundingCar?.state === "confirm_deposit") {
      router.push(`/rides/checkout-success?compounding_car_id=${compounding_car_id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

  // Create payment for this compounding car, then open VNPAY popup
  const handleCreatePayment = (compounding_car_id: number) => {
    if (!currentSelectPayment?.acquirer_id || !deposit?.payment_id) return

    createPaymentForDriver({
      params: {
        acquirer_id: currentSelectPayment.acquirer_id,
        returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/rides/checking-deposit-status?compounding_car_id=${compounding_car_id}`,
        compounding_car_id,
        token,
        payment_id: deposit.payment_id,
      },
      onSuccess: (data) => {
        window.open(data.vnpay_payment_url, "name", "height=600,width=800")?.focus()
        setToSessionStorage(COMPOUNDING_VNPAY_CODE, data.vnpay_code)
      },
    })
  }

  if (depositFailure && depositFailure?.data?.[0]?.compounding_car?.compounding_car_id) {
    return (
      <>
        <div className="">
          {depositFailure.data.map((item, index) => (
            <>
              <div key={index} className="rides__checkout-failure content-container px-24">
                <div className="rides__checkout-failure-deposit">
                  <p className="rides__checkout-failure-title">
                    B???n ??ang c?? m???t giao d???ch ??ang c??n dang d???, Vui l??ng x??c nh???n cho giao d???ch:{" "}
                    <span>{item.compounding_car.compounding_car_name}</span>
                  </p>

                  <div className="rides__checkout-failure-deposit-action">
                    <button onClick={() => setShowAlert(true)} className="btn-primary">
                      H???y giao d???ch n??y
                    </button>
                    <button
                      onClick={() => {
                        setDepositFailure(undefined)
                        router.push(
                          `/rides/checkout?compounding_car_id=${item.compounding_car.compounding_car_id}`
                        )
                      }}
                      className="btn-primary"
                    >
                      Xem giao d???ch n??y
                    </button>
                  </div>
                </div>
              </div>

              {showAlert ? (
                <Alert
                  onClose={() => setShowAlert(false)}
                  onConfirm={() => {
                    cancelDepositCompoundingCarDriver(
                      item.compounding_car.compounding_car_id,
                      () => {
                        setShowAlert(false)
                      }
                    )
                  }}
                  title="N???u ?????ng ??, B???n s??? h???y b??? thanh to??n giao d???ch n??y!"
                />
              ) : null}
            </>
          ))}
        </div>
      </>
    )
  }

  if (!deposit || !isObjectHasValue(deposit)) return null
  return (
    <RideContainer heading="?????t c???c cho chuy???n ??i">
      <div className="rides__checkout">
        <div className="content-container px-24">
          <div className="rides__checkout-header">
            <h3 className="rides__checkout-header-title">
              Vui l??ng ?????t c???c s??? ti???n <span>{formatMoneyVND(deposit?.amount_total || 0)}</span> ?????
              ho??n t???t giao d???ch
            </h3>

            <div className="rides__checkout-header-remains px-24">
              <span className="rides__checkout-header-remains-l">Th???i gian c??n l???i:</span>
              {deposit.second_remains ? (
                <CountdownCompounding
                  secondsRemains={deposit.second_remains}
                  onExpiredCoundown={() => {
                    dispatch(notify("H???t phi??n thanh to??n, vui l??ng th??? l???i sau", "warning"))
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
                  onClick={() => handleCreatePayment(Number(router.query?.compounding_car_id))}
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

export default DriverCheckout
