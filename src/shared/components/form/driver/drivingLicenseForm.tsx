import { ImageSingleFile } from "@/components"
import { FormContainer } from "@/container"
import { drivingLicenseSchema } from "@/core/schema"
import { drivingClassList, drivingLicenseFormFields } from "@/helper"
import { DrivingLicenseFormParams, DrivingLicenseRes } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"

interface DrivingLicenseFormProps {
  defaultValues?: DrivingLicenseRes
  onSubmit: (params: DrivingLicenseFormParams) => void
}

const DrivingLicenseForm = ({
  onSubmit,
  defaultValues,
}: DrivingLicenseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    control,
  } = useForm<DrivingLicenseFormParams>({
    resolver: yupResolver(drivingLicenseSchema),
    mode: "all",
    defaultValues: {
      back_license_image_url: defaultValues?.back_license_image_url?.id,
      front_license_image_url: defaultValues?.front_license_image_url?.id,
      date_of_expiry: defaultValues?.date_of_expiry,
      date_of_issue: defaultValues?.date_of_issue,
      identity_number: defaultValues?.identity_number,
      license_class: defaultValues?.license_class,
    },
  })

  const [frontImage, setFrontImage] = useState<string>()
  const [backImage, setBackImage] = useState<string>()

  const onSubmitHandler = (data: DrivingLicenseFormParams) => {
    onSubmit &&
      onSubmit({
        ...data,
        front_license_image_url: Number(data.front_license_image_url),
        back_license_image_url: Number(data.back_license_image_url),
      })
  }

  return (
    <FormContainer
      isBtnDisabled={!isValid}
      btnLabel="Lưu"
      onAction={handleSubmit(onSubmitHandler)}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {drivingLicenseFormFields.map((field) => (
          <div key={field.name} className="form-item">
            <label htmlFor={field.name} className="form-item-label">
              {field.placeholder}{" "}
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
                        field.name === "front_license_image_url"
                          ? frontImage ||
                            defaultValues?.front_license_image_url?.url
                          : backImage ||
                            defaultValues?.back_license_image_url?.url
                      }
                      isError={!!errors?.[field.name]?.message}
                      getImage={(img) => {
                        onChange(img.attachment_id)
                        field.name === "front_license_image_url"
                          ? setFrontImage(img.attachment_url)
                          : setBackImage(img.attachment_url)
                      }}
                    />
                  </div>
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
                placeholder={field.placeholder}
                {...register(field.name, {
                  required: true,
                })}
                defaultValue={
                  field.name === "identity_number"
                    ? defaultValues?.identity_number
                    : undefined
                }
              />
            ) : null}

            {field.type === "select" ? (
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, onBlur } }) => (
                  <Select
                    defaultValue={
                      field.name === "license_class"
                        ? drivingClassList.find(
                            (item) =>
                              item.value === defaultValues?.license_class + ""
                          )
                        : undefined
                    }
                    className={`${
                      errors?.[field.name] ? "form-item-select-error" : ""
                    }`}
                    placeholder={field.placeholder}
                    onChange={(val) => val?.value && onChange(val.value + "")}
                    options={
                      field.name === "license_class" ? drivingClassList : []
                    }
                    onBlur={onBlur}
                    id={field.name}
                  />
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
                        : field.name === "date_of_issue"
                        ? defaultValues?.date_of_issue
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

export default DrivingLicenseForm
