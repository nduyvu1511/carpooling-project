import { RootState } from "@/core/store"
import { CreateUserFormParams } from "@/models"
import { userApi } from "@/services"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"

interface UserRes {
  updateUserInfo: (params: UpdateUserInfoParams) => void
}

interface UpdateUserInfoParams {
  params: CreateUserFormParams
  onSuccess: Function
  onError?: Function
}

const useUser = (shouldFetch?: boolean): UserRes => {
  const { token } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const updateUserInfo = async (props: UpdateUserInfoParams) => {
    const { onSuccess, params, onError } = props
    try {
      const res: any = await userApi.updateUserInfo(params)
      if (!res?.result?.success) {
        onError && onError()
        dispatch(notify(res?.result?.message, "error"))
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      onError && onError()
    }
  }

  // const { data, error, isValidating, mutate } = useSWR(
  //   "user_info_edit",
  //   shouldFetch
  //     ? () =>
  //         userApi.getUserInfo({ token }).then((res: any) => {
  //           const user = res?.result?.data || {}
  //           if (res?.result?.success) return user
  //         })
  //     : null,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // )

  return {
    updateUserInfo,
  }
}

export { useUser }
