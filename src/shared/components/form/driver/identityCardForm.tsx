import { ImageSingleFile } from "@/components"
import { FormContainer } from "@/container"
import { identityCardSchema } from "@/core/schema"
import { addressToOptions, idCardFormFields } from "@/helper"
import {
  IdCardName,
  IdCardParamsNoToken,
  IdentityCardRes,
  OptionModel,
} from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import Select from "react-select"
import { notify } from "reapop"
import { useAddressOptions } from "shared/hook"

interface IdentityCardFormProps {
  onSubmit: (params: IdCardParamsNoToken) => void
  defaultValues?: IdentityCardRes
}

export const IdentityCardForm = ({
  onSubmit,
  defaultValues,
}: IdentityCardFormProps) => {
  const dispatch = useDispatch()
  const {
    provinceOptions,
    wardOptions,
    districtOptions,
    getDistricts,
    getWards,
  } = useAddressOptions(
    defaultValues?.province_id?.province_id,
    defaultValues?.district_id?.district_id
  )
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    control,
    resetField,
  } = useForm<IdCardParamsNoToken>({
    resolver: yupResolver(identityCardSchema),
    mode: "all",
    defaultValues: {
      back_identity_card_image_url:
        defaultValues?.back_identity_card_image_url?.id || undefined,
      front_identity_card_image_url:
        defaultValues?.front_identity_card_image_url?.id || undefined,
      date_of_expiry: defaultValues?.date_of_expiry,
      country_id: defaultValues?.country_id?.country_id,
      district_id: defaultValues?.district_id?.district_id,
      ward_id: defaultValues?.district_id?.district_id,
      date_of_issue: defaultValues?.date_of_issue,
      identity_number: defaultValues?.identity_number,
      place_of_issue: defaultValues?.place_of_issue,
      province_id: defaultValues?.province_id?.province_id,
      street: defaultValues?.street,
    },
  })

  const [frontImage, setFrontImage] = useState<string>()
  const [backImage, setBackImage] = useState<string>()

  const onSubmitHandler = (data: IdCardParamsNoToken) => {
    onSubmit &&
      onSubmit({
        ...data,
        back_identity_card_image_url: Number(data.back_identity_card_image_url),
        front_identity_card_image_url: Number(
          data.front_identity_card_image_url
        ),
        country_id: 241,
        district_id: Number(data.district_id),
        ward_id: Number(data.ward_id),
        province_id: Number(data.province_id),
      })
  }

  const getOptionsSelect = (name: IdCardName): OptionModel[] => {
    if (name === "province_id" || name === "place_of_issue") {
      return provinceOptions
    }
    if (name === "ward_id") {
      return wardOptions
    }
    if (name === "district_id") {
      return districtOptions
    }

    return []
  }

  return (
    <FormContainer
      isBtnDisabled={!isValid}
      btnLabel="Lưu"
      onAction={handleSubmit(onSubmitHandler)}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {idCardFormFields.map((field) => (
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
                        (field.name === "front_identity_card_image_url"
                          ? frontImage ||
                            defaultValues?.front_identity_card_image_url?.url
                          : backImage ||
                            defaultValues?.back_identity_card_image_url?.url) ||
                        ""
                      }
                      isError={!!errors?.[field.name]?.message}
                      getImage={(file) => {
                        field.name === "front_identity_card_image_url" &&
                          setFrontImage(file.attachment_url)
                        field.name === "back_identity_card_image_url" &&
                          setBackImage(file.attachment_url)
                        onChange(file.attachment_id)
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
              />
            ) : null}

            {field.type === "select" ? (
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, onBlur } }) => (
                  <Select
                    defaultValue={
                      field.name === "province_id" && defaultValues?.province_id
                        ? {
                            value: defaultValues?.province_id?.province_id,
                            label: defaultValues?.province_id?.province_name,
                          }
                        : field.name === "district_id" &&
                          defaultValues?.district_id
                        ? {
                            value: defaultValues?.district_id?.district_id,
                            label: defaultValues?.district_id?.district_name,
                          }
                        : field.name === "ward_id" && defaultValues?.ward_id
                        ? {
                            value: defaultValues?.ward_id?.ward_id,
                            label: defaultValues?.ward_id?.ward_name,
                          }
                        : field.name === "place_of_issue" &&
                          defaultValues?.place_of_issue
                        ? {
                            value: defaultValues?.place_of_issue,
                            label: defaultValues?.place_of_issue,
                          }
                        : undefined
                    }
                    className={`${
                      errors?.[field.name] ? "form-item-select-error" : ""
                    }`}
                    placeholder={field.placeholder}
                    onChange={(val) => {
                      onChange(
                        field.name === "place_of_issue"
                          ? val?.label
                          : val?.value
                      )

                      if (field.name === "province_id") {
                        if (districtOptions?.length) {
                          resetField("district_id")
                          dispatch(
                            notify("Vui lòng chọn lại Quận/Huyện", "warning")
                          )
                        }
                        if (wardOptions?.length) {
                          resetField("ward_id")
                          dispatch(
                            notify("Vui lòng chọn lại Phường/Xã", "warning")
                          )
                        }

                        getDistricts(Number(val?.value))
                      }

                      if (field.name === "district_id") {
                        getWards(Number(val?.value))
                        if (wardOptions?.length) {
                          dispatch(
                            notify("Vui lòng chọn lại Phường/Xã", "warning")
                          )
                          resetField("ward_id")
                        }
                      }
                    }}
                    onBlur={onBlur}
                    id={field.name}
                    options={getOptionsSelect(field.name) as []}
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
                    defaultValue={defaultValues?.[field.name] + ""}
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
