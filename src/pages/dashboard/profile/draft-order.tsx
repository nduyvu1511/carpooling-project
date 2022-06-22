import { InfiniteScrollWrapper, RidesItem } from "@/components"
import { RideContainer } from "@/container"
import { LIMIT_COMPOUNDING_LIST } from "@/helper"
import { useState } from "react"
import { useRidesDraft } from "shared/hook"

const DraftOrder = () => {
  const {
    data: ridesList,
    isLimit,
    isValidating,
    fetchMore,
    isFetching,
  } = useRidesDraft(LIMIT_COMPOUNDING_LIST)
  const [offset, setOffset] = useState<number>(0)

  if (!ridesList) return null
  return (
    <RideContainer heading="Đơn hàng nháp">
      <div className="draft-order-container">
        <div className="content-container px-24">
          <InfiniteScrollWrapper
            isLimit={isLimit}
            isLoading={isFetching}
            onBottom={() => {
              const newOffset = offset + LIMIT_COMPOUNDING_LIST
              fetchMore(newOffset)
              setOffset(newOffset)
            }}
          >
            <div className="draft-order__list">
              {ridesList.map((item, index) => (
                <RidesItem key={index} rides={item} />
              ))}
            </div>
          </InfiniteScrollWrapper>
        </div>
      </div>
    </RideContainer>
  )
}

export default DraftOrder
