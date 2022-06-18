import { ImageSingleFile } from "@/components"
import { FormContainer } from "@/container"
import { insuranceShema } from "@/core/schema"
import { vehicleInsuranceForm } from "@/helper"
import { VehicleInsuranceParamsNoToken, VehicleInsuranceRes } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

interface VehicleInsuranceFormProps {
  defaultValues?: VehicleInsuranceRes
  onSubmit: (params: VehicleInsuranceParamsNoToken) => void
}

export const VehicleInsuranceForm = ({
  onSubmit,
  defaultValues,
}: VehicleInsuranceFormProps) => {
  const {
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    control,
    register,
  } = useForm<VehicleInsuranceParamsNoToken>({
    resolver: yupResolver(insuranceShema),
    mode: "all",
    defaultValues: {
      back_insurance_image_url: defaultValues?.back_insurance_image_url?.id,
      date_of_expiry: defaultValues?.date_of_expiry,
      date_of_issue: defaultValues?.date_of_issue,
      identity_number: defaultValues?.identity_number,
      front_insurance_image_url: defaultValues?.front_insurance_image_url?.id,
    },
  })

  const [frontImage, setFrontImage] = useState<string>()
  const [backImage, setBackImage] = useState<string>()

  const onSubmitHandler = (data: VehicleInsuranceParamsNoToken) => {
    onSubmit &&
      onSubmit({
        ...data,
        back_insurance_image_url: Number(data.back_insurance_image_url),
        front_insurance_image_url: Number(data.front_insurance_image_url),
      })
  }

  return (
    <FormContainer
      isBtnDisabled={!isValid}
      btnLabel="Lưu"
      onAction={handleSubmit(onSubmitHandler)}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {vehicleInsuranceForm.map((field) => (
          <div key={field.name} className="form-item">
            <label className="form-item-label">
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
                      isError={!!errors?.[field.name]?.message}
                      getImage={(file) => {
                        onChange(file.attachment_id)
                        field.name === "front_insurance_image_url"
                          ? setFrontImage(file.attachment_url)
                          : setBackImage(file.attachment_url)
                      }}
                      image={
                        field.name === "front_insurance_image_url"
                          ? frontImage ||
                            defaultValues?.front_insurance_image_url?.url
                          : backImage ||
                            defaultValues?.back_insurance_image_url?.url
                      }
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
