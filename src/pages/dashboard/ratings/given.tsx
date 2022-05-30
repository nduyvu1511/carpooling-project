import { emptyRating } from "@/assets"
import { RatingContainer } from "@/container"
import { MainNoFooter } from "@/layout"

const RatingGiven = () => {
  return (
    <RatingContainer>
      <div className="rating__given">
        <div className="rating__empty">
          {emptyRating}
          <h3 className="rating__empty-text">
            Bạn chưa nhận được bất kỳ đánh giá nào.
          </h3>
        </div>
      </div>
    </RatingContainer>
  )
}

RatingGiven.Layout = MainNoFooter

export default RatingGiven
