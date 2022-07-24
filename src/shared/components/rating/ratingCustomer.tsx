import { Modal, RatingForm, RatingItem } from "@/components"
import { RideContainer } from "@/container"
import { CreateRatingFormParams, RatingRes } from "@/models"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useToken } from "shared/hook"
import { useCustomerRating, useRatingAction } from "shared/hook/rating"

export const RatingCustomer = () => {
  const dispatch = useDispatch()
  const {
    data: ratingList,
    isValidating,
    mutateDeleteRating,
    mutateUpdateRating,
  } = useCustomerRating()
  const { deleteRating, updateRating } = useRatingAction()
  const { token } = useToken()
  const [showRatingForm, setShowRatingForm] = useState<RatingRes>()

  const handleDeleteRating = (rating_id: number) => {
    deleteRating({
      params: { rating_id, token },
      onSuccess: () => {
        mutateDeleteRating(rating_id)
      },
    })
  }

  const handleUpdateRating = (params: CreateRatingFormParams) => {
    if (!showRatingForm) return
    updateRating({
      params: {
        ...params,
        compounding_car_customer_id: showRatingForm.compounding_car_customer_id,
        token,
        rating_id: showRatingForm.rating_id,
      },
      onSuccess: (params) => {
        mutateUpdateRating(params)
        setShowRatingForm(undefined)
        dispatch(notify("Chỉnh sửa đánh giá thành công", "success"))
      },
    })
  }

  return (
    <>
      <RideContainer heading="Đánh giá của bạn">
        <div className="content-container px-24">
          <div className="rating__list">
            {ratingList.map((item, index) => (
              <RatingItem
                onUpdate={() => {
                  setShowRatingForm(item)
                }}
                onDelete={(id) => handleDeleteRating(id)}
                key={index}
                rating={item}
              />
            ))}
          </div>
        </div>
      </RideContainer>

      {showRatingForm ? (
        <Modal title="Chỉnh sửa đánh giá" onClose={() => setShowRatingForm(undefined)}>
          <div className="px-24">
            <RatingForm
              onSubmit={(data) => handleUpdateRating(data)}
              defaultValue={showRatingForm}
            />
          </div>
        </Modal>
      ) : null}
    </>
  )
}
