import { RatingItem } from "@/components"
import { RideContainer } from "@/container"
import { useDispatch } from "react-redux"
import { useToken } from "shared/hook"
import { useDriverRating, useRatingAction } from "shared/hook/rating"

export const RatingDriver = () => {
  const dispatch = useDispatch()
  const { data: ratingList, isValidating } = useDriverRating()
  const { reportRating } = useRatingAction()
  const { token } = useToken()

  const handleReportRating = (rating_id: number) => {
    reportRating({
      params: { rating_id, token },
      onSuccess: () => {},
    })
  }

  return (
    <RideContainer heading="Đánh giá về bạn">
      <div className="content-container px-24">
        <div className="rating__list">
          {ratingList.map((item, index) => (
            <RatingItem
              key={index}
              rating={item}
              role={"car_driver"}
              onReport={() => handleReportRating(item.rating_id)}
            />
          ))}
        </div>
      </div>
    </RideContainer>
  )
}
