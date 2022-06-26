import { arrowRightIcon, blankAvatar } from "@/assets"
import { Map, RouteItem } from "@/components"
import { RideContainer } from "@/container"
import Image from "next/image"
import React from "react"

const ScheduleDetail = () => {
  return (
    <RideContainer heading="Chi tiết chuyến đi" showBtn btnLabel="Bắt đầu chuyến đi">
      <div className="content-container px-24">
        <div className="schedule__detail-info">
          <p className="schedule__detail-info-title">Chuyến đi từ TP.HCM đi Cà Mau</p>
        </div>

        <div className="schedule__detail">
          <div className="schedule__detail-map">
            <Map viewOnly />
          </div>

          <div className="schedule__detail-customers">
            <div className="schedule__customer px-24">
              <div className="schedule__customer-info">
                <div className="image-container schedule__customer-info-avatar">
                  <Image src={blankAvatar} alt="" objectFit="cover" layout="fill" />
                </div>
                <div className="schedule__customer-info-content">
                  <p className="schedule__customer-info-content-name">{"Nduyvu"}</p>
                </div>

                <p className="schedule__customer-info-date">08:00, 07/02/2022</p>
              </div>

              <div className="schedule__customer-action">
                <div className="schedule__customer-address">
                  <p className="schedule__customer-address-from">
                    <span>Đi từ:</span>Ngã tư hàng xanh
                  </p>
                  <p className="schedule__customer-address-to">
                    <span>Đến tại:</span>Bến xe cà mau
                  </p>
                </div>
                <button className="btn-reset">
                  {arrowRightIcon(24)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RideContainer>
  )
}

export default ScheduleDetail
