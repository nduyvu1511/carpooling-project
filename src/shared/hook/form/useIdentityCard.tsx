import { RootState } from "@/core/store"
import {
  IdCardParams,
  IdCardUpdateParams,
  IdentityCardRes,
  UseParams,
} from "@/models"
import { setScreenLoading } from "@/modules"
import { userApi } from "@/services"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import useSWR from "swr"

interface UseIdentityCardRes {
  data: IdentityCardRes | undefined
  isValidating: boolean
  createIdentityCard: (para: UseParams<IdCardParams, IdentityCardRes>) => void
  updateIdentityCard: (
    para: UseParams<IdCardUpdateParams, IdentityCardRes>
  ) => void
}

const useIdentityCard = (shouldFetch = false): UseIdentityCardRes => {
  const { token } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const { data, isValidating } = useSWR<IdentityCardRes>(
    "identity_card",
    shouldFetch && token
      ? () =>
          userApi.getIdentityCard(token).then((res: any) => res?.result?.data)
      : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 1000,
      revalidateOnFocus: false,
    }
  )

  const createIdentityCard = async (
    para: UseParams<IdCardParams, IdentityCardRes>
  ) => {
    if (!token) return
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.createIdentityCard({ ...params, token })
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

  const updateIdentityCard = async (
    para: UseParams<IdCardUpdateParams, IdentityCardRes>
  ) => {
    if (!token) return
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.updateIdentityCard({ ...params, token })
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

  return { data, isValidating, createIdentityCard, updateIdentityCard }
}

export { useIdentityCard }
