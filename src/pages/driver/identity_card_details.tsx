import { ImageSingleFile, ItemSelect } from "@/components"
import { DriverContainer } from "@/container"
import { identityCardSchema } from "@/core/schema"
import { idCardFormFields, provinces } from "@/helper"
import { IdCardForm } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import moment from "moment"
import { useRouter } from "next/router"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"

const IdentityCardDetail = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    control,
  } = useForm<IdCardForm>({
    resolver: yupResolver(identityCardSchema),
    mode: "all",
  })

  const onSubmitHandler = (data: any) => {
    console.log(data)
    router.back()
  }

  return (
    <DriverContainer
      onAction={handleSubmit(onSubmitHandler)}
      btnLabel="Lưu"
      heading="CMND / Thẻ Căn Cước / Hộ Chiếu"
    >
      <div className="content-container px-24">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {idCardFormFields.map((field) => {
            if (field.type === "file") {
              return (
                <div className="form-item">
                  <label className="driver-bio__form-label">
                    {field.placeHolder}{" "}
                    <span className="form-label-warning">(Bắt buộc)</span>
                  </label>

                  <Controller
                    control={control}
                    name={field.name}
                    render={({ field: { onChange } }) => (
                      <div className="driver-bio__form-input">
                        <ImageSingleFile
                          isError={!!errors?.[field.name]?.message}
                          getBase64Image={(img) => {
                            onChange(img)
                          }}
                        />
                      </div>
                    )}
                    rules={{ required: true }}
                  />

                  {errors?.[field.name] || dirtyFields?.[field.name] ? (
                    <p className="form-item-input-text-error">
                      {errors?.[field.name]?.message}
                    </p>
                  ) : null}
                </div>
              )
            }
            if (field.type === "date") {
              return (
                <div className="form-item">
                  <div className="form-item-wrapper">
                    <label className="form-item-label" htmlFor={field.name}>
                      {field.placeHolder}{" "}
                      <span className="form-label-warning">(Bắt buộc)</span>
                    </label>

                    <Controller
                      control={control}
                      name={field.name}
                      render={({
                        field: { onChange, onBlur },
                        formState: { dirtyFields },
                      }) => (
                        <input
                          className={`form-item-input ${
                            errors[field.name] || dirtyFields?.[field.name]
                              ? "form-item-input-error"
                              : ""
                          }`}
                          id={field.name}
                          type="date"
                          onBlur={onBlur}
                          placeholder={field.placeHolder}
                          onChange={(e) =>
                            onChange(
                              moment(e.target.value).format("DD/MM/YYYY")
                            )
                          }
                        />
                      )}
                      rules={{ required: true }}
                    />

                    {errors?.[field.name] || dirtyFields?.[field.name] ? (
                      <p className="form-item-input-text-error">
                        {errors?.[field.name]?.message}
                      </p>
                    ) : null}
                  </div>
                </div>
              )
            }

            if (field.type === "select") {
              return (
                <div className="form-item">
                  <div className="form-item-wrapper">
                    <label className="form-item-label" htmlFor="sex">
                      {field.placeHolder}{" "}
                      <span className="form-label-warning">(Bắt buộc)</span>
                    </label>

                    <Controller
                      control={control}
                      name={field.name}
                      render={({ field: { onChange, onBlur } }) => (
                        <Select
                          className={`${
                            errors[field.name] ? "form-item-select-error" : ""
                          }`}
                          placeholder={field.placeHolder}
                          options={provinces}
                          onChange={(val) => onChange(val?.value || "")}
                          onBlur={onBlur}
                        />
                      )}
                      rules={{ required: true }}
                    />

                    {errors?.[field.name] || dirtyFields?.[field.name] ? (
                      <p className="form-item-input-text-error">
                        {errors?.[field.name]?.message}
                      </p>
                    ) : null}
                  </div>
                </div>
              )
            }

            return (
              <div key={field.name} className="form-item">
                <div className="form-item-wrapper">
                  <label className="form-item-label" htmlFor="name">
                    Họ tên{" "}
                    <span className="form-label-warning">(Bắt buộc)</span>
                  </label>

                  <input
                    className={`form-item-input ${
                      errors[field.name] ? "form-item-input-error" : ""
                    }`}
                    id={field.name}
                    type="text"
                    placeholder={field.placeHolder}
                    {...register(field.name, {
                      required: true,
                    })}
                  />

                  {errors?.[field.name] || dirtyFields?.[field.name] ? (
                    <p className="form-item-input-text-error">
                      {errors[field.name]?.message}
                    </p>
                  ) : null}
                </div>
              </div>
            )
          })}
        </form>
      </div>
    </DriverContainer>
  )
}

export default IdentityCardDetail
