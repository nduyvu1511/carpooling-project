import { SWRConfig } from "@/helper"
import { RatingRes } from "@/models"
import { ratingApi } from "@/services"
import useSWR from "swr"
import { useToken } from "../user"

interface Res {
  data: RatingRes[]
  isValidating: boolean
  mutateUpdateRating: (params: RatingRes) => void
  mutateDeleteRating: (params: number) => void
}

export const useCustomerRating = (): Res => {
  const { token } = useToken()
  const { data, isValidating, mutate } = useSWR<RatingRes[]>(
    token ? "get_customer_rating" : null,
    () =>
      ratingApi
        .getRatingListByCustomer(token)
        .then((res: any) => res?.result?.data || [])
        .catch((err) => console.log(err)),
    {
      ...SWRConfig,
      dedupingInterval: 10000,
    }
  )

  const mutateUpdateRating = (params: RatingRes) => {
    if (!data?.length) return
    const newRatings = [...data].map((item) =>
      item.rating_id === params.rating_id ? params : item
    )
    mutate(newRatings, false)
  }

  const mutateDeleteRating = (id: number) => {
    if (!data?.length) return
    const newRatings = [...data].filter((item) => item.rating_id !== id)
    mutate(newRatings, false)
  }

  return {
    data: data || [],
    isValidating,
    mutateUpdateRating,
    mutateDeleteRating,
  }
}
