import { arrowRightIcon, clockIcon } from "@/assets"
import React from "react"
import { RideResultItem } from "./rideResultItem"

interface RidesResultProps {
  type: "history" | "result"
}

export const RidesResult = ({ type }: RidesResultProps) => {
  return (
    <div className="rides__result">
      <ul className="rides__result-list">
        <RideResultItem type="history" />
        <RideResultItem type="history" />
        <RideResultItem type="history" />
        <RideResultItem type="history" />
      </ul>
    </div>
  )
}
