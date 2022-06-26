import { SWRConfig } from "@/helper"
import { CompoundingCarCustomer } from "@/models"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import useSWR from "swr"
import { useToken } from "../user"

interface Res {
  data: CompoundingCarCustomer | undefined
  isValidating: boolean
}

export const useFetchCompoundingCarCustomerDetail = (key: string): Res => {
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
      dedupingInterval: 0,
      revalidateOnFocus: true,
    }
  )

  return {
    isValidating,
    data,
  }
}
