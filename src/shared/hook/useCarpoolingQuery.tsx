import { LIMIT_COMPOUNDING_LIST, SWRConfig } from "@/helper"
import { CompoundingCarRes, GetCarpoolingListParams } from "@/models"
import { ridesApi } from "@/services"
import { useState } from "react"
import useSWR from "swr"
import { useToken } from "./useToken"

interface Res {
  data: CompoundingCarRes[]
  isValidating: boolean
  isFetchingMore: boolean
  isLimit: boolean
  filterRides: (params: GetCarpoolingListParams) => void
}

export const useCarpoolingList = (params: GetCarpoolingListParams): Res => {
  const { token } = useToken()
  const [isFetchingMore, setFetchingMore] = useState<boolean>(false)
  const [isLimit, setLimit] = useState<boolean>(false)

  const { data, isValidating, mutate, error } = useSWR<CompoundingCarRes[]>(
    "carpooling_list",
    token
      ? () =>
          ridesApi
            .getCarpoolingCompoundingList({ ...params, token })
            .then((res: any) => {
              const list = res?.result?.data || []
              checkLimit(list.length)
              return list
            })
            .catch((err) => console.log(err))
      : null,
    {
      ...SWRConfig,
      dedupingInterval: 100000,
    }
  )

  const checkLimit = (length: number, limit = LIMIT_COMPOUNDING_LIST) => {
    setLimit(!length || length < limit)
  }

  const filterRides = async (params: GetCarpoolingListParams) => {
    if (!token) return
    try {
      setFetchingMore(true)
      const res: any = await ridesApi.getCarpoolingCompoundingList({
        ...params,
        limit: params.limit || LIMIT_COMPOUNDING_LIST,
        token,
      })

      const list: CompoundingCarRes[] = res?.result?.data || []
      setFetchingMore(false)
      checkLimit(list.length)

      if ((params?.offset || 0) >= (params?.limit || LIMIT_COMPOUNDING_LIST)) {
        mutate([...(data || []), ...list], false)
      } else {
        mutate(list, false)
      }
    } catch (error) {
      setFetchingMore(false)
      console.log(error)
    }
  }

  return {
    data: data || [],
    isValidating,
    isFetchingMore,
    isLimit,
    filterRides,
  }
}
