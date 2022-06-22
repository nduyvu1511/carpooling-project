import { RideContainer } from "@/container"
import Link from "next/link"
import { useRouter } from "next/router"

const CheckoutSuccess = () => {
  const router = useRouter()

  return (
    <RideContainer
      onClickBackBtn={() => router.push("/")}
      heading="Thanh toán thành công"
    >
      <div className="content-container px-24 checkout-success">
        <h1 className="page-heading">Thanh toán thành công</h1>
        <Link href="/">
          <a className="btn-primary">Về trang chủ</a>
        </Link>
      </div>
    </RideContainer>
  )
}

export default CheckoutSuccess
