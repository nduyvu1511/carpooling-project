import { VehicleBrandRes } from "@/models"
import { vehicleApi } from "@/services"
import useSWR, { SWRConfig } from "swr"

interface Res {
  isValidating: boolean
  data: VehicleBrandRes[] | undefined
}

export const useFetchCarBrand = (): Res => {
  const { data, isValidating } = useSWR<VehicleBrandRes[]>(
    "get_car_brand",
    () => vehicleApi.getCarBrands().then((res: any) => res?.result?.data),
    {
      dedupingInterval: 1000,
      ...SWRConfig,
    }
  )

  return {
    data,
    isValidating,
  }
}
