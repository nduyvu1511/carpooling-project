import Image from "next/image"
import { ChangeEvent } from "react"
import { AiFillCamera } from "react-icons/ai"
import { useAttachment } from "shared/hook"

interface ImageFileProps {
  getBase64Image?: (img: string) => void
  isError?: boolean
}

export const ImageSingleFile = ({
  getBase64Image,
  isError,
}: ImageFileProps) => {
  const { images, getBase64Images } = useAttachment({
    limit: 1,
  })
  const selectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    getBase64Images(files, (imgs) => {
      if (!imgs?.[0]) return
      getBase64Image && getBase64Image(imgs?.[0] || "")
    })
  }

  return (
    <div>
      <input
        onChange={selectImage}
        id="file-image"
        hidden
        type="file"
        name=""
        accept="image/*"
      />
      <label
        htmlFor="file-image"
        className={`image-container file-image-pickup ${
          isError ? "form-item-input-error" : ""
        }`}
      >
        {images?.length ? (
          <Image
            src={images?.[0] || ""}
            alt=""
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <AiFillCamera />
        )}
      </label>

      <label className="file-image-action" htmlFor="file-image">
        {images?.length ? "Thay đổi hình ảnh" : "Tải ảnh lên"}
      </label>
    </div>
  )
}
