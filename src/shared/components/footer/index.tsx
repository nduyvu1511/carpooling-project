import { earthIcon, facebookIcon, youtubeIcon } from "@/assets"
import Link from "next/link"
import React from "react"

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="grid grid-col-1 grid-col-md-4 footer__top__inner">
            <div className="footer__top__inner-item">
              <Link href="">
                <a className="footer-link">Làm thế nào nó hoạt động</a>
              </Link>
              <Link href="">
                <a className="footer-link">Di chuyển bằng xe buýt</a>
              </Link>
              <Link href="">
                <a className="footer-link">Tất cả các chuyến xe buýt</a>
              </Link>
            </div>

            <div className="footer__top__inner-item">
              <Link href="">
                <a className="footer-link">Về chúng tôi</a>
              </Link>
              <Link href="">
                <a className="footer-link">Trung tâm trợ giúp</a>
              </Link>
              <Link href="">
                <a className="footer-link">Terms and Conditions</a>
              </Link>
            </div>

            <div className="footer__top__inner-item">
              <Link href="">
                <a className="footer-link">Nhấn</a>
              </Link>
              <Link href="">
                <a className="footer-link">Chúng tôi đang tuyển dụng!</a>
              </Link>
            </div>

            <div className="footer__top__inner-item">
              <Link href="">
                <a className="footer-link">Kết nối với chúng tôi</a>
              </Link>
              <div className="footer__top__inner-item-socials">
                <a
                  className="facebook-icon"
                  href="https://www.facebook.com/satavancom"
                >
                  {facebookIcon()}
                </a>
                <a
                  className="youtube-icon"
                  href="https://www.youtube.com/channel/UCiiDiJ6Zmuwdhvej9XFvEFA"
                >
                  {youtubeIcon()}
                </a>
                <a className="earth-icon" href="https://satavan.com">
                  {earthIcon()}
                </a>
              </div>
            </div>
          </div>
          <small className="footer__top-text">BlaBlaCar, 2022 ©</small>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom__inner">
            <p>
              BlaBlaCar là mạng du lịch dựa trên cộng đồng hàng đầu thế giới.
              Bất kể bạn đang đi đâu, bằng xe buýt hay đi chung xe, hãy tìm một
              chuyến đi hoàn hảo từ nhiều điểm đến và tuyến đường của chúng tôi
              với mức giá thấp.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
