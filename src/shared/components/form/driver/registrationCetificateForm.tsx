import { ImageSingleFile } from "@/components"
import { FormContainer } from "@/container"
import { inspectionCertificateSchema } from "@/core/schema"
import { certificatesRegistrationFormFields } from "@/helper"
import {
  CertificateInspectionParamsNoToken,
  CertificateInspectionRes,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

interface RegistrationCetificateFormProps {
  defaultValues?: CertificateInspectionRes
  onSubmit: (params: CertificateInspectionParamsNoToken) => void
}

export const RegistrationCetificateForm = ({
  onSubmit,
  defaultValues,
}: RegistrationCetificateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    control,
  } = useForm<CertificateInspectionParamsNoToken>({
    resolver: yupResolver(inspectionCertificateSchema),
    mode: "all",
    defaultValues: {
      back_inspection_certificate_image_url:
        defaultValues?.back_inspection_certificate_image?.id,
      front_inspection_certificate_image_url:
        defaultValues?.front_inspection_certificate_image?.id,
      date_of_expiry: defaultValues?.date_of_expiry,
      identity_number: defaultValues?.identity_number,
    },
  })

  const [frontImage, setFrontImage] = useState<string>()
  const [backImage, setBackImage] = useState<string>()

  const onSubmitHandler = (data: CertificateInspectionParamsNoToken) => {
    onSubmit &&
      onSubmit({
        ...data,
        back_inspection_certificate_image_url: Number(
          data.back_inspection_certificate_image_url
        ),
        front_inspection_certificate_image_url: Number(
          data.front_inspection_certificate_image_url
        ),
      })
  }

  return (
    <FormContainer
      isBtnDisabled={!isValid}
      btnLabel="Lưu"
      onAction={handleSubmit(onSubmitHandler)}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {certificatesRegistrationFormFields.map((field) => (
          <div key={field.name} className="form-item">
            <label htmlFor={field.name} className="form-item-label">
              {field.label}{" "}
              {field?.isRequired ? (
                <span className="form-label-warning">(Bắt buộc)</span>
              ) : (
                <span className="form-label-sm">(Không bắt buộc)</span>
              )}
            </label>

            {field.type === "file" ? (
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange } }) => (
                  <div className="driver-bio__form-input">
                    <ImageSingleFile
                      id={field.name}
                      image={
                        field.name === "front_inspection_certificate_image_url"
                          ? frontImage ||
                            defaultValues?.front_inspection_certificate_image
                              ?.url
                          : backImage ||
                            defaultValues?.back_inspection_certificate_image
                              ?.url
                      }
                      isError={!!errors?.[field.name]?.message}
                      getImage={(img) => {
                        onChange(img.attachment_id)
                        field.name === "front_inspection_certificate_image_url"
                          ? setFrontImage(img.attachment_url)
                          : setBackImage(img.attachment_url)
                      }}
                    />
                  </div>
                )}
                rules={{ required: true }}
              />
            ) : null}

            {field.type === "date" ? (
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, onBlur } }) => (
                  <input
                    className={`form-item-input ${
                      errors?.[field.name] ? "form-item-input-error" : ""
                    }`}
                    defaultValue={
                      field.name === "date_of_expiry"
                        ? defaultValues?.date_of_expiry
                        : undefined
                    }
                    id={field.name}
                    type="date"
                    onBlur={onBlur}
                    onChange={(e) => {
                      onChange(e.target.value)
                    }}
                  />
                )}
                rules={{ required: true }}
              />
            ) : null}

            {field.type === "text" ? (
              <input
                className={`form-item-input ${
                  errors?.[field.name] ? "form-item-input-error" : ""
                }`}
                id={field.name}
                type="text"
                defaultValue={
                  field.name === "identity_number"
                    ? defaultValues?.identity_number
                    : undefined
                }
                placeholder={field.label}
                {...register(field.name, {
                  required: true,
                })}
              />
            ) : null}

            {errors[field.name] || dirtyFields[field.name] ? (
              <p className="form-item-input-text-error">
                {errors[field.name]?.message}
              </p>
            ) : null}
          </div>
        ))}
      </form>
    </FormContainer>
  )
}
