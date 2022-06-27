import { SWRConfig } from "@/helper"
import { DriverSchedule } from "@/models"
import { ridesApi } from "@/services"
import { useState } from "react"
import useSWR from "swr"
import { useToken } from "./useToken"

const LIMIT_LENGTH = 12

interface Res {
  data: DriverSchedule[] | undefined
  hasMore: boolean
  isValidating: boolean
  fetchMore: Function
}

const useDriverSchedules = (): Res => {
  const { token } = useToken()
  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const { data, isValidating, mutate } = useSWR<DriverSchedule[]>(
    "driver_schedules_list",
    token
      ? () =>
          ridesApi
            .getDriverSchedules({ token, limit: LIMIT_LENGTH })
            .then((res: any) => {
              const list: DriverSchedule[] = res?.result?.data || []
              setHasMore(list.length >= LIMIT_LENGTH)
              return list as any
            })
            .catch((err) => console.log(err))
      : null,
    {
      ...SWRConfig,
      dedupingInterval: 10000,
    }
  )

  const fetchMore = async () => {
    try {
      const newOffset = offset + LIMIT_LENGTH
      const res: any = await ridesApi.getDriverSchedules({
        token,
        limit: LIMIT_LENGTH,
        offset: newOffset,
      })
      setOffset(newOffset)
      const list: DriverSchedule[] = res?.result?.data || []
      setHasMore(list.length >= LIMIT_LENGTH)
      mutate([...(data || []), ...list], false)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    data,
    fetchMore,
    hasMore,
    isValidating,
  }
}

export default useDriverSchedules
