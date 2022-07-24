import { Map, RidesItem } from "@/components"
import { RideContainer } from "@/container"
import { CompoundingCarRes } from "@/models"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useToken } from "shared/hook"

const CompoundingDetail = () => {
  const { token } = useToken()
  const router = useRouter()
  const [ridesDetail, setRidesDetail] = useState<CompoundingCarRes>()
  const [loading, setLoading] = useState<boolean>()

  useEffect(() => {
    if (!token) router.push("/")
    const { compounding_car_id } = router?.query
    if (!compounding_car_id) return

    setLoading(true)
    ridesApi
      .getDetailCompoundingCar({
        compounding_car_id: Number(compounding_car_id),
        token,
      })
      .then((res: any) => {
        setLoading(false)
        if (!res?.result?.success) return
        setRidesDetail(res?.result?.data)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [router])

  if (!ridesDetail?.car_driver_id) return null

  return (
    <RideContainer heading="Chi tiết chuyến đi" btnLabel="Xác nhận đặt cọc">
      <section className="rides-driver__detail">
        <div className="px-24 content-container">
          <h1 className="rides-driver__detail-title">{ridesDetail.compounding_car_name}</h1>
          <div className="rides-driver__detail-map">
            <Map viewOnly />
          </div>
          {ridesDetail?.compounding_car_id ? (
            <RidesItem type="driver" view="detail" rides={ridesDetail} />
          ) : null}
        </div>

        <div className="rides-driver__detail-footer">
          <div className="content-container px-24">
            <button
              onClick={() =>
                router.push(`/rides/checkout?compounding_car_id=${ridesDetail.compounding_car_id}`)
              }
              className="btn-primary"
            >
              Xác nhận đặt cọc
            </button>
          </div>
        </div>
      </section>
    </RideContainer>
  )
}

export default CompoundingDetail
