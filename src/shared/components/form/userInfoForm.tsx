import { ImageSingleFile } from "@/components"
import { FormContainer } from "@/container"
import { userFormSchema } from "@/core/schema"
import { userInfoFormfields } from "@/helper"
import { UserInfo, UserInfoFormParams } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"

interface UserInfoProps {
  defaultValues?: UserInfo
  onSubmit?: (val: UserInfoFormParams) => void
}

export const UserInfoForm = ({ defaultValues, onSubmit }: UserInfoProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    control,
    getValues,
  } = useForm<UserInfoFormParams>({
    resolver: yupResolver(userFormSchema),
    mode: "all",
    defaultValues: {
      avatar_attachment_id: Number(defaultValues?.avatar_url?.image_id),
      date_of_birth: defaultValues?.date_of_birth,
      gender: defaultValues?.gender,
      name: defaultValues?.partner_name,
      description: defaultValues?.description || "",
    },
  })

  const [image, setImage] = useState<string>()

  const onSubmitHandler = (data: UserInfoFormParams) => {
    onSubmit && onSubmit(data)
  }

  return (
    <FormContainer
      isBtnDisabled={!isValid}
      onAction={handleSubmit(onSubmitHandler)}
      btnLabel="Lưu & tiếp tục"
      showFooter
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {userInfoFormfields.map((field) => (
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
                      type="avatar"
                      id={field.name}
                      image={
                        image || defaultValues?.avatar_url?.image_url || ""
                      }
                      isError={!!errors?.[field.name]?.message}
                      getImage={(img) => {
                        onChange(img.attachment_id)
                        setImage(img.attachment_url)
                      }}
                    />
                  </div>
                )}
                rules={{ required: true }}
              />
            ) : null}

            {field.type === "textarea" ? (
              <textarea
                {...register(field.name, {
                  required: true,
                })}
                id={field.name}
                placeholder={field.placeholder}
                className={`form-item-input ${
                  errors?.[field.name] ? "form-item-input-error" : ""
                }`}
                name={field.name}
                rows={8}
                defaultValue={
                  defaultValues?.description ? defaultValues.description : ""
                }
              ></textarea>
            ) : null}

            {field.type === "text" ? (
              <input
                className={`form-item-input ${
                  errors?.[field.name] ? "form-item-input-error" : ""
                }`}
                id={field.name}
                type="text"
                defaultValue={defaultValues?.partner_name}
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
                      defaultValues?.gender
                        ? defaultValues.gender === "male"
                          ? { label: "Nam", value: "male" }
                          : { label: "Nữ", value: "female" }
                        : undefined
                    }
                    className={`${
                      errors?.[field.name] ? "form-item-select-error" : ""
                    }`}
                    placeholder={field.placeholder}
                    options={field.options}
                    onChange={(val) => val?.value && onChange(val.value)}
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
                    defaultValue={defaultValues?.date_of_birth}
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
