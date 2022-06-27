import { RideContainer } from "@/container"

const CompoundingCarInProcess = () => {
  // if (compoundingCarDetail?.compounding_type !== "compounding") {
  //     console.log(compoundingCarDetail)
  //   } else {
  //   }
  return (
    <RideContainer heading="Xe đang khởi hành" showBtn btnLabel="Kết thúc chuyến đi">
      <div className="content-container px-24">
        <h1 className="page-heading">Chuyến đi của bạn đang được khởi hành...</h1>
        <button className="btn-primary">Xem trên Google Maps</button>
      </div>
      <div>CompoundingCarInProcess</div>
    </RideContainer>
  )
}

export default CompoundingCarInProcess
