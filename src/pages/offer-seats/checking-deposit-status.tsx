import { FailureScreen } from "@/components"
import { RideContainer } from "@/container"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { BiLoaderAlt } from "react-icons/bi"
import { useCustomerCheckout, useToken } from "shared/hook"

const ConfirmedCheckout = () => {
  const router = useRouter()
  const { token } = useToken()
  const { confirmDepositCompoundingCarCustomer, confirmDepositLoading } = useCustomerCheckout()

  useEffect(() => {
    const { compounding_car_customer_id } = router.query
    if (!compounding_car_customer_id || !token) return
    if (router.query.vnp_ResponseCode !== "00") return

    confirmDepositCompoundingCarCustomer(Number(compounding_car_customer_id), () => {
      console.log("first")
      window.close()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, token])

  return (
    <>
      {confirmDepositLoading ? (
        <div className="deposit-loading">
          <BiLoaderAlt className="loader" />
        </div>
      ) : (
        <>
          {router.query?.vnp_ResponseCode !== "00" ? (
            <RideContainer heading="Thanh toán thành công">
              <div className="content-container">
                <FailureScreen
                  title="Thanh toán thất bại"
                  onClick={() => window.close()}
                  btnLabel="Về trang thanh toán"
                />
              </div>
            </RideContainer>
          ) : null}
        </>
      )}
    </>
  )
}

export default ConfirmedCheckout
