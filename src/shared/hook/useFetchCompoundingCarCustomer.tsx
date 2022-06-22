import { SWRConfig } from "@/helper"
import { CompoundingCarCustomer } from "@/models"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import useSWR from "swr"
import { useToken } from "./useToken"

interface Res {
  data: CompoundingCarCustomer
  isLoading: boolean
}

export const useFetchCompoundingCarCustomer = (key: string) => {
  const router = useRouter()
  const { token } = useToken()
  const { compounding_car_customer_id } = router.query

  const { isValidating, data } = useSWR<CompoundingCarCustomer, any>(
    key,
    compounding_car_customer_id && token
      ? () =>
          ridesApi
            .getDetailCompoundingCarCustomer({
              compounding_car_customer_id: Number(compounding_car_customer_id),
              token,
            })
            .then((res: any) => res?.result?.data)
            .catch((err) => console.log(err))
      : null,
    {
      ...SWRConfig,
      dedupingInterval: 1000,
    }
  )

  return {
    isValidating,
    data,
  }
}
