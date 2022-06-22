import {
  CompoundingCarRes,
  CreateCompoundinCarDriver,
  GetDetailCompounding,
  UpdateCompoundingCarDriver,
  UseParams
} from "@/models"
import { setScreenLoading } from "@/modules"
import { ridesApi } from "@/services"
import { useDispatch } from "react-redux"
import { useToken } from "./useToken"

interface Res {
  createCompoundingCar: (
    _params: UseParams<CreateCompoundinCarDriver, CompoundingCarRes>
  ) => void
  updateCompoundingCar: (
    _params: UseParams<UpdateCompoundingCarDriver, CompoundingCarRes>
  ) => void
  confirmCompoundingCar: (
    _params: UseParams<GetDetailCompounding, CompoundingCarRes>
  ) => void
}

export const useCreateDriverCompoundingCar = (): Res => {
  const dispath = useDispatch()
  const { token } = useToken()

  const createCompoundingCar = async (
    _params: UseParams<CreateCompoundinCarDriver, CompoundingCarRes>
  ) => {
    const { onSuccess, params, onError } = _params
    try {
      dispath(setScreenLoading(true))
      const res: any = await ridesApi.createCompoundingCarForDriver({
        ...params,
        token,
      })
      dispath(setScreenLoading(false))
      if (!res?.result?.success) {
        onError && onError()
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      dispath(setScreenLoading(false))
      onError && onError()
    }
  }

  const confirmCompoundingCar = async (
    _params: UseParams<GetDetailCompounding, CompoundingCarRes>
  ) => {
    const { onSuccess, params, onError } = _params
    try {
      dispath(setScreenLoading(true))
      const res: any = await ridesApi.confirmCompoundingCarForDriver({
        ...params,
        token,
      })
      dispath(setScreenLoading(false))
      if (!res?.result?.success) {
        onError && onError()
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      dispath(setScreenLoading(false))
      onError && onError()
    }
  }

  const updateCompoundingCar = async (
    _params: UseParams<UpdateCompoundingCarDriver, CompoundingCarRes>
  ) => {
    const { onSuccess, params, onError } = _params
    try {
      dispath(setScreenLoading(true))
      const res: any = await ridesApi.updateCompoundingCarForDriver({
        ...params,
        token,
      })
      dispath(setScreenLoading(false))
      if (!res?.result?.success) {
        onError && onError()
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      dispath(setScreenLoading(false))
      onError && onError()
    }
  }

  return {
    confirmCompoundingCar,
    createCompoundingCar,
    updateCompoundingCar,
  }
}
