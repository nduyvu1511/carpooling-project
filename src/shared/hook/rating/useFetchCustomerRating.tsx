import { ratingApi } from "@/services"
import useSWR from "swr"
import { useToken } from "../user"

interface Res {
  data: any
  isValidating: boolean
}

export const useFetchCustomerRating = (): Res => {
  const { token } = useToken()
  const { data, isValidating } = useSWR(token ? "get_customer_rating" : null, () =>
    ratingApi
      .getRatingListByCustomer(token)
      .then((res: any) => res?.result?.data || [])
      .catch((err) => console.log(err))
  )
  return {
    data,
    isValidating,
  }
}
