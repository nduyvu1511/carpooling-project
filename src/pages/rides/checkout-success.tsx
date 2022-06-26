import { RideContainer } from "@/container"
import Link from "next/link"
import { useRouter } from "next/router"
import { useFetchDetailCompoundingCar } from "shared/hook"

const CheckoutSuccess = () => {
  const router = useRouter()
  const { data: compoundingCar } = useFetchDetailCompoundingCar(
    "get_compounding_car_detail_checkout"
  )

  if (compoundingCar?.state !== "confirm_deposit") return null
  return (
    <RideContainer onClickBackBtn={() => router.push("/")} heading="Thanh toán thành công">
      <div className="content-container px-24 checkout-success">
        <h1 className="page-heading">
          Hãy tưởng tượng đây là trang thanh toán thành công với một cái bill với chi tiết thông tin
          và một cái bản đồ ahihi
        </h1>
        <Link href="/">
          <a className="btn-primary">Về trang chủ</a>
        </Link>
      </div>
    </RideContainer>
  )
}

export default CheckoutSuccess
