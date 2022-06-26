import {
  CreatePaymentDriverParams,
  CreatePaymentRes,
  DepositCompoundingCarDriverFailureRes,
  DepositCompoundingCarDriverRes,
  UseParams,
} from "@/models"
import { setScreenLoading } from "@/modules"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useToken } from "../user/useToken"

interface UsePasswordRes {
  deposit: DepositCompoundingCarDriverRes | undefined
  depositLoading: boolean
  depositFailure: DepositCompoundingCarDriverFailureRes | undefined
  isCompoundingCarLoading: boolean
  cancelDepositCompoundingCarDriver: (compounding_car_id: number, cb?: Function) => void
  setDepositFailure: (params: DepositCompoundingCarDriverFailureRes | undefined) => void
  createPaymentForDriver: (props: UseParams<CreatePaymentDriverParams, CreatePaymentRes>) => void
}

export const useDriverCheckout = (): UsePasswordRes => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = useToken()
  const { compounding_car_id } = router.query

  const [deposit, setDeposit] = useState<DepositCompoundingCarDriverRes>()
  const [depositLoading, setDepositLoading] = useState<boolean>(false)
  const [depositFailure, setDepositFailure] = useState<
    DepositCompoundingCarDriverFailureRes | undefined
  >()
  const [isCompoundingCarLoading, setCompoundingCarLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!token || !compounding_car_id) return
    fetchDepositCompoundingCarDriver(Number(compounding_car_id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compounding_car_id])

  const fetchDepositCompoundingCarDriver = (compounding_car_id: number) => {
    setDepositLoading(true)
    ridesApi
      .getDepositCompoundingCarDriver({
        compounding_car_id,
        token,
      })
      .then((res: any) => {
        setDepositLoading(false)
        if (!res?.result?.success) {
          setDepositFailure({
            message: res?.result?.message || "",
            data: res?.result?.data || [],
          })
        } else {
          setDeposit(res?.result?.data)
        }
      })
      .catch((err) => {
        setDepositLoading(false)
        console.log(err)
      })
  }

  const cancelDepositCompoundingCarDriver = async (_compounding_car_id: number, cb?: Function) => {
    if (!token || !depositFailure?.data?.length) return

    try {
      const res: any = await ridesApi.cancelDepositForDriver({
        token,
        compounding_car_id: _compounding_car_id,
      })
      if (!res?.result?.success) {
        dispatch(
          notify(res?.result?.message || "Hủy giao dịch thất bại, vui lòng thử lại sau", "error")
        )
        return
      }
      fetchDepositCompoundingCarDriver(Number(compounding_car_id))
      dispatch(notify("Hủy giao dịch thành công", "success"))
      cb && cb()
      setTimeout(() => {
        setDepositFailure(undefined)
      }, 0)
    } catch (error) {
      console.log(error)
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

  return {
    deposit,
    depositLoading,
    depositFailure,
    isCompoundingCarLoading,
    cancelDepositCompoundingCarDriver,
    createPaymentForDriver,
    setDepositFailure,
  }
}
