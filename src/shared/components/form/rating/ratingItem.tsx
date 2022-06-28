import { blankAvatar } from "@/assets"
import { Star } from "@/components/star"
import Image from "next/image"
import { useState } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { CgTrash } from "react-icons/cg"
import { FiEdit } from "react-icons/fi"

interface RatingItemProps {}

export const RatingItem = ({}: RatingItemProps) => {
  return (
    <div className="rating__item">
      <div className="rating__item-l">
        <div className="rating__item-author">
          <div className="rating__item-author-avatar image-container">
            <Image src={blankAvatar} layout="fill" alt="" objectFit="cover" />
          </div>
          <div className="rating__item-author-r">
            <p className="rating__item-author-name">Nduyvu</p>
            <p className="rating__item-author-date">2 Ngày trước</p>
          </div>
        </div>
        <div className="rating__item-content-star">
          <Star readonly ratingValue={80} size={14} allowHalfIcon />
        </div>

        <div className="rating__item-content">
          <p className="rating__item-content-title">Đây là nhận xét của người dùng</p>
        </div>
      </div>

      <div className="rating__item-r">
        <button className="btn-reset rating__item-delete">
          <FiEdit />
        </button>
        <button className="btn-reset">
          <CgTrash />
        </button>
      </div>
    </div>
  )
}
