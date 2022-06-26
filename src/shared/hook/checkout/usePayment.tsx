import { PaymentRes } from "@/models"
import { ridesApi } from "@/services"
import { useEffect, useState } from "react"
import { useToken } from "../user/useToken"

interface UsePasswordRes {
  paymentList: PaymentRes[]
  isLoading: boolean
  currentSelectPayment: PaymentRes | undefined
  setCurrentSelectPayment: (params: PaymentRes) => void
}

export const usePayment = (): UsePasswordRes => {
  const { token } = useToken()
  const [currentSelectPayment, setCurrentSelectPayment] = useState<PaymentRes | undefined>(
    undefined
  )
  const [isLoading, setLoading] = useState<boolean>(false)
  const [paymentList, setPaymentList] = useState<PaymentRes[]>([])

  useEffect(() => {
    if (!token) return
    setLoading(true)
    ridesApi
      .getPaymentMethods(token)
      .then((res: any) => {
        setLoading(false)
        setPaymentList(res?.result?.data)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    currentSelectPayment,
    setCurrentSelectPayment,
    isLoading,
    paymentList,
  }
}
