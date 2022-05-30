import { useState } from "react"
import Calendar from "react-calendar"

export const CalendarBox = () => {
  const [value, onChange] = useState(new Date())

  return (
    <div className="calendar">
      <Calendar
        locale="vi"
        view="month"
        defaultValue={value}
        onChange={onChange}
        activeStartDate={value}
        minDate={value}
        value={new Date()}
      />
    </div>
  )
}
