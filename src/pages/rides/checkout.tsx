import { CountdownCompounding, ItemSelect } from "@/components"
import { RideContainer } from "@/container"
import {
  COMPOUNDING_VNPAY_CODE,
  formatMoneyVND,
  setToSessionStorage,
  SWRConfig,
} from "@/helper"
import {
  CompoundingCarRes,
  CompoundingDriverDepositRes,
  PaymentRes,
} from "@/models"
import { ridesApi } from "@/services"
import moment from "moment"
import { useRouter } from "next/router"
import { useEffect, useMemo, useRef, useState } from "react"
import { RiLoader4Line } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useToken } from "shared/hook"
import { usePayment } from "shared/hook/user/usePayment"
import useSWR from "swr"

const DriverCheckout = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = useToken()
  const { compounding_car_id } = router.query
  const [depositStatus, setDepositStatus] = useState<{
    success: boolean
    message: string
  }>()
  const secondFetch = useRef<boolean>(false)

  const { isValidating } = useSWR<CompoundingCarRes>(
    "get_detail_compounding_driver",
    token && compounding_car_id
      ? () =>
          ridesApi
            .getDetailCompoundingCar({
              compounding_car_id: Number(compounding_car_id),
              token,
            })
            .then((res: any) => {
              const response = res?.result?.data
              setCompouningCar(response)
              return response
            })
            .catch((err) => console.log(err))
      : null,
    {
      dedupingInterval: 1000,
    }
  )

  const [compoundingCar, setCompouningCar] = useState<CompoundingCarRes>()
  const { data: deposit } = useSWR(
    "get_deposit_compounding_driver",
    token && compounding_car_id
      ? () =>
          ridesApi
            .getDepositCompoundingCarDriver({
              compounding_car_id: Number(compounding_car_id),
              token,
            })
            .then((res: any) => {
              if (!res?.result?.success) {
                setDepositStatus({
                  message: res?.result?.message || "",
                  success: false,
                })
                return res?.result?.data
              }
              return res?.result?.data
            })
            .catch((err) => console.log(err))
      : null,
    {
      ...SWRConfig,
    }
  )

  const targetDate = useMemo(() => {
    return moment(new Date(), "DD/MM/YYYY hh:mm:ss")
      .add(compoundingCar?.second_remains, "seconds")
      .toString()
  }, [compoundingCar])

  useEffect(() => {
    const { compounding_car_id } = router.query
    if (!compounding_car_id) return
  }, [router])

  useEffect(() => {
    if (!compoundingCar?.state) return
    if (compoundingCar?.state !== "confirm_deposit") return

    router.push("/rides/checkout-success")
  }, [compoundingCar, router])

  //   useEffect(() => {
  //     if (!token) return
  //     const { compounding_car_id } = router.query
  //     if (!compounding_car_id) return

  //     ridesApi
  //       .getDepositCompoundingCarDriver({
  //         compounding_car_id: Number(compounding_car_id),
  //         token,
  //       })
  //       .then((res) => console.log(res))
  //   }, [router])

  const {
    data: paymentList,
    createPaymentForDriver,
    isValidating: paymentLoading,
  } = usePayment(true)
  const [currentPayment, setCurrentPayment] = useState<PaymentRes>()

  const handleConfirmTransaction = (compounding_car_id: number) => {
    if (!currentPayment?.acquirer_id || !deposit?.payment_id) return

    createPaymentForDriver({
      params: {
        acquirer_id: currentPayment.acquirer_id,
        returned_url: `http://localhost:3000/rides/confirmed-checkout?compounding_car_id=${compounding_car_id}`,
        compounding_car_id,
        token: "",
        payment_id: deposit.payment_id,
      },
      onSuccess: (data) => {
        window
          .open(data.vnpay_payment_url, "name", "height=600,width=800")
          ?.focus()
        setToSessionStorage(COMPOUNDING_VNPAY_CODE, data.vnpay_code)
      },
    })
  }

  // useEffect(() => {
  //   const { payment_id } = router.query
  //   if (!payment_id || !paymentList?.length) return
  //   setCurrentPayment(paymentList.find((item) => item. === Number(payment_id)))
  // }, [router])

  const handleCancelCompoundingCar = async () => {
    if (!token || !deposit?.[0]?.compounding_car_id) return

    try {
      const res: any = await ridesApi.cancelDepositForDriver({
        token,
        compounding_car_id: deposit?.[0]?.compounding_car_id,
      })
      if (!res?.result?.success) return

      dispatch(notify("Hủy giao dịch thành công", "success"))
    } catch (error) {}
  }

  if (depositStatus?.success === false) {
    return (
      <div className="rides__checkout-failure content-container px-24">
        {deposit?.[0]?.compounding_car_id ? (
          <div className="rides__checkout-failure-deposit">
            <p className="rides__checkout-failure-title">
              Bạn đang có một giao dịch đang còn dang dở, Vui lòng xác nhận cho
              giao dịch: <span>{deposit?.[0]?.compounding_car_name}</span>
            </p>

            <div className="rides__checkout-failure-deposit-action">
              <button
                onClick={handleCancelCompoundingCar}
                className="btn-primary"
              >
                Hủy chuyến đi
              </button>
              <button
                onClick={() =>
                  router.push(
                    `/rides/checkout?compounding_car_id=${deposit?.[0]?.compounding_car_id}`
                  )
                }
                className="btn-primary"
              >
                Thanh toán cho chuyến đi này
              </button>
            </div>
          </div>
        ) : (
          <p className="rides__checkout-failure-title">
            {depositStatus?.message || "Không tìm thấy giao dịch"}
          </p>
        )}
      </div>
    )
  }

  if (!compoundingCar?.compounding_car_id) return null

  return (
    <RideContainer heading="Đặt cọc cho chuyến đi">
      <div className="rides__checkout">
        <div className="content-container px-24">
          <div className="rides__checkout-header">
            <h3 className="rides__checkout-header-title">
              Vui lòng đặt cọc số tiền{" "}
              <span>{formatMoneyVND(deposit?.amount_total || 0)}</span> để hoàn
              tất giao dịch
            </h3>

            <div className="rides__checkout-header-remains px-24">
              <span className="rides__checkout-header-remains-l">
                Thời gian còn lại:
              </span>
              {compoundingCar.state !== "confirm_deposit" ? (
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
                  onClick={() =>
                    handleConfirmTransaction(
                      Number(router.query?.compounding_car_id)
                    )
                  }
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

export default DriverCheckout
