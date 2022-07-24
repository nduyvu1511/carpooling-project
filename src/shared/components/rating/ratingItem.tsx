import { blankAvatar } from "@/assets"
import { Star } from "@/components/star"
import { formatTimeType } from "@/helper"
import { RatingRes } from "@/models"
import Image from "next/image"
import { CgTrash } from "react-icons/cg"
import { FiEdit } from "react-icons/fi"
import { MdOutlineReportGmailerrorred } from "react-icons/md"

interface RatingItemProps {
  rating: RatingRes
  onDelete?: (id: number) => void
  onUpdate?: (id: number) => void
  onReport?: Function
  role?: "car_driver" | "customer"
}

export const RatingItem = ({
  rating,
  onDelete,
  onUpdate,
  onReport,
  role = "customer",
}: RatingItemProps) => {
  return (
    <div className="rating__item">
      <div className="rating__item-l">
        <div className="rating__item-author">
          <div className="rating__item-author-avatar image-container">
            <Image src={blankAvatar} layout="fill" alt="" objectFit="cover" />
          </div>
        </div>
      </div>

      <div className="rating__item-content">
        <p className="rating__item-content-name">{rating.partner_id.partner_name}</p>
        <p className="rating__item-content-date">{`${rating.duration.time_value} ${formatTimeType(
          rating.duration.time_type
        )} trước`}</p>

        <div className="rating__item-content-star">
          <Star readonly ratingValue={rating.rating_number * 20} size={14} allowHalfIcon />
        </div>

        <div className="rating__item-content">
          <p className="rating__item-content-title">{rating.rating_content}</p>
        </div>
      </div>

      <div className="rating__item-actions">
        {role === "customer" ? (
          <>
            <button
              onClick={() => onUpdate && onUpdate(rating.rating_id)}
              className="btn-reset rating__item-delete"
            >
              <FiEdit />
            </button>
            <button onClick={() => onDelete && onDelete(rating.rating_id)} className="btn-reset">
              <CgTrash />
            </button>
          </>
        ) : (
          <button onClick={() => onReport && onReport(rating.rating_id)} className="btn-reset">
            <MdOutlineReportGmailerrorred />
          </button>
        )}
      </div>
    </div>
  )
}
