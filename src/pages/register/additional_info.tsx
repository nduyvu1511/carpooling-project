import { UserInfoForm } from "@/components"
import { ScreenContainer } from "@/container"
import { RootState } from "@/core/store"
import { UserInfoFormParams } from "@/models"
import { clearRegisterData, setUserInfo } from "@/modules"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useUserInfo } from "shared/hook"

const AdditionalInfo = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { carAccountType, verifiedRegisterToken } = useSelector(
    (state: RootState) => state.auth
  )
  const { updateUserInfo } = useUserInfo()

  useEffect(() => {
    if (!verifiedRegisterToken) {
      router.push("/register")
      return
    }

    if (!carAccountType) {
      router.push("/register/type")
      return
    }
  }, [verifiedRegisterToken, router, carAccountType])

  const handleSubmit = (data: UserInfoFormParams) => {
    if (!verifiedRegisterToken || !carAccountType) return

    updateUserInfo({
      params: {
        ...data,
        car_account_type: carAccountType,
        avatar_attachment_id: Number(data.avatar_attachment_id),
        token: verifiedRegisterToken,
      },
      onSuccess: (userInfo) => {
        dispatch(setUserInfo(userInfo))
        router.push("/")

        setTimeout(() => {
          dispatch(clearRegisterData())
        }, 0)
      },
    })
  }

  if (!verifiedRegisterToken || !carAccountType) return null

  return (
    <ScreenContainer heading="Bổ sung thông tin">
      <div className="content-container px-24">
        <UserInfoForm onSubmit={(data) => handleSubmit(data)} />
        <button className="btn-cancel">Hủy</button>
      </div>
    </ScreenContainer>
  )
}

export default AdditionalInfo
