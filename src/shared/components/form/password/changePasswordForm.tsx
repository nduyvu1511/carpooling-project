import { hidePasswordIcon, showPasswordIcon } from "@/assets"
import { changePasswordSchema } from "@/core/schema"
import { changePasswordFormFields } from "@/helper"
import { ChangePasswordFormParams } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface ForgotPasswordProps {
  onSubmit: (props: ChangePasswordFormParams) => void
}

export const ChangePasswordForm = ({ onSubmit }: ForgotPasswordProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
  } = useForm<ChangePasswordFormParams>({
    resolver: yupResolver(changePasswordSchema),
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

  const onSubmitHandler = (data: ChangePasswordFormParams) => {
    onSubmit(data)
  }

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      {changePasswordFormFields.map((field) => (
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
      <div className="form-control-forgot-pw">
        <Link passHref href="/reset-password?page=/dashboard/profile/account">
          <span className="cursor-pointer">Quên mật khẩu?</span>
        </Link>
      </div>

      <button
        type="submit"
        className={`btn-primary ${isValid ? "" : "btn-disabled"}`}
      >
        Xác nhận
      </button>
    </form>
  )
}
