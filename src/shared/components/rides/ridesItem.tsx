import { menWalkIcon } from "@/assets"
import { formatMoneyVND } from "@/helper"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { AiFillStar } from "react-icons/ai"

export const RidesItem = () => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push("/rides/detail")}
      className="rides__item cursor-pointer"
    >
      <div className="rides__item-top">
        <div className="rides__item-info">
          <div className="rides__item-info-time">
            <div className="rides__item-info-time-start">
              <p className="rides__item-info-time-start-date">11:40</p>
              <p className="rides__item-info-time-start-duration">4h30</p>
            </div>
            <div className="rides__item-info-time-end">
              <p className="rides__item-info-time-end-date">16:10</p>
            </div>
          </div>

          <div className="rides__item-info-line"></div>

          <div className="rides__item-info-location">
            <div className="rides__item-info-location-item rides__item-info-location-item-from">
              <div className="rides__item-info-location-name">
                TP Hồ Chí Minh
              </div>
              <div className="rides__item-info-location-quantity">
                <span className="rides__item-info-location-quantity-item">
                  {menWalkIcon()}
                </span>
              </div>
            </div>

            <div className="rides__item-info-location-item">
              <div className="rides__item-info-location-name">TP Hải Phòng</div>
              <div className="rides__item-info-location-quantity">
                <span className="rides__item-info-location-quantity-item">
                  {menWalkIcon()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rides__item-author">
        <div className="rides__item-author-avatar">
          <div className="image-container">
            <Image
              src={
                "https://cf.shopee.vn/file/09b9fbc2a9d3473a63969c2fc18a1c65_tn"
              }
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        <div className="rides__item-author-info">
          <div className="rides__item-author-info-inner">
            <p className="rides__item-author-info-name">Nduyvu</p>
            <p className="rides__item-author-info-star">
              <AiFillStar />
              4.3
            </p>
          </div>

          <span className="rides__item-price">{formatMoneyVND(1200000)}</span>
        </div>
      </div>
    </div>
  )
}
