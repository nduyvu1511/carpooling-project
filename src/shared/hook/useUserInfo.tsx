import { RootState } from "@/core/store"
import { CreateUserFormParams, UseParams, UserInfo } from "@/models"
import { setScreenLoading } from "@/modules"
import { userApi } from "@/services"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import useSWR from "swr"

interface UserRes {
  data: UserInfo | undefined
  isValidating: boolean
  createUserInfo: (para: UseParams<CreateUserFormParams, UserInfo>) => void
  updateUserInfo: (para: UseParams<CreateUserFormParams, UserInfo>) => void
}

const useUserInfo = (shouldFetch = false): UserRes => {
  const { token } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const { data, isValidating } = useSWR<UserInfo>(
    "user_info",
    shouldFetch && token
      ? () => userApi.getUserInfo(token).then((res: any) => res?.result?.data)
      : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 1000,
      revalidateOnFocus: false,
    }
  )

  const createUserInfo = async (
    para: UseParams<CreateUserFormParams, UserInfo>
  ) => {
    if (!token && !para.params?.token) return
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.createUserInfo({
        ...params,
        token: para.params?.token || token,
      })
      dispatch(setScreenLoading(false))
      if (!res?.result?.success) {
        onError && onError()
        dispatch(notify(res?.result?.message, "error"))
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      onError && onError()
      dispatch(setScreenLoading(false))
    }
  }

  const updateUserInfo = async (
    para: UseParams<CreateUserFormParams, UserInfo>
  ) => {
    const { onSuccess, params, onError } = para
    if (!token && !para.params?.token) return
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.updateUserInfo({
        ...params,
        token: para.params?.token || token,
      })
      dispatch(setScreenLoading(false))

      if (!res?.result?.success) {
        onError && onError()
        dispatch(notify(res?.result?.message, "error"))
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      onError && onError()
      dispatch(setScreenLoading(false))
    }
  }

  return { data, isValidating, createUserInfo, updateUserInfo }
}

export { useUserInfo }
