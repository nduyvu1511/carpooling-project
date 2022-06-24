import { SWRConfig } from "@/helper"
import { CompoundingCarCustomerState } from "@/models"
import { ridesApi } from "@/services"
import { useState } from "react"
import useSWR from "swr"
import { useToken } from "../user"

const LIMIT_ACTIVITIES_LENGTH = 12

interface Res {
  data: any
  isValidating: boolean
  filterCompoundingActivities: (
    compounding_car_state: CompoundingCarCustomerState
  ) => void
  fetchMoreActivities: (
    compounding_car_state: CompoundingCarCustomerState
  ) => void
}

export const useCustomerActivities = (): Res => {
  const { token } = useToken()
  const { data, isValidating, mutate } = useSWR(
    "compounding_customer_activities",
    token
      ? () =>
          ridesApi
            .getHistoryCompoundingCarCustomer({
              token,
              limit: LIMIT_ACTIVITIES_LENGTH,
            })
            .then((res: any) => res?.result?.data || [])
            .catch((err) => console.log(err))
      : null,
    {
      ...SWRConfig,
      dedupingInterval: 10000,
    }
  )
  const [offset, setOffset] = useState<number>(0)

  const filterCompoundingActivities = async (
    compounding_car_state: CompoundingCarCustomerState
  ) => {
    try {
      const res: any = await ridesApi.getHistoryCompoundingCarCustomer({
        token,
        compounding_car_state,
        limit: LIMIT_ACTIVITIES_LENGTH,
        offset: 0,
      })
      mutate(res?.result?.data || [], false)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMoreActivities = async (
    compounding_car_state: CompoundingCarCustomerState
  ) => {
    try {
      const newOffset = offset + LIMIT_ACTIVITIES_LENGTH
      const res: any = await ridesApi.getHistoryCompoundingCarCustomer({
        token,
        compounding_car_state,
        limit: LIMIT_ACTIVITIES_LENGTH,
        offset: newOffset,
      })
      setOffset(newOffset)
      mutate([...data, ...(res?.result?.data || [])], false)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    data,
    isValidating,
    fetchMoreActivities,
    filterCompoundingActivities,
  }
}
