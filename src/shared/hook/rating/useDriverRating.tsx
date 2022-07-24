import { SWRConfig } from "@/helper"
import { RatingRes } from "@/models"
import { ratingApi } from "@/services"
import useSWR from "swr"
import { useToken } from "../user"

interface Res {
  data: RatingRes[]
  isValidating: boolean
}

export const useDriverRating = (): Res => {
  const { token } = useToken()
  const { data, isValidating } = useSWR<RatingRes[]>(
    token ? "get_driver_rating" : null,
    () =>
      ratingApi
        .getRatingListByDriver(token)
        .then((res: any) => res?.result?.data || [])
        .catch((err) => console.log(err)),
    {
      ...SWRConfig,
      dedupingInterval: 10000,
    }
  )
  return {
    data: data || [],
    isValidating,
  }
}
