import {
  ImageFileLoading,
  InputLoading,
  TextareaLoading,
  UserInfoForm,
} from "@/components"
import { ScreenContainer } from "@/container"
import { RootState } from "@/core/store"
import { DriverLayout } from "@/layout"
import { UserInfoFormParams } from "@/models"
import { setToken, setUserInfo } from "@/modules"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import { useUserInfo } from "shared/hook"

const BioDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { data: userInfo, isValidating, createUserInfo } = useUserInfo(true)
  const { token } = useSelector((state: RootState) => state.user)
  const { verifiedRegisterToken } = useSelector(
    (state: RootState) => state.auth
  )

  const onSubmitHandler = (data: UserInfoFormParams) => {
    if (!verifiedRegisterToken) return
    createUserInfo({
      params: {
        ...data,
        car_account_type: "car_driver",
        token: verifiedRegisterToken || token,
      },
      onSuccess: (userInfo) => {
        dispatch(setUserInfo(userInfo))
        dispatch(setToken(verifiedRegisterToken))
        setTimeout(() => {
          router.push(
            `/register/driver${
              router.query?.type === "register" ? "?type=register" : ""
            }`
          )
        }, 0)
      },
      onError: () => {
        dispatch(notify("Có lỗi xảy ra, vui lòng thử lại", "error"))
      },
    })
  }

  return (
    <ScreenContainer heading="Thông tin người dùng">
      <div className="content-container px-24">
        {!isValidating ? (
          <UserInfoForm onSubmit={onSubmitHandler} defaultValues={userInfo} />
        ) : (
          <>
            <ImageFileLoading />
            <InputLoading />
            <InputLoading />
            <InputLoading />
            <TextareaLoading />
          </>
        )}
      </div>
    </ScreenContainer>
  )
}

BioDetail.Layout = DriverLayout
export default BioDetail
