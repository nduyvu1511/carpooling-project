import { RatingCustomer, RatingDriver } from "@/components"
import { useAuthorization } from "shared/hook"

const RatingList = () => {
  const { role } = useAuthorization()

  return <>{role === "car_driver" ? <RatingDriver /> : <RatingCustomer />}</>
}

export default RatingList
