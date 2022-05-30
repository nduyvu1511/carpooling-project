import { Tabs } from "@/components"
import React, { ReactNode } from "react"

interface RatingContainerProps {
  children: ReactNode
}

export const RatingContainer = ({ children }: RatingContainerProps) => {
  return (
    <div className="rating-container">
      <h1 className="rating-heading">Đánh giá</h1>
      <Tabs
        list={[
          { name: "Đánh giá của bạn", path: "/dashboard/ratings/given" },
          { name: "Đánh giá về bạn", path: "/dashboard/ratings/received" },
        ]}
      />
      <div className="content-container profile-body">{children}</div>
    </div>
  )
}
