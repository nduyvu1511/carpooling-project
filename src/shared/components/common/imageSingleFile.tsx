import { removeBase64Reader } from "@/helper"
import { AttachmentItem, AttachmentRouteType } from "@/models"
import { API_URL } from "@/services"
import Image from "next/image"
import { ChangeEvent } from "react"
import { AiFillCamera } from "react-icons/ai"
import { RiLoader4Line } from "react-icons/ri"
import { useAttachment, useUploadAttachment } from "shared/hook"

interface ImageFileProps {
  getImage?: (params: AttachmentItem) => void
  isError?: boolean
  image?: string | undefined
  id: string
  type?: AttachmentRouteType
}

export const ImageSingleFile = ({
  getImage,
  isError,
  image,
  id,
  type = "common",
}: ImageFileProps) => {
  const { isUploading, uploadImages } = useUploadAttachment()
  const { getBase64Images } = useAttachment({
    limit: 1,
    useState: false,
  })
  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    getBase64Images(files, (imgs) => {
      if (!imgs?.[0]) return
      const image = imgs?.[0] || ""
      if (!image) return

      const btnDOM = document.querySelector(
        ".form__container-footer .form__container-footer-btn "
      )
      const labelImage = document.querySelector(`.file-image-pickup-${id}`)

      labelImage?.classList.remove("form-item-input-error")
      btnDOM?.classList.add("pointer-event-none")
      uploadImages({
        params: [{ file: removeBase64Reader(image), type: "image" }],
        type,
        onSuccess: (files) => {
          btnDOM?.classList.remove("pointer-event-none")

          getImage &&
            getImage({
              attachment_id: files[0].attachment_id,
              attachment_url: files[0].attachment_url,
            })
        },
        onError: () => {
          btnDOM?.classList.remove("pointer-event-none")
          btnDOM?.classList.add("btn-not-allowed")
          labelImage?.classList.add("form-item-input-error")
        },
      })
    })
  }

  return (
    <div
      style={{
        pointerEvents: isUploading ? "none" : "unset",
        userSelect: "none",
      }}
    >
      <input
        onChange={uploadImage}
        id={id}
        hidden
        type="file"
        name=""
        accept="image/*"
      />
      <label
        htmlFor={id}
        className={`image-container file-image-pickup ${
          isError ? "form-item-input-error" : ""
        } file-image-pickup-${id}`}
      >
        {image ? (
          <Image
            src={`${API_URL}${image}`}
            alt=""
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <AiFillCamera />
        )}

        {isUploading ? (
          <span className="file-image-loading">
            <RiLoader4Line className="loader" />
          </span>
        ) : null}
      </label>

      <label className="file-image-action" htmlFor={id}>
        {image ? "Thay đổi hình ảnh" : "Tải ảnh lên"}
      </label>
    </div>
  )
}
