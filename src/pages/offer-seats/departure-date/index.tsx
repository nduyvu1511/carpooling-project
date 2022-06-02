import { CalendarBox } from "@/components"
import { RideContainer } from "@/container"
import { useRouter } from "next/router"

const DepartureDate = () => {
  const router = useRouter()

  
  return (
    <RideContainer
      showBtn
      onClick={() => router.push("/offer-seats/departure-date/time")}
      heading="Chọn ngày đi"
    >
      <div className="departure-date__container content-container px-24">
        <div className="departure-date__inner">
          <CalendarBox />
        </div>
      </div>
    </RideContainer>
  )
}

export default DepartureDate
