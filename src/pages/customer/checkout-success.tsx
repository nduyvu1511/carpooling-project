import { RideContainer } from "@/container"
import Link from "next/link"
import { useRouter } from "next/router"
import { useFetchCompoundingCarCustomer } from "shared/hook"

const CheckoutSuccessC = () => {
  const router = useRouter()
  const { data: compoundingCarCustomer, isValidating } = useFetchCompoundingCarCustomer(
    "get_compounding_car_customer_detail_checkout"
  )

  if (!compoundingCarCustomer?.compounding_car_customer_id) return null
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

export default CheckoutSuccessC
