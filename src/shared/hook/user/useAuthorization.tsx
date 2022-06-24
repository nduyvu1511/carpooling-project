import { RootState } from "@/core/store"
import { DriverAccountStatus } from "@/models"
import { useSelector } from "react-redux"

interface Res {
  role: "customer" | "car_driver" | "guest"
  driver_type?: DriverAccountStatus
}

export const useAuthorization = (): Res => {
  const { userInfo } = useSelector((state: RootState) => state.user)

  return {
    role: userInfo?.car_account_type || "guest",
    driver_type: userInfo?.verified_car_driver_account,
  }
}
