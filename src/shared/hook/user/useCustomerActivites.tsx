import { SWRConfig } from "@/helper"
import { CompoundingCarCustomerState, CustomerActivityItem } from "@/models"
import { ridesApi } from "@/services"
import { useState } from "react"
import useSWR from "swr"
import { useToken } from "."

const LIMIT_ACTIVITIES_LENGTH = 12

interface Res {
  data: CustomerActivityItem[]
  isLoading: boolean
  hasMore: boolean
  filterCompoundingActivities: (compounding_car_state: CompoundingCarCustomerState) => void
  fetchMoreActivities: () => void
  activityStates: CompoundingCarCustomerState[]
  setActivityStates: (params: CompoundingCarCustomerState[]) => void
}

export const useCustomerActivities = (): Res => {
  const { token } = useToken()
  const { data, isValidating, mutate } = useSWR<CustomerActivityItem[]>(
    "compounding_customer_activities",
    token
      ? () =>
          ridesApi
            .getHistoryCompoundingCarCustomer({
              token,
              limit: LIMIT_ACTIVITIES_LENGTH,
            })
            .then((res: any) => {
              const list: CustomerActivityItem[] = res?.result?.data || []
              setHasMore(list.length >= LIMIT_ACTIVITIES_LENGTH)
              return list as any
            })
            .catch((err) => console.log(err))
      : null,
    {
      ...SWRConfig,
      dedupingInterval: 10000,
    }
  )
  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [activityStates, setActivityStates] = useState<CompoundingCarCustomerState[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  const getNewActivityStates = (
    val: CompoundingCarCustomerState
  ): CompoundingCarCustomerState[] => {
    if (activityStates.includes(val)) {
      return [...activityStates].filter((item) => item !== val)
    }
    return [...activityStates, val]
  }

  const filterCompoundingActivities = async (
    compounding_car_state: CompoundingCarCustomerState
  ) => {
    try {
      setLoading(true)
      const newStates = getNewActivityStates(compounding_car_state)
      setActivityStates(newStates)
      const res: any = await ridesApi.getHistoryCompoundingCarCustomer({
        token,
        compounding_car_state: newStates,
        limit: LIMIT_ACTIVITIES_LENGTH,
        offset: 0,
      })
      setLoading(false)
      setOffset(0)
      const list: CustomerActivityItem[] = res?.result?.data || []
      setHasMore(list.length >= LIMIT_ACTIVITIES_LENGTH)
      mutate(list, false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const fetchMoreActivities = async () => {
    try {
      const newOffset = offset + LIMIT_ACTIVITIES_LENGTH
      const res: any = await ridesApi.getHistoryCompoundingCarCustomer({
        token,
        compounding_car_state: activityStates,
        limit: LIMIT_ACTIVITIES_LENGTH,
        offset: newOffset,
      })
      setOffset(newOffset)
      const list: CustomerActivityItem[] = res?.result?.data || []
      setHasMore(list.length >= LIMIT_ACTIVITIES_LENGTH)
      mutate([...(data || []), ...list], false)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    data: data || [],
    isLoading: isValidating || isLoading,
    fetchMoreActivities,
    filterCompoundingActivities,
    hasMore,
    activityStates,
    setActivityStates,
  }
}
