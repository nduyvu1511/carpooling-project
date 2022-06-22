import { LIMIT_COMPOUNDING_LIST, SWRConfig } from "@/helper"
import { CompoundingCarRes, CompoundingDriverListParams } from "@/models"
import { ridesApi } from "@/services"
import { useState } from "react"
import useSWR from "swr"
import { useToken } from "./useToken"

interface Res {
  data: CompoundingCarRes[]
  isValidating: boolean
  isFetchingMore: boolean
  isLimit: boolean
  filterRides: (params: CompoundingDriverListParams) => void
}

export const useCompoundingDriverList = (
  params: CompoundingDriverListParams
): Res => {
  const { token } = useToken()
  const [isFetchingMore, setFetchingMore] = useState<boolean>(false)
  const [isLimit, setLimit] = useState<boolean>(false)

  const { data, isValidating, mutate, error } = useSWR<CompoundingCarRes[]>(
    "carpooling_driver_list",
    token
      ? () =>
          ridesApi
            .getCompoundingListWithoutADriver({
              ...params,
              token,
              limit: params?.limit || LIMIT_COMPOUNDING_LIST,
            })
            .then((res: any) => {
              const list = res?.result?.data || []
              checkRidesListLength(list.length)
              return list
            })
            .catch((err) => console.log(err))
      : null,
    {
      dedupingInterval: 100000,
      ...SWRConfig,
    }
  )

  const checkRidesListLength = (
    length: number,
    limit = LIMIT_COMPOUNDING_LIST
  ) => {
    if (!length || length < limit) {
      setLimit(true)
    } else {
      setLimit(false)
    }
  }

  const filterRides = async (params: CompoundingDriverListParams) => {
    if (!token) return
    try {
      setFetchingMore(true)
      const res: any = await ridesApi.getCompoundingListWithoutADriver({
        ...params,
        limit: params.limit || LIMIT_COMPOUNDING_LIST,
        token,
      })

      const list: CompoundingCarRes[] = res?.result?.data || []
      setFetchingMore(false)
      checkRidesListLength(list.length)

      if ((params?.offset || 0) >= LIMIT_COMPOUNDING_LIST) {
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
