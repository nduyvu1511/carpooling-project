/* eslint-disable @next/next/no-img-element */
import { cautionImg, driveImg } from "@/assets"
import { HomeContent, RideItem, RidesForm } from "@/components"
import { quotes } from "@/helper"
import { MainLayout } from "@/layout"
import { useRouter } from "next/router"
// export async function getStaticProps() {
//   return {
//     revalidate: 10,
//   }
// }

const Home = () => {
  const router = useRouter()

  return (
    <section className="home">
      <div className="home__banner">
        <div className="home__banner-content">
          <h3 className="home__banner-content-heading">
            Lựa chọn của bạn với mức giá thấp
          </h3>

          <div className="home__banner-content-form">
            <RidesForm />
          </div>
        </div>
      </div>

      <div className="home__content home__content-first">
        <div className="container">
          <ul className="home__content-list grid grid-col-1 grid-col-md-3">
            {quotes.map((item, index) => (
              <li className="home__content-list-item" key={index}>
                {item.icon}
                <h5 className="home__content-list-item-title">{item.title}</h5>
                <p className="home__content-list-item-desc">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <HomeContent
        desc=" Tại BlaBlaCar, chúng tôi đang làm việc chăm chỉ để làm cho nền
                tảng của chúng tôi an toàn nhất có thể. Nhưng khi lừa đảo xảy
                ra, chúng tôi muốn bạn biết chính xác cách tránh và báo cáo
                chúng. Thực hiện theo các mẹo của chúng tôi để giúp chúng tôi
                giữ an toàn cho bạn."
        heading="Giúp chúng tôi giữ cho bạn an toàn trước những trò gian lận"
        image={cautionImg}
        label="Học thêm"
        className="home__content-info home__content-second"
        onClick={() => {}}
      />

      <HomeContent
        desc=" Hãy làm cho cuộc hành trình ít tốn kém nhất của bạn từ trước đến
        nay."
        heading="Bạn muốn đi đâu?"
        image={driveImg}
        label="Tạo một chuyến đi"
        className="home__content-info home__content-third"
        onClick={() => {
          router.push("/offer-seats/departure")
        }}
      />

      <div className="home__content-rides">
        <div className="container">
          <h3 className="home__content-heading">Bạn muốn đi đến đâu?</h3>
          <div className="">
            <ul className="grid grid-col-1 grid-col-md-3 rides__list">
              <li className="rides__list-item">
                <RideItem
                  fromLocation="Norwitch city"
                  toLocation="Manchester"
                />
              </li>
              <li className="rides__list-item">
                <RideItem
                  fromLocation="Norwitch city"
                  toLocation="Manchester"
                />
              </li>
              <li className="rides__list-item">
                <RideItem
                  fromLocation="Norwitch city"
                  toLocation="Manchester"
                />
              </li>
            </ul>
          </div>

          <div className="home__content-rides-btn">
            <button className="btn-reset">Xem thêm</button>
          </div>
        </div>
      </div>
    </section>
  )
}

Home.Layout = MainLayout

export default Home
