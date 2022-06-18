import { arrowRightIcon } from "@/assets"
import { ScreenContainer } from "@/container"
import { RootState } from "@/core/store"
import { CarAccountType, CreateUserFormParams } from "@/models"
import { setCarAccountType, setToken, setUserInfo } from "@/modules"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { FaCar } from "react-icons/fa"
import { RiAccountCircleFill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useUserInfo } from "shared/hook"

const RegisterType = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { verifiedRegisterToken } = useSelector(
    (state: RootState) => state.auth
  )
  const { updateUserInfo } = useUserInfo()

  useEffect(() => {
    if (!verifiedRegisterToken) router.push("/register")
  }, [verifiedRegisterToken, router])

  if (!verifiedRegisterToken) return null

  const handleRegister = (car_account_type: CarAccountType) => {
    if (!verifiedRegisterToken) return

    if (car_account_type === "customer") {
      updateUserInfo({
        params: {
          car_account_type,
          token: verifiedRegisterToken,
        } as CreateUserFormParams,
        onSuccess: (userInfo) => {
          router.push("additional_info")
          dispatch(setUserInfo(userInfo))
          dispatch(setCarAccountType("customer"))
          dispatch(setToken(verifiedRegisterToken))
        },
      })
    } else {
      dispatch(setCarAccountType("car_driver"))
      router.push("/register/driver/bio_details?type=register")
    }
  }

  return (
    <ScreenContainer heading="Chọn loại tài khoản">
      <div className="content-container px-24">
        <div className="register__option content-container">
          <div
            onClick={() => handleRegister("customer")}
            className="register-option__item"
          >
            <p className="register-option__item-name">
              <RiAccountCircleFill />
              Tài khoản thường
            </p>
            {arrowRightIcon()}
          </div>
          <div
            onClick={() => handleRegister("car_driver")}
            className="register-option__item"
          >
            <p className="register-option__item-name">
              <FaCar />
              Tài khoản tài xế
            </p>
            {arrowRightIcon()}
          </div>
        </div>
      </div>
    </ScreenContainer>
  )
}

export default RegisterType
