import { CompoundingType } from "@/models"
import moment from "moment"
import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useCountdown } from "shared/hook"

interface CountdownCompoundingProps {
  secondsRemains: number
  onExpiredCoundown: Function
}

export const CountdownCompounding = ({
  onExpiredCoundown,
  secondsRemains,
}: CountdownCompoundingProps) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const targetDate = useMemo(() => {
    return moment(new Date(), "DD/MM/YYYY hh:mm:ss").add(secondsRemains, "seconds").toString()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [days, hours, minutes, seconds] = useCountdown({
    targetDate,
  })

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      onExpiredCoundown()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds])

  return (
    <span className="countdown-minute">
      {`0${minutes}`.slice(-2)}: {`0${seconds}`.slice(-2)}
    </span>
  )
}
