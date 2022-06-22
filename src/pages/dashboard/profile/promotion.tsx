import { PromotionItem } from "@/components/promotion"
import { RideContainer } from "@/container"
import React from "react"

const Promotion = () => {
  return (
    <RideContainer heading="Mã khuyến mãi">
      <div className="content-container px-24">
        <PromotionItem />
        <PromotionItem />
        <PromotionItem />
        <PromotionItem />
        <PromotionItem />
      </div>
    </RideContainer>
  )
}

export default Promotion
