import { userFormSchema } from "@/core/schema"
import { genderList, userFormFields } from "@/helper"
import { UserInfoFormParams } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"

export const UserForm = () => {
  const {
    handleSubmit,
    formState: { dirtyFields, errors, isValid },
    getValues,
    register,
    control,
  } = useForm<UserInfoFormParams>({
    resolver: yupResolver(userFormSchema),
    mode: "all",
  })

  const onSubmitHandler = (data: UserInfoFormParams) => {}

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {userFormFields.map((field) => {
        return (
          <div key={field.name} className="form-item">
            <div className="form-item-wrapper">
              <label htmlFor={field.name} className="form-item-label">
                {field.placeholder}{" "}
                {field?.isRequired ? (
                  <span className="form-label-warning">(Bắt buộc)</span>
                ) : (
                  <span className="form-label-sm">(Không bắt buộc)</span>
                )}
              </label>

              {field.type === "select" ? (
                <Controller
                  control={control}
                  name={field.name}
                  render={({ field: { onChange, onBlur } }) => (
                    <Select
                      className={`${
                        errors?.[field.name] ? "form-item-select-error" : ""
                      }`}
                      placeholder={field.placeholder}
                      options={genderList}
                      onChange={(val) => onChange(val?.value || "")}
                      onBlur={onBlur}
                      // defaultInputValue={license?.[field.name]}
                    />
                  )}
                  rules={{ required: true }}
                />
              ) : null}

              {field.type === "date" ? (
                <Controller
                  control={control}
                  name={field.name}
                  render={({
                    field: { onChange, onBlur },
                    formState: { dirtyFields },
                  }) => (
                    <input
                      className={`form-item-input ${
                        errors[field.name] ? "form-item-input-error" : ""
                      }`}
                      id={field.name}
                      name={field.name}
                      type="date"
                      onBlur={onBlur}
                      placeholder={field.placeholder}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                  rules={{ required: true }}
                />
              ) : null}

              {field.type === "textarea" ? (
                <Controller
                  control={control}
                  name={field.name}
                  render={({
                    field: { onChange, onBlur },
                    formState: { dirtyFields },
                  }) => (
                    <textarea
                      className={`form-textarea form-item-input ${
                        errors[field.name] ? "form-item-input-error" : ""
                      }`}
                      name={field.name}
                      id={field.name}
                      cols={10}
                      onBlur={onBlur}
                      placeholder={field.placeholder}
                      onChange={(e) => onChange(e.target.value)}
                    ></textarea>
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
                  // defaultValue={license?.[field.name]}
                />
              ) : null}

              {errors?.[field.name] || dirtyFields?.[field.name] ? (
                <p className="form-item-input-text-error">
                  {errors?.[field.name]?.message}
                </p>
              ) : null}
            </div>
          </div>
        )
      })}

      <div className="form-item">
        <button
          style={{ margin: "0 auto" }}
          className={`btn-primary ${isValid ? "" : "btn-disabled"}`}
          type="submit"
        >
          Lưu
        </button>
      </div>
    </form>
  )
}
