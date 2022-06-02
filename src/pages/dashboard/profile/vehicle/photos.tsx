import { addCircleIcon, closeIcon } from "@/assets"
import { VehicleContainer } from "@/container"
import { MainNoFooter } from "@/layout"
import Image from "next/image"
import { useRouter } from "next/router"
import { ChangeEvent } from "react"
import { useAttachment } from "shared/hook"

const ModelVehicle = () => {
  const router = useRouter()
  const { images, deleteImage, getBase64Images } = useAttachment({ limit: 10 })

  const selectImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    getBase64Images(files)
  }

  console.log(images)

  return (
    <VehicleContainer
      onBtnClick={() => router.push("/dashboard/profile/vehicle/description")}
      btnLabel="Tiếp theo"
      heading="Thêm hình ảnh về xe của bạn"
    >
      <div className="vehicle__inner">
        <div className="vehicle-image-wrapper px-24">
          <div className="vehicle__image-select">
            <input
              type="file"
              id="image-add"
              name=""
              multiple
              onChange={selectImages}
              hidden
            />
            <label className="btn-primary" htmlFor="image-add">
              Thêm ảnh
            </label>
          </div>

          <ul className="vehicle-image__list">
            {images && images?.length > 0
              ? images?.map((url, index) => (
                  <li key={index} className="vehicle-image__list-item">
                    <div className="image-container vehicle__image">
                      <button
                        onClick={() => {
                          deleteImage(url)
                        }}
                        className="btn-reset vehicle__image-delete-btn"
                      >
                        {closeIcon(14)}
                      </button>
                      <Image src={url} layout="fill" objectFit="cover" alt="" />
                    </div>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </VehicleContainer>
  )
}

ModelVehicle.Layout = MainNoFooter

export default ModelVehicle
