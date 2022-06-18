import { CarIdType, VehicleTypeParams } from "@/models"
import { vehicleApi } from "@/services"
import useSWR, { SWRConfig } from "swr"

interface Res {
  isValidating: boolean
  data: VehicleTypeParams[] | undefined
  vehicleTypeOptions: () => CarIdType[]
}

export const useFetchCarType = (): Res => {
  const { data, isValidating } = useSWR<VehicleTypeParams[]>(
    "get_car_type",
    () => vehicleApi.getCarTypes().then((res: any) => res?.result?.data),
    {
      dedupingInterval: 10000000,
      ...SWRConfig,
    }
  )

  const vehicleTypeOptions = (): CarIdType[] => {
    if (!data?.length) return []

    return data.map((item) => ({
      label: item.name,
      value: item.car_id,
      number_seat: item.number_seat,
    }))
  }

  return {
    data,
    isValidating,
    vehicleTypeOptions,
  }
}
