import { RootState } from "@/core/store"
import {
  DrivingLicenseParams,
  DrivingLicenseRes,
  UpdateDrivingLicenseParams,
  UseParams,
} from "@/models"
import { setScreenLoading } from "@/modules"
import { userApi } from "@/services"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import useSWR from "swr"

interface UseVehicleDrivingLicenseRes {
  data: DrivingLicenseRes | undefined
  isValidating: boolean 
  createVehicleDrivingLicense: (
    para: UseParams<DrivingLicenseParams, DrivingLicenseRes>
  ) => void
  updateVehicleDrivingLicense: (
    para: UseParams<UpdateDrivingLicenseParams, DrivingLicenseRes>
  ) => void
}

const useVehicleDrivingLicense = (
  shouldFetch = false
): UseVehicleDrivingLicenseRes => {
  const { token } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const { data, isValidating } = useSWR<DrivingLicenseRes>(
    "vehicle_driving_license",
    shouldFetch && token
      ? () =>
          userApi.getDrivingLicense(token).then((res: any) => res?.result?.data)
      : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 1000,
      revalidateOnFocus: false,
    }
  )

  const createVehicleDrivingLicense = async (
    para: UseParams<DrivingLicenseParams, DrivingLicenseRes>
  ) => {
    if (!token) return
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.createDrivingLicense({
        ...params,
        token,
      })
      dispatch(setScreenLoading(false))

      if (!res?.result?.success) {
        onError && onError()
        dispatch(notify(res?.result?.message, "error"))
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      onError && onError()
      dispatch(setScreenLoading(false))
    }
  }

  const updateVehicleDrivingLicense = async (
    para: UseParams<UpdateDrivingLicenseParams, DrivingLicenseRes>
  ) => {
    if (!token) return
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.updateDrivingLicense({ ...params, token })
      dispatch(setScreenLoading(false))

      if (!res?.result?.success) {
        onError && onError()
        dispatch(notify(res?.result?.message, "error"))
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      onError && onError()
      dispatch(setScreenLoading(false))
    }
  }

  return {
    data,
    isValidating,
    createVehicleDrivingLicense,
    updateVehicleDrivingLicense,
  }
}

export { useVehicleDrivingLicense }
