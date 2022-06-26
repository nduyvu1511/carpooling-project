import { CustomerActivities, DriverActivities } from "@/components/activity"
import { useAuthorization } from "shared/hook"

const Activities = () => {
  const { role } = useAuthorization()

  return <>{role === "car_driver" ? <DriverActivities /> : <CustomerActivities />}</>
}

export default Activities
