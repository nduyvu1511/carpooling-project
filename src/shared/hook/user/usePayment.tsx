import {
  ConfirmTransactionParams,
  CreateCompoundingCarRes,
  CreatePaymentDriverParams,
  CreatePaymentParams,
  CreatePaymentRes,
  PaymentRes,
  UseParams,
} from "@/models"
import { setScreenLoading } from "@/modules"
import { ridesApi } from "@/services"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useToken } from "./useToken"

interface UsePasswordRes {
  paymentList: PaymentRes[]
  isPaymentListLoading: boolean
  createPayment: (
    props: UseParams<CreatePaymentParams, CreatePaymentRes>
  ) => void
  confirmTransaction: (props: UseParams<ConfirmTransactionParams, any>) => void
  createPaymentForDriver: (
    props: UseParams<CreatePaymentDriverParams, CreatePaymentRes>
  ) => void
  getCompoundingCarCustomerDetail: (
    compounding_car_customer_id: number,
    cb: (params: CreateCompoundingCarRes | undefined) => void
  ) => void
  currentSelectPayment: PaymentRes | undefined
  setCurrentSelectPayment: (params: PaymentRes) => void
}

export const usePayment = (shouldFetch = false): UsePasswordRes => {
  const dispatch = useDispatch()
  const { token } = useToken()
  const [currentSelectPayment, setCurrentSelectPayment] = useState<
    PaymentRes | undefined
  >(undefined)
  const [isPaymentListLoading, setPaymentListLoading] = useState<boolean>(false)
  const [paymentList, setPaymentList] = useState<PaymentRes[]>([])

  useEffect(() => {
    if (!token) return
    setPaymentListLoading(true)
    ridesApi
      .getPaymentMethods(token)
      .then((res: any) => {
        setPaymentListLoading(false)
        setPaymentList(res?.result?.data)
      })
      .catch((err) => {
        setPaymentListLoading(false)
        console.log(err)
      })
  }, [token])

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

  const getCompoundingCarCustomerDetail = (
    compounding_car_customer_id: number,
    cb: (params: CreateCompoundingCarRes | undefined) => void
  ) => {
    if (!token) return
    ridesApi
      .getDetailCompoundingCarCustomer({
        token,
        compounding_car_customer_id,
      })
      .then((res: any) => cb(res?.result?.data))
      .catch((err) => console.log(err))
  }
  return {
    confirmTransaction,
    createPaymentForDriver,
    createPayment,
    getCompoundingCarCustomerDetail,
    currentSelectPayment,
    setCurrentSelectPayment,
    isPaymentListLoading,
    paymentList,
  }
}
