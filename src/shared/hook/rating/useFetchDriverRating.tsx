import { ratingApi } from "@/services"
import useSWR from "swr"
import { useToken } from "../user"

interface Res {
  data: any
  isValidating: boolean
}

export const useFetchDriverRating = (): Res => {
  const { token } = useToken()
  const { data, isValidating } = useSWR(token ? "get_driver_rating" : null, () =>
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
