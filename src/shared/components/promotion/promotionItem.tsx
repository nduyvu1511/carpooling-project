import Image from "next/image"

export const PromotionItem = () => {
  return (
    <div className="promotion__item">
      <div className="promotion__item-img">
        <div className="image-container">
          <Image
            src="https://f12.photo.talk.zdn.vn/543197119994287651/55dd03a4932d53730a3c.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="promotion__item-content">
        <div className="promotion__item-top">
          <p className="promotion__item-content-title">
            Mã giảm giá cho chuyến đi này
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
