import { blankAvatar } from "@/assets"
import { MainNoFooter } from "@/layout"
import Image from "next/image"
import React from "react"
import { useAttachment } from "shared/hook"

const Picture = () => {
  const { images, getBase64Images } = useAttachment({ limit: 1 })

  const chooseAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if (!file) return

    getBase64Images(file)
  }

  return (
    <section className="picture-page">
      <div className="container">
        <div className="picture__inner">
          <div className="picture__inner-avatar">
            <label htmlFor="picture-select">
              <div className="image-container">
                <Image
                  src={images?.length ? images?.[0] || "" : blankAvatar}
                  layout="fill"
                  quality={50}
                  alt=""
                  objectFit="cover"
                />
              </div>
              <input
                onChange={chooseAvatar}
                type="file"
                id="picture-select"
                hidden
              />
            </label>
          </div>
          <div className="picture__inner-action">
            <h3 className="page-heading picture__inner-action-heading">
              Đừng đeo kính râm, hãy nhìn thẳng về phía trước và đảm bảo rằng
              bạn đang ở một mình.
            </h3>
            <button className="btn-primary picture__inner-action-btn">
              Chọn hình ảnh
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

Picture.Layout = MainNoFooter
export default Picture
