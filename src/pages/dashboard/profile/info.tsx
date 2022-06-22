import { UserInfoForm } from "@/components"
import { RideContainer } from "@/container"
import { RootState } from "@/core/store"
import { CarAccountType } from "@/models"
import { setUserInfo } from "@/modules"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import { useUserInfo } from "shared/hook"

const Info = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: RootState) => state.user)
  const { updateUserInfo } = useUserInfo()

  return (
    <RideContainer heading="Thông tin người dùng">
      <div className="content-container px-24">
        <UserInfoForm
          onSubmit={(data) => {
            updateUserInfo({
              params: {
                ...data,
                token: "",
                car_account_type: userInfo?.car_account_type as CarAccountType,
              },
              onSuccess: (userInfo) => {
                dispatch(setUserInfo(userInfo))
                dispatch(notify("Chỉnh sửa thông tin thành công", "success"))
              },
            })
          }}
          defaultValues={userInfo}
        />
      </div>
    </RideContainer>
  )
}

export default Info
