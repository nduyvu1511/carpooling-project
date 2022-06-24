import { LIMIT_COMPOUNDING_LIST, SWRConfig } from "@/helper"
import { CompoundingCarRes, CompoundingListDriverParams } from "@/models"
import { ridesApi } from "@/services"
import { useState } from "react"
import useSWR from "swr"
import { useToken } from "../user/useToken"

interface Res {
  data: CompoundingCarRes[]
  isValidating: boolean
  isFetchingMore: boolean
  isLimit: boolean
  filterRides: (params: CompoundingListDriverParams) => void
  fetchMoreRides: (params: CompoundingListDriverParams) => void
}

export const useCompoundingCarCustomerList = (
  params: CompoundingListDriverParams
): Res => {
  const { token } = useToken()
  const { data, isValidating, mutate, error } = useSWR<CompoundingCarRes[]>(
    "carpooling_list",
    token
      ? () =>
          ridesApi
            .getCompoundingCarListForCustomer({ ...params, token })
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
  const [isLoading, setLoading] = useState<boolean>(isValidating)
  const [isFetchingMore, setFetchingMore] = useState<boolean>(false)
  const [isLimit, setLimit] = useState<boolean>(false)

  const checkLimit = (length: number, limit = LIMIT_COMPOUNDING_LIST) => {
    setLimit(!length || length < limit)
  }

  const checkFetchMore = (
    offset?: number | undefined,
    limit?: number | undefined
  ) => offset || 0 >= (limit || LIMIT_COMPOUNDING_LIST)

  const filterRides = async (params: CompoundingListDriverParams) => {
    if (!token) return
    try {
      setLoading(true)
      const res: any = await ridesApi.getCompoundingCarListForCustomer({
        ...params,
        limit: params.limit || LIMIT_COMPOUNDING_LIST,
        token,
      })
      setLoading(false)
      const list: CompoundingCarRes[] = res?.result?.data || []
      checkLimit(list.length)
      mutate(list, false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const fetchMoreRides = async (params: CompoundingListDriverParams) => {
    if (!token) return
    try {
      setFetchingMore(true)
      const res: any = await ridesApi.getCompoundingCarListForCustomer({
        ...params,
        limit: params.limit || LIMIT_COMPOUNDING_LIST,
        token,
      })
      setFetchingMore(false)
      const list: CompoundingCarRes[] = res?.result?.data || []
      checkLimit(list.length, params?.limit)
      mutate([...(data || []), ...list], false)
    } catch (error) {
      setFetchingMore(false)
    }
  }

  return {
    data: data || [],
    isValidating: isLoading,
    isFetchingMore,
    isLimit,
    filterRides,
    fetchMoreRides,
  }
}
