import { RootState } from "@/core/store"
import {
  RegistrationCertificateRes,
  UpdateVehicleDetailFormParams,
  UseParams,
  VehicleDetailFormParams,
} from "@/models"
import { setScreenLoading } from "@/modules"
import { userApi } from "@/services"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import useSWR from "swr"

interface UseRegistrationCertificateRes {
  data: RegistrationCertificateRes | undefined
  isValidating: boolean
  createRegistrationCertificate: (
    para: UseParams<VehicleDetailFormParams, RegistrationCertificateRes>
  ) => void
  updateRegistrationCertificate: (
    para: UseParams<UpdateVehicleDetailFormParams, RegistrationCertificateRes>
  ) => void
}

const useRegistrationCertificate = (
  shouldFetch = false
): UseRegistrationCertificateRes => {
  const { token } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const { data, isValidating } = useSWR<RegistrationCertificateRes>(
    "registration_certificate",
    shouldFetch && token
      ? () =>
          userApi
            .getCertificateRegistrationVehicle(token)
            .then((res: any) => res?.result?.data)
      : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 1000,
      revalidateOnFocus: false,
    }
  )

  const createRegistrationCertificate = async (
    para: UseParams<VehicleDetailFormParams, RegistrationCertificateRes>
  ) => {
    if (!token) return
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.createCertificateRegistrationVehicle({
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

  const updateRegistrationCertificate = async (
    para: UseParams<UpdateVehicleDetailFormParams, RegistrationCertificateRes>
  ) => {
    if (!token) return
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.updateCertificateRegistrationVehicle({
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

  return {
    data,
    isValidating,
    createRegistrationCertificate,
    updateRegistrationCertificate,
  }
}

export { useRegistrationCertificate }
