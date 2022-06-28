import { RootState } from "@/core/store"
import { ridesApi } from "@/services"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import { useToken } from "./useToken"

interface Res {
  confirmDoneCompoundingCar: (id: number, cb?: Function, _cb?: Function) => void
  startRunningCompoundingCar: (compounding_car_id: number, cb?: Function, _cb?: Function) => void
  confirmDoneCompoundingCarCustomer: (
    params: { compounding_car_customer_id: number; customer_id: number },
    onSuccess?: Function,
    onErr?: Function
  ) => void
}

const useCompoundingCarProcess = (): Res => {
  const { token } = useToken()
  const dispatch = useDispatch()

  const confirmDoneCompoundingCar = async (
    compounding_car_id: number,
    onSuccess?: Function,
    onErr?: Function
  ) => {
    if (!token) return
    try {
      const res: any = await ridesApi.confirmDoneCompoundingCar({ token, compounding_car_id })
      if (!res?.result?.success) {
        dispatch(notify(res?.result?.message || "Có lỗi xảy ra vui lòng thử lại sau"))
        onErr && onErr()
        return
      }
      onSuccess && onSuccess()
    } catch (error) {
      onErr && onErr()
      console.log(error)
    }
  }

  const startRunningCompoundingCar = async (
    compounding_car_id: number,
    onSuccess?: Function,
    onErr?: Function
  ) => {
    if (!token) return
    try {
      const res: any = await ridesApi.startRunningCompoundingCar({ compounding_car_id, token })
      if (!res?.result?.success) {
        dispatch(notify(res?.result?.message || "Có lỗi xảy ra vui lòng thử lại sau"))
        onErr && onErr()
        return
      }
      onSuccess && onSuccess()
    } catch (error) {
      onErr && onErr()
      console.log(error)
    }
  }

  const confirmDoneCompoundingCarCustomer = async (
    params: { compounding_car_customer_id: number; customer_id: number },
    onSuccess?: Function,
    onErr?: Function
  ) => {
    if (!token) return
    try {
      const res: any = await ridesApi.driverConfirmCompoundingCarCustomer({
        ...params,
        token,
      })
      if (!res?.result?.success) {
        dispatch(notify(res?.result?.message || "Có lỗi xảy ra vui lòng thử lại sau"))
        onErr && onErr()
        return
      }
      onSuccess && onSuccess()
    } catch (error) {
      onErr && onErr()
      console.log(error)
    }
  }

  return {
    confirmDoneCompoundingCar,
    startRunningCompoundingCar,
    confirmDoneCompoundingCarCustomer,
  }
}

export { useCompoundingCarProcess }
