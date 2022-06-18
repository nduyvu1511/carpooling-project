import { CompoundingCarCustomer } from "@/models"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import useSWR from "swr"
import { useToken } from "./useToken"

interface Res {
  data: CompoundingCarCustomer
  isLoading: boolean
}

export const useFetchCompoundingCarCustomer = () => {
  const router = useRouter()
  const { token } = useToken()
  const { compounding_car_customer_id } = router.query

  const { isValidating, data } = useSWR<CompoundingCarCustomer, any>(
    "get_detail_compounding_car_customer",
    compounding_car_customer_id && token
      ? () =>
          ridesApi
            .getDetailCompoundingCarCustomer({
              compounding_car_customer_id: Number(compounding_car_customer_id),
              token,
            })
            .then((res: any) => res?.result?.data)
            .catch((err) => console.log(err))
      : null
  )

  return {
    isValidating,
    data,
  }
}
