import { FailureScreen } from "@/components"
import { RideContainer } from "@/container"
import { CompoundingCarRes } from "@/models"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BiLoaderAlt } from "react-icons/bi"
import { useToken } from "shared/hook"

const ConfirmCheckoutDriver = () => {
  const router = useRouter()
  const { token } = useToken()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const { compounding_car_id } = router.query
    if (!compounding_car_id || !token) return
    if (router.query.vnp_ResponseCode !== "00") return

    setLoading(true)
    ridesApi
      .confirmDepositForDriver({
        compounding_car_id: Number(compounding_car_id),
        token,
      })  
      .then((res: any) => {
        setLoading(false)
        if ((res?.result?.data as CompoundingCarRes)?.state === "confirm_deposit") {
          window.close()
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [router, token])

  return (
    <>
      {loading ? (
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

export default ConfirmCheckoutDriver
