import { Star } from "@/components/star"
import { CreateRatingFormParams, RatingRangePost, RatingRes } from "@/models"
import { useEffect, useState } from "react"
import { useInputText } from "shared/hook"
import { useFetchRatingTags } from "shared/hook/rating"

interface RatingFormProps {
  onSubmit?: (params: CreateRatingFormParams) => void
  defaultValue?: RatingRes
}

export const RatingForm = ({ onSubmit, defaultValue }: RatingFormProps) => {
  const [value, setValue] = useState(defaultValue?.rating_content || "")
  const [tagsSelect, setTagsSelect] = useState<number[]>(
    defaultValue?.rating_tag_ids?.map((item) => item.tag_id) || []
  )
  const [ratingNumber, setRatingNumber] = useState<RatingRangePost>(
    defaultValue?.rating_number || 1
  )
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
          initialValue={(defaultValue?.rating_number || 0) * 20}
          onClick={(val) => {
            setRatingNumber((val / 20) as RatingRangePost)
            setTagsSelect([])
          }}
          ratingValue={ratingNumber * 20}
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
          onChange={(e) => setValue(e.target.value)}
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
