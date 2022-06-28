import { SWRConfig } from "@/helper"
import { CompoundingCarRes } from "@/models"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import useSWR, { KeyedMutator } from "swr"
import { useToken } from "../user"

interface Res {
  data: CompoundingCarRes | undefined
  isValidating: boolean
  mutate: KeyedMutator<CompoundingCarRes>
}

interface Props {
  key: string
  type: "autoFocus" | "once"
}

export const useFetchCompoundingCarDetail = ({ key, type }: Props): Res => {
  const router = useRouter()
  const { token } = useToken()
  const { compounding_car_id } = router.query

  const { isValidating, data, mutate } = useSWR<CompoundingCarRes, any>(
    compounding_car_id && token ? key : null,
    () =>
      ridesApi
        .getDetailCompoundingCar({
          compounding_car_id: Number(compounding_car_id),
          token,
        })
        .then((res: any) => res?.result?.data)
        .catch((err) => console.log(err)),
    type === "once"
      ? { ...SWRConfig, dedupingInterval: 1000 }
      : {
          dedupingInterval: 0,
          revalidateOnFocus: true,
        }
  )

  return {
    isValidating,
    data,
    mutate,
  }
}
