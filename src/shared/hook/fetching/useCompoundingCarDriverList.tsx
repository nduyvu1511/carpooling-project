import { isObjectHasValue, LIMIT_COMPOUNDING_LIST, SWRConfig } from "@/helper"
import { CompoundingCarRes, CompoundingListDriverParams } from "@/models"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
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

export const useCompoundingCarDriverList = (
  params: CompoundingListDriverParams
): Res => {
  const router = useRouter()
  const { token } = useToken()
  const { data, isValidating, mutate, error } = useSWR<CompoundingCarRes[]>(
    "compounding_car_driver_list",
    token
      ? () =>
          (isObjectHasValue(router.query)
            ? ridesApi.getCompoundingCarListForDriver({ ...params, token })
            : ridesApi.getCompoundingCarListForDriver({
                limit: LIMIT_COMPOUNDING_LIST,
                token,
              })
          )
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

  const fetchMoreRides = async (params: CompoundingListDriverParams) => {
    try {
      setFetchingMore(true)
      // const newOffset = offset + (params?.limit || LIMIT_COMPOUNDING_LIST)
      const res: any = await ridesApi.getCompoundingCarListForDriver({
        ...params,
        limit: LIMIT_COMPOUNDING_LIST,
        token,
        // offset: newOffset,
      })
      // setOffset(newOffset)
      const list: CompoundingCarRes[] = res?.result?.data || []
      checkLimit(list.length)
      setFetchingMore(false)
      mutate([...(data || []), ...list], false)
    } catch (error) {
      setFetchingMore(true)
    }
  }

  const filterRides = async (params: CompoundingListDriverParams) => {
    if (!token) return
    try {
      setLoading(true)
      const res: any = await ridesApi.getCompoundingCarListForDriver({
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

  return {
    data: data || [],
    isValidating: isLoading,
    isFetchingMore,
    isLimit,
    filterRides,
    fetchMoreRides,
  }
}
