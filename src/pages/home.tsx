/* eslint-disable @next/next/no-img-element */
import { blankAvatar, logoIcon } from "@/assets"
import { RidesSearchForm, RidesItem } from "@/components"
import { MobileLayout } from "@/layout"
import { API_URL } from "@/services"
import Image from "next/image"
import { useRouter } from "next/router"
import { CgArrowRight, CgArrowsExchange } from "react-icons/cg"
import { RiCarWashingLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { RootState } from "../core"
// export async function getStaticProps() {
//   return {
//     revalidate: 10,
//   }
// }

const Home = () => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.user)

  return (
    <section className="home-mobile__container">
      <header className="home-mobile__header px-24">
        {logoIcon(130, 28)}
        <p className="home-mobile__header-slogan">
          Ứng dụng đặt xe đường dài số 2 Việt Nam
        </p>
      </header>
      <div className="home-mobile__content px-24">
        <div className="home-mobile__user">
          <p className="home-mobile__user-name">Chào Nduyvu</p>

          <div className="image-container">
            <Image
              src={
                userInfo?.avatar_url
                  ? `${API_URL}${userInfo.avatar_url?.image_url || ""}`
                  : blankAvatar
              }
              objectFit="cover"
              layout="fill"
              alt=""
            />
          </div>
        </div>
        <ul className="home-mobile__nav">
          <li className="home-mobile__nav-item">
            <div className="nav__item">
              <div className="nav__item-icon">
                <CgArrowRight />
              </div>
              <span className="nav__item-title">Một Chiều</span>
            </div>
          </li>
          <li className="home-mobile__nav-item">
            <div className="nav__item">
              <div className="nav__item-icon">
                <CgArrowsExchange />
              </div>
              <span className="nav__item-title">Hai Chiều</span>
            </div>
          </li>
          <li className="home-mobile__nav-item">
            <div className="nav__item">
              <div className="nav__item-icon">
                <RiCarWashingLine />
              </div>
              <span className="nav__item-title">Đi Ghép</span>
            </div>
          </li>
          <li className="home-mobile__nav-item">
            <div className="nav__item">
              <div className="nav__item-icon">
                <CgArrowsExchange />
              </div>
              <span className="nav__item-title">Tạo Chuyến Đi</span>
            </div>
          </li>
        </ul>

        <div className="home-mobile__form">
          <RidesSearchForm />
        </div>

        <br />
        <br />

        <div className="home-mobile-rides__list grid grid-col-1">
          <RidesItem />
          <RidesItem />
          <RidesItem />
          <RidesItem />
        </div>
      </div>
    </section>
  )
}

Home.Layout = MobileLayout

export default Home
