import { RootState } from "@/core/store"
import { CompoundingType } from "@/models"
import { setCurrentCompoundingCarCustomer } from "@/modules"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import { useCountdown } from "shared/hook"

interface CountdownCompoundingProps {
  targetDate: string
  type: CompoundingType
}

export const CountdownCompounding = ({
  targetDate,
  type,
}: CountdownCompoundingProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [days, hours, minutes, seconds] = useCountdown({
    targetDate,
  })
  const {
    currentCarpoolingCompoundingCarCustomer,
    currentOneWayCompoundingCarCustomer,
    currentTwoWayCompoundingCarCustomer,
  } = useSelector((state: RootState) => state.compounding)

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      dispatch(
        setCurrentCompoundingCarCustomer({
          key: type,
          value: undefined,
        })
      )

      router.push("/")
      dispatch(notify("Hết phiên giao dịch, vui lòng thử lại sau", "warning"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds])

  return (
    <span className="countdown-minute">
      {`0${minutes}`.slice(-2)}: {`0${seconds}`.slice(-2)}
    </span>
  )
}
