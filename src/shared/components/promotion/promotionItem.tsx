import Image from "next/image"

export const PromotionItem = () => {
  return (
    <div className="promotion__item">
      <div className="promotion__item-img">
        <div className="image-container">
          <Image
            src="https://cf.shopee.vn/file/d60798e3c7667613c410a47d216adbd0_tn"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="promotion__item-content">
        <div className="promotion__item-top">
          <p className="promotion__item-content-title">
            Mã giảm giá cho áo thun
          </p>
        </div>
        <div className="promotion__item-content-bottom">
          <p className="promotion__item-content-date">còn 2 ngày</p>
          <button className="btn-primary-text promotion__item-content-action">
            Sử dụng ngay
          </button>
        </div>
      </div>
    </div>
  )
}
