import { hidePasswordIcon, showPasswordIcon } from "@/assets"
import { createPasswordSchema } from "@/core/schema"
import { createNewPasswordFormFields } from "@/helper"
import { CreatePasswordFormParams } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface ForgotPasswordProps {
  onSubmit: (props: CreatePasswordFormParams) => void
}

export const CreatePasswordForm = ({ onSubmit }: ForgotPasswordProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
  } = useForm<CreatePasswordFormParams>({
    resolver: yupResolver(createPasswordSchema),
    mode: "all",
  })

  const [inputs, setInputs] = useState<string[]>([])

  useEffect(() => {
    ;(document.querySelector(".form-item-input") as HTMLInputElement).focus()
  }, [])

  const handleToggleInputType = (name: string) => {
    if (inputs.includes(name)) {
      setInputs([...inputs].filter((item) => item !== name))
    } else {
      setInputs([...inputs, name])
    }
  }

  const onSubmitHandler = (data: CreatePasswordFormParams) => {
    onSubmit(data)
    console.log(data)
  }

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      {createNewPasswordFormFields.map((field) => (
        <div key={field.name} className="form-item">
          <label htmlFor={field.name} className="form-item-label">
            {field.label} <span className="form-label-warning">(Bắt buộc)</span>
          </label>

          <div className="form-item-wrapper">
            <input
              className={`form-item-input ${
                errors?.[field.name] ? "form-item-input-error" : ""
              }`}
              {...register(field.name, {
                required: true,
              })}
              id={field.name}
              type={inputs.includes(field.name) ? "text" : "password"}
              name={field.name}
              placeholder={field.label}
            />

            <span
              onClick={() => handleToggleInputType(field.name)}
              className="form-item-toggle-pw-btn cursor-pointer"
            >
              {inputs?.includes(field.name)
                ? hidePasswordIcon()
                : showPasswordIcon()}
            </span>
          </div>

          {errors?.[field.name] || dirtyFields?.[field.name] ? (
            <p className="form-item-input-text-error">
              {errors?.[field.name]?.message}
            </p>
          ) : null}
        </div>
      ))}

      <button
        type="submit"
        className={`btn-primary ${isValid ? "" : "btn-disabled"}`}
      >
        Xác nhận
      </button>
    </form>
  )
}
