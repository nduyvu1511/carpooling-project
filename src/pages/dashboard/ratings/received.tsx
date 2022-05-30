import { emptyRating } from "@/assets"
import { RatingContainer } from "@/container"
import { MainNoFooter } from "@/layout"

const RatingReceived = () => {
  return (
    <RatingContainer>
      <div className="rating__received">
        <div className="rating__empty">
          {emptyRating}
          <h3 className="rating__empty-text">
            Bạn chưa đánh giá được bất kỳ đánh giá nào.
          </h3>
        </div>
      </div>
    </RatingContainer>
  )
}

RatingReceived.Layout = MainNoFooter

export default RatingReceived
