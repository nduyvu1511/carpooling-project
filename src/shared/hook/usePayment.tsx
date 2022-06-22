import { RootState } from "@/core/store"
import {
  ConfirmTransactionParams,
  CreatePaymentDriverParams,
  CreatePaymentParams,
  CreatePaymentRes,
  PaymentRes,
  UseParams,
} from "@/models"
import { setScreenLoading } from "@/modules"
import { ridesApi } from "@/services"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"
import { useToken } from "./useToken"

interface UsePasswordRes {
  data: PaymentRes[]
  isValidating: boolean
  createPayment: (
    props: UseParams<CreatePaymentParams, CreatePaymentRes>
  ) => void
  confirmTransaction: (props: UseParams<ConfirmTransactionParams, any>) => void
  createPaymentForDriver: (
    props: UseParams<CreatePaymentDriverParams, CreatePaymentRes>
  ) => void
}

export const usePayment = (shouldFetch = false): UsePasswordRes => {
  const dispatch = useDispatch()
  const { token } = useToken()

  const { data, isValidating, mutate } = useSWR(
    "compounding_payment",
    shouldFetch && token
      ? () =>
          ridesApi
            .getPaymentMethods(token)
            .then((res: any) => res?.result?.data)
            .catch((err) => console.log(err))
      : null,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  const createPayment = async (
    props: UseParams<CreatePaymentParams, CreatePaymentRes>
  ) => {
    if (!token) return
    dispatch(setScreenLoading(true))
    const { params, onSuccess, onError } = props

    try {
      const res: any = await ridesApi.createPayment({
        ...params,
        token,
      })
      dispatch(setScreenLoading(false))

      if (res?.result?.success) {
        onSuccess && onSuccess(res?.result?.data)
      } else {
        onError && onError()
      }
    } catch (error) {
      onError && onError()
      dispatch(setScreenLoading(false))
    }
  }

  const createPaymentForDriver = async (
    props: UseParams<CreatePaymentDriverParams, CreatePaymentRes>
  ) => {
    if (!token) return
    dispatch(setScreenLoading(true))
    const { params, onSuccess, onError } = props

    try {
      const res: any = await ridesApi.createPaymentForDriver({
        ...params,
        token,
      })
      dispatch(setScreenLoading(false))

      if (res?.result?.success) {
        onSuccess && onSuccess(res?.result?.data)
      } else {
        onError && onError()
      }
    } catch (error) {
      onError && onError()
      dispatch(setScreenLoading(false))
    }
  }

  const confirmTransaction = async (
    props: UseParams<ConfirmTransactionParams, any>
  ) => {
    if (!token) return
    dispatch(setScreenLoading(true))
    const { params, onSuccess, onError } = props

    try {
      const res: any = await ridesApi.confirmTransaction({
        ...params,
        token,
      })
      dispatch(setScreenLoading(false))

      if (res?.result?.success) {
        onSuccess && onSuccess(res?.result?.data)
      } else {
        onError && onError()
      }
    } catch (error) {
      onError && onError()
      dispatch(setScreenLoading(false))
    }
  }

  return {
    data,
    isValidating,
    confirmTransaction,
    createPaymentForDriver,
    createPayment,
  }
}
