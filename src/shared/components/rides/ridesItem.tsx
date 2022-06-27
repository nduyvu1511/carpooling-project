import { menWalkIcon } from "@/assets"
import { formatMoneyVND } from "@/helper"
import { CompoundingCarRes } from "@/models"
import { API_URL } from "@/services"
import moment from "moment"
import Image from "next/image"
import { useRouter } from "next/router"
import { AiFillStar } from "react-icons/ai"
import { FaRegClock } from "react-icons/fa"
import { MdOutlineDirectionsCarFilled, MdOutlinePriceChange } from "react-icons/md"
import { RouteItem } from "./routeItem"

interface RidesItemProps {
  rides: CompoundingCarRes
  type?: "driver" | "customer"
  view?: "detail" | "item"
  onClick?: (params: number) => void
}

export const RidesItem = ({ rides, type = "customer", view = "item", onClick }: RidesItemProps) => {
  const router = useRouter()

  return (
    <div
      onClick={() =>
        onClick
          ? onClick(rides.compounding_car_id)
          : router.push(`/rides/${rides.compounding_car_id}`)
      }
      className="rides__item cursor-pointer"
    >
      <p className="rides__item-title">{rides.compounding_car_name}</p>
      <div className="rides__item-top">
        <RouteItem
          fromDate={rides.expected_going_on_date}
          toDate={rides.expected_picking_up_date}
          fromProvince={rides.from_province.province_name}
          toProvince={rides.to_province.province_name}
        />
      </div>

      <div className="rides__item-content">
        <div className="rides__item-info">
          <div className="rides__item-info-item">
            <p className="rides__item-info-item-l">
              <FaRegClock /> <span>Ngày đi:</span>
            </p>
            <p className="rides__item-info-item-r">
              {moment(rides.expected_going_on_date).format("HH:MM, DD/MM/YYYY")}
            </p>
          </div>

          {rides.expected_picking_up_date ? (
            <div className="rides__item-info-item">
              <p className="rides__item-info-item-l">
                <FaRegClock /> <span>Ngày về:</span>
              </p>
              <p className="rides__item-info-item-r">
                {moment(rides.expected_picking_up_date).format("HH:MM, DD/MM/YYYY")}
              </p>
            </div>
          ) : null}

          <div className="rides__item-info-item">
            <p className="rides__item-info-item-l">
              <MdOutlinePriceChange />{" "}
              <span>{`Giá${type === "customer" ? " / 1 khách" : ""}:`}</span>
            </p>
            <p className="rides__item-info-item-r rides__item-info-item-price">
              {formatMoneyVND(rides.price_unit.price_unit)}
            </p>
          </div>

          <div className="rides__item-info-item">
            <p className="rides__item-info-item-l">
              <MdOutlineDirectionsCarFilled /> <span>Loại xe:</span>
            </p>
            <p className="rides__item-info-item-r rides__item-info-item-price">{rides.car.name}</p>
          </div>

          <div className="rides__item-info-item">
            <ul className="rides__item-info-passengers">
              {Array.from({ length: rides.number_seat_in_car }).map((item, index) => (
                <li
                  key={index}
                  className={`rides__item-info-passengers-item ${
                    index >= rides.number_available_seat
                      ? "rides__item-info-passengers-item-active"
                      : ""
                  }`}
                >
                  {menWalkIcon()}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* {type === "customer" ? (
          <div className="rides__item-author">
            <div className="rides__item-author-avatar">
              <div className="image-container">
                <Image
                  src={`${API_URL}${rides?.car_driver_id?.avatar_url}`}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>

            <div className="rides__item-author-info">
              <div className="rides__item-author-info-inner">
                <p className="rides__item-author-info-name">
                  {rides?.car_driver_id?.partner_name || ""}
                </p>
                <p className="rides__item-author-info-star">
                  <AiFillStar />5
                </p>
              </div>
            </div>
          </div>
        ) : null} */}
      </div>

      {view === "item" ? (
        <div className="rides__item-action">
          <button className="btn-primary-text">Xem Chi Tiết</button>
        </div>
      ) : null}
    </div>
  )
}
