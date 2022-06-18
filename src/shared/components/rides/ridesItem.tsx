import { formatMoneyVND, PRIMARY_COLOR } from "@/helper"
import Image from "next/image"
import { useRouter } from "next/router"
import { AiFillStar } from "react-icons/ai"
import { FaRegClock } from "react-icons/fa"
import { RouteItem } from "./routeItem"
import { menWalkIcon } from "@/assets"
import {
  MdOutlineDirectionsCarFilled,
  MdOutlinePriceChange,
} from "react-icons/md"

export const RidesItem = () => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push("/rides/detail")}
      className="rides__item cursor-pointer"
    >
      <div className="rides__item-top">
        <RouteItem />
      </div>

      <div className="rides__item-content">
        <div className="rides__item-info">
          <div className="rides__item-info-item">
            <p className="rides__item-info-item-l">
              <FaRegClock /> <span>Ngày đi:</span>
            </p>
            <p className="rides__item-info-item-r">12/06/2022</p>
          </div>

          <div className="rides__item-info-item">
            <p className="rides__item-info-item-l">
              <MdOutlinePriceChange /> <span>Giá / 1 khách:</span>
            </p>
            <p className="rides__item-info-item-r rides__item-info-item-price">
              {formatMoneyVND(1200000)}
            </p>
          </div>

          <div className="rides__item-info-item">
            <p className="rides__item-info-item-l">
              <MdOutlineDirectionsCarFilled /> <span>Loại xe:</span>
            </p>
            <p className="rides__item-info-item-r rides__item-info-item-price">
              7 Chỗ
            </p>
          </div>

          <div className="rides__item-info-item">
            <ul className="rides__item-info-passengers">
              {Array.from({ length: 4 }).map((item, index) => (
                <li
                  key={index}
                  className={`rides__item-info-passengers-item ${
                    index < 2 ? "rides__item-info-passengers-item-active" : ""
                  }`}
                >
                  {menWalkIcon()}
                </li>
              ))}
            </ul>
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
          </div>
        </div>
      </div>

      <div className="rides__item-action">
        <button className="btn-primary-text">Xem Chi Tiết</button>
      </div>
    </div>
  )
}
