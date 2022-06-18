import moment from "moment"
import { useCountdown } from "shared/hook"

interface CountdownMinuteProps {
  targetDate: string
}

export const CountdownMinute = ({ targetDate }: CountdownMinuteProps) => {
  const [days, hours, minutes, seconds] = useCountdown({
    targetDate,
  })

  return (
    <span className="countdown-minute">
      {minutes}: {seconds}
    </span>
  )
}
