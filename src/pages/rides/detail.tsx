import { MainLayout } from "@/layout"

const RideDetail = () => {
  return (
    <section className="rides-detail__container">
      <div className="rides__detail content-container">
        <h1 className="page-heading">Chi tiết chuyến đi</h1>

        <div className="rides__detail-body"></div>
      </div>
    </section>
  )
}

RideDetail.Layout = MainLayout
export default RideDetail
