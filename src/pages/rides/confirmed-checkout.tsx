import { FailureScreen, SuccessScreen } from "@/components"
import { RideContainer } from "@/container"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useToken } from "shared/hook"

const ConfirmCheckoutDriver = () => {
  const router = useRouter()
  const { token } = useToken()

  useEffect(() => {
    const { compounding_car_id } = router.query
    if (!compounding_car_id || !token) return
    if (router.query.vnp_ResponseCode !== "00") return

    ridesApi
      .confirmDepositForDriver({
        compounding_car_id: Number(compounding_car_id),
        token,
      })
      .then(() => {
        window.close()
      })
      .catch((err) => console.log(err))
  }, [router, token])

  return (
    <RideContainer heading="Thanh toán thành công">
      <div className="content-container">
        {router.query?.vnp_ResponseCode === "00" ? (
          <SuccessScreen
            title="Thanh toán thành công"
            onClick={() => window.close()}
            btnLabel="Về trang thanh toán"
          />
        ) : (
          <FailureScreen
            title="Thanh toán thất bại"
            onClick={() => window.close()}
            btnLabel="Về trang thanh toán"
          />
        )}
      </div>
    </RideContainer>
  )
}

export default ConfirmCheckoutDriver
