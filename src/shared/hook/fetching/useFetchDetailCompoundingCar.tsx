import { SWRConfig } from "@/helper"
import { CompoundingCarRes } from "@/models"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import useSWR from "swr"
import { useToken } from "../user"

interface Res {
  data: CompoundingCarRes | undefined
  isValidating: boolean
}

export const useFetchDetailCompoundingCar = (key: string): Res => {
  const router = useRouter()
  const { token } = useToken()
  const { compounding_car_id } = router.query

  const { isValidating, data } = useSWR<CompoundingCarRes, any>(
    key,
    compounding_car_id && token
      ? () =>
          ridesApi
            .getDetailCompoundingCar({
              compounding_car_id: Number(compounding_car_id),
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
