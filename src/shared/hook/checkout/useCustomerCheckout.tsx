import {
  ConfirmTransactionParams,
  CompoundingCarCustomer,
  CreatePaymentParams,
  CreatePaymentRes,
  UseParams,
} from "@/models"
import { setScreenLoading } from "@/modules"
import { ridesApi } from "@/services"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useToken } from "../user/useToken"

interface UsePasswordRes {
  createPayment: (props: UseParams<CreatePaymentParams, CreatePaymentRes>) => void
  confirmTransaction: (props: UseParams<ConfirmTransactionParams, any>) => void
  getCompoundingCarCustomerDetail: (
    compounding_car_customer_id: number,
    cb: (params: CompoundingCarCustomer | undefined) => void
  ) => void
  confirmDepositCompoundingCarCustomer: (
    compounding_car_customer_id: number,
    cb?: Function,
    onErr?: Function
  ) => void
  confirmDepositLoading: boolean
  confirmPayFullForCompoundingCarCustomer: (
    compounding_car_customer_id: number,
    cb: (params: CompoundingCarCustomer) => void,
    onErr?: Function
  ) => void
}

export const useCustomerCheckout = (): UsePasswordRes => {
  const dispatch = useDispatch()
  const { token } = useToken()
  const [confirmDepositLoading, setConfirmDepositLoading] = useState<boolean>(false)

  const createPayment = async (props: UseParams<CreatePaymentParams, CreatePaymentRes>) => {
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

  const confirmTransaction = async (props: UseParams<ConfirmTransactionParams, any>) => {
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
    cb: (params: CompoundingCarCustomer | undefined) => void
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

  const confirmDepositCompoundingCarCustomer = async (
    compounding_car_customer_id: number,
    cb?: Function,
    onErr?: Function
  ) => {
    if (!token) return
    try {
      setConfirmDepositLoading(true)
      const res: any = await ridesApi.confirmDepositCompoundingCarCustomer({
        compounding_car_customer_id: compounding_car_customer_id,
        token,
      })
      setConfirmDepositLoading(false)
      const result: CompoundingCarCustomer = res?.result?.data
      if (result?.state === "deposit") {
        cb && cb()
      } else {
        onErr && onErr()
      }
    } catch (err) {
      setConfirmDepositLoading(false)
      onErr && onErr()
      console.log(err)
    }
  }

  const confirmPayFullForCompoundingCarCustomer = async (
    compounding_car_customer_id: number,
    cb: (params: CompoundingCarCustomer) => void,
    onErr?: Function
  ) => {
    if (!token) return
    try {
      setConfirmDepositLoading(true)
      const res: any = await ridesApi.customerConfirmPayFullCompoundingCar({
        compounding_car_customer_id,
        token,
      })
      setConfirmDepositLoading(false)
      const result: CompoundingCarCustomer = res?.result?.data
      if (result?.state === "confirm_paid") {
        cb && cb(result)
      } else {
        onErr && onErr()
      }
    } catch (err) {
      setConfirmDepositLoading(false)
      onErr && onErr()
      console.log(err)
    }
  }

  return {
    confirmTransaction,
    createPayment,
    getCompoundingCarCustomerDetail,
    confirmDepositCompoundingCarCustomer,
    confirmDepositLoading,
    confirmPayFullForCompoundingCarCustomer,
  }
}
