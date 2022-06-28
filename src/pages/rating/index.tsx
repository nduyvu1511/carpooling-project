import { RatingForm } from "@/components"
import { RideContainer } from "@/container"
import { CreateRatingFormParams } from "@/models"
import { setScreenLoading } from "@/modules"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useToken } from "shared/hook"
import { useRatingAction } from "shared/hook/rating"

const Rating = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { addRating } = useRatingAction()
  const dispatch = useDispatch()
  const { token } = useToken()

  const handleAddRating = (params: CreateRatingFormParams) => {
    if (!compounding_car_customer_id || !token) return
    dispatch(setScreenLoading(true))
    addRating(
      {
        ...params,
        token,
        compounding_car_customer_id: Number(compounding_car_customer_id),
      },
      () => {
        dispatch(setScreenLoading(false))
        dispatch(notify("Thêm đánh giá thành công", "success"))
      },
      () => {
        dispatch(setScreenLoading(false))
      }
    )
  }

  return (
    <RideContainer heading="Tạo mới đánh giá">
      <div className="rating-container">
        <div className="content-container px-24">
          <div className="rating__inner">
            <RatingForm onSubmit={(data) => handleAddRating(data)} />
          </div>
        </div>
      </div>
    </RideContainer>
  )
}

export default Rating
