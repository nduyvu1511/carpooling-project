import { SWRConfig } from "@/helper"
import { ridesApi } from "@/services"
import useSWR from "swr"
import { useAuthorization } from "./useAuthorization"
import { useToken } from "./useToken"

interface Res {
  data: any
  isValidating: boolean
}

export const useCompoundingActivities = (): Res => {
  const { token } = useToken()
  const { role } = useAuthorization()
  const { data, isValidating } = useSWR(
    "compounding_activities",
    token && role !== "guest"
      ? () =>
          (role === "car_driver"
            ? ridesApi.getHistoryCompoundingCarDrive(token)
            : ridesApi.getHistoryCompoundingCarCustomer(token)
          )
            .then((res: any) => res?.result?.data)
            .catch((err) => console.log(err))
      : null,
    {
      ...SWRConfig,
      dedupingInterval: 10000,
    }
  )

  return { data, isValidating }
}
