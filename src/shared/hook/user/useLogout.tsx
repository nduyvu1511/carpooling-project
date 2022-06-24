import {
  clearAllCurrentCompoundingCarId,
  setToken,
  setUserInfo,
} from "@/modules"
import { useDispatch } from "react-redux"
import { useCompoundingForm } from "../form/useCompoundingForm"

interface Res {
  handleLogout: Function
}

export const useLogout = (): Res => {
  const dispatch = useDispatch()
  const {
    clearCarpoolingWayCompoundingCar,
    clearOneWayCompoundingCar,
    clearTwoWayCompoundingCar,
  } = useCompoundingForm()

  const handleLogout = () => {
    dispatch(setUserInfo())
    dispatch(setToken(""))
    dispatch(clearAllCurrentCompoundingCarId())
    clearCarpoolingWayCompoundingCar()
    clearOneWayCompoundingCar()
    clearTwoWayCompoundingCar()
  }

  return {
    handleLogout,
  }
}
