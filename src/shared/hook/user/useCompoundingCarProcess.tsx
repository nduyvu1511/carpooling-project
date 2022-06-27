import { ridesApi } from "@/services"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useToken } from "./useToken"

interface Res {
  confirmDoneCompoundingCar: (id: number, cb?: Function, _cb?: Function) => void
  startRunningCompoundingCar: (id: number, cb?: Function, _cb?: Function) => void
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
      const res: any = await ridesApi.startRunningCompoundingCar({ token, compounding_car_id })
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
  }
}

export { useCompoundingCarProcess }
