import { Star } from "@/components/star"
import { CreateRatingFormParams, RatingRangePost } from "@/models"
import { useState } from "react"
import { useInputText } from "shared/hook"
import { useFetchRatingTags } from "shared/hook/rating"

interface RatingFormProps {
  onSubmit?: (params: CreateRatingFormParams) => void
  ratingTags?: any
}

const data = [
  { value: "Tài xế chạy xe cẩn thận", id: 1 },
  { value: "Tài xế vui tính", id: 2 },
  { value: "Tài xế không hút thuốc", id: 3 },
  { value: "Chất lượng xe tuyệt vời", id: 4 },
]

export const RatingForm = ({ onSubmit }: RatingFormProps) => {
  const { clearValue, onChange, value } = useInputText()
  const [tagsSelect, setTagsSelect] = useState<number[]>([])
  const [ratingNumber, setRatingNumber] = useState<RatingRangePost>()
  const { ratingTags } = useFetchRatingTags(ratingNumber)

  const handleSubmit = () => {
    if (!value || !ratingNumber) return

    onSubmit &&
      onSubmit({
        rating_content: value,
        rating_number: ratingNumber,
        rating_tag_ids: tagsSelect,
      })
  }

  const handleToggleTagInTagsSelect = (id: number) => {
    if (tagsSelect?.includes(id)) {
      setTagsSelect((prev) => [...prev].filter((item) => item !== id))
    } else {
      setTagsSelect((prev) => [...prev, id])
    }
  }

  return (
    <div className="rating__form">
      <div className="rating__form-star">
        <Star
          initialValue={0}
          onClick={(val) => setRatingNumber((val / 20) as RatingRangePost)}
          ratingValue={20}
          size={50}
        />
      </div>

      <div className="rating__form-quickReview">
        {ratingTags?.length > 0 ? (
          <ul className="tag__list">
            {ratingTags.map((item) => (
              <li
                className={`tag__list-item ${
                  tagsSelect?.includes(item.tag_id) ? "tag__list-item-active" : ""
                }`}
                onClick={() => handleToggleTagInTagsSelect(item.tag_id)}
                key={item.tag_id}
              >
                {item.tag_content}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="rating__form-desc">
        <textarea
          className="form-textarea"
          placeholder="Nhập nội dung đánh giá..."
          onChange={onChange}
          value={value}
          rows={5}
        ></textarea>
      </div>

      <div className="rating__form-action">
        <button onClick={handleSubmit} className={`btn-primary ${!value ? "btn-disabled" : ""}`}>
          Thêm đánh giá
        </button>
      </div>
    </div>
  )
}
