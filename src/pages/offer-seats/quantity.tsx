import { InputQuantity } from "@/components"
import { RideContainer } from "@/container"
import Link from "next/link"
import { useState } from "react"

const Quantity = () => {
  const [quantity, setQuantity] = useState<number>(3)

  return (
    <RideContainer heading="Số lượng">
      <div className="passenger-quantity__container">
        <div className="passenger__quantity content-container px-24">
          <h1 className="passenger__quantity-heading page-heading">
            Bạn có thể chở bao nhiêu hành khách
          </h1>
          <div className="rides__quantity-large">
            <InputQuantity
              quantity={quantity}
              onChangeQuantity={(q) => setQuantity(q)}
            />
          </div>
        </div>
      </div>

      <div className="ride__container-footer departure__footer">
        <Link href="/offer-seats/comment">
          <a className="btn-primary">Tiếp theo</a>
        </Link>
      </div>
    </RideContainer>
  )
}

export default Quantity
