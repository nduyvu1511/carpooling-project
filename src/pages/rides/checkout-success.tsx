import { RideContainer } from "@/container"
import Link from "next/link"
import React from "react"

const CheckoutSuccess = () => {
  return (
    <RideContainer heading="Thanh toán thành công">
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
