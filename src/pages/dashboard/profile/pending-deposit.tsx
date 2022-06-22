import { RidesItem } from "@/components"
import { RideContainer } from "@/container"
import { SWRConfig } from "@/helper"
import { CompoundingCarRes } from "@/models"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import React from "react"
import { useToken } from "shared/hook"
import useSWR from "swr"

const PendingDeposit = () => {
  const router = useRouter()
  const { token } = useToken()
  const { data, isValidating } = useSWR<
    (CompoundingCarRes & { payment_id: number })[]
  >(
    "get_pending_deposit_compounding",
    token
      ? () =>
          ridesApi
            .getPendingDepositCompoundingList(token)
            .then((res: any) => res?.result?.data)
      : null,
    {
      ...SWRConfig,
      dedupingInterval: 10000,
    }
  )

  console.log(data)

  if (!data?.length) return null
  return (
    <RideContainer heading="Đơn hàng đang thanh toán">
      <div className="content-container px-24">
        {data.map((item) => (
          <RidesItem
            onClick={(id) =>
              router.push(
                `/rides/checkout?compounding_car_id=${id}&payment_id=${item.payment_id}`
              )
            }
            type="driver"
            key={item.compounding_car_id}
            rides={item}
          />
        ))}
      </div>
    </RideContainer>
  )
}

export default PendingDeposit
