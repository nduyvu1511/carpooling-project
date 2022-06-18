import { arrowRightIcon } from "@/assets"
import { formatMoneyVND, GOOGLE_MAP_API_KEY } from "@/helper"
import Image from "next/image"
import {
  Direction,
  Marker,
  Path,
  StaticGoogleMap,
} from "react-static-google-map"

export const RidesDetail = () => {
  return (
    <div className="rides-detail__container">
      <div className="rides__detail-inner content-container px-24">
        <h1 className="page-heading">Chủ nhật, Ngày 5 tháng 6</h1>

        <div className="rides__detail-body">
          <div className="rides__detail">
            <div className="rides__detail-route px-24">
              {/* <RouteItem type="detail" /> */}
              <StaticGoogleMap size="600x200" apiKey={GOOGLE_MAP_API_KEY}>
                <Marker
                  location={{ lat: 10.772983, lng: 106.624317 }}
                  color="blue"
                  label="P"
                />
                {window.google && (
                  <Direction
                    origin="6.503296599999999,3.3589658"
                    destination="6.6142085,3.3580775000000003"
                  />
                )}
              </StaticGoogleMap>
            </div>

            <div className="rides__detail-separate"></div>

            <div className="rides__detail-price px-24">
              <span className="rides__detail-price-title">
                Giá cho 1 hành khách
              </span>

              <span className="rides__detail-price-price">
                {formatMoneyVND(1200000)}
              </span>
            </div>

            <div className="rides__detail-separate"></div>

            <div className="rides__detail-driver px-24">
              <span className="rides__detail-driver-name">Nduyvu</span>

              <div className="rides__detail-driver-avatar">
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

                {arrowRightIcon()}
              </div>
            </div>

            <div className="rides__detail-separate"></div>
          </div>
        </div>
      </div>

      <div className="rides-detail__container-footer">
        <div className="btn-primary">Tiếp tục</div>
      </div>
    </div>
  )
}
