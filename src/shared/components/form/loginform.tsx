import { hidePasswordIcon, showPasswordIcon } from "@/assets"
import { loginSchema } from "@/core/schema"
import {
  FORM_LOGIN_KEY,
  getFromLocalStorage,
  REMEMBER_PASSWORD_KEY,
  setToLocalStorage,
} from "@/helper"
import { LoginForm as LoginFormModel } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { RiLoader4Line } from "react-icons/ri"
import { InputCheckbox } from "../inputs"

interface LoginFormProps {
  onSubmit?: (data: LoginFormModel) => void
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const formStorage = getFromLocalStorage(FORM_LOGIN_KEY)
  const rememberStorage = getFromLocalStorage(REMEMBER_PASSWORD_KEY)

  const [showPw, setShowPw] = useState<boolean>(false)
  const [remember, setRemember] = useState<boolean>(rememberStorage === "true")

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    control,
    getValues,
  } = useForm<LoginFormModel>({
    resolver: yupResolver(loginSchema),
    mode: "all",
    defaultValues: {
      phone: formStorage?.phone || "",
      password: formStorage?.password || "",
    },
  })

  useEffect(() => {
    ;(document.querySelector(".form-item-input") as HTMLInputElement)?.focus()
  }, [])

  const onSubmitHandler = (data: LoginFormModel) => {
    const { password, phone } = data
    onSubmit && onSubmit(data)
    if (remember) {
      setToLocalStorage(FORM_LOGIN_KEY, { phone, password })
    } else {
      localStorage.removeItem(FORM_LOGIN_KEY)
    }
  }

  const toggleRememberPassword = () => {
    if (remember) {
      setToLocalStorage(REMEMBER_PASSWORD_KEY, "false")
      setRemember(false)
    } else {
      setToLocalStorage(REMEMBER_PASSWORD_KEY, "true")
      setRemember(true)
    }
  }

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="form-item">
        <label htmlFor={"phone"} className="form-item-label">
          Số điện thoại <span className="form-label-warning">(Bắt buộc)</span>
        </label>

        <input
          className={`form-item-input ${
            errors?.["phone"] ? "form-item-input-error" : ""
          }`}
          id={"phone"}
          type="text"
          placeholder="Số điện thoại"
          {...register("phone", {
            required: true,
          })}
        />
        {errors.phone || dirtyFields.phone ? (
          <p className="form-item-input-text-error">{errors.phone?.message}</p>
        ) : null}
      </div>

      <div className="form-item">
        <label htmlFor={"password"} className="form-item-label">
          Mật Khẩu <span className="form-label-warning">(Bắt buộc)</span>
        </label>
        <div className="form-item-inner">
          <div className="form-item-wrapper">
            <input
              className={`form-item-input ${
                errors?.["password"] ? "form-item-input-error" : ""
              }`}
              id={"password"}
              type={showPw ? "text" : "password"}
              placeholder="Số điện thoại"
              {...register("password", {
                required: true,
              })}
            />
            <span
              onClick={() => setShowPw(!showPw)}
              className="form-item-toggle-pw-btn cursor-pointer"
            >
              {showPw ? hidePasswordIcon() : showPasswordIcon()}
            </span>
          </div>
          {errors.password || dirtyFields.password ? (
            <p className="form-item-input-text-error">
              {errors.password?.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="form-item-action">
        <div className="form-control-remember">
          <label onClick={toggleRememberPassword} htmlFor="remember-user">
            Nhớ tài khoản
          </label>
          <InputCheckbox
            isChecked={remember}
            onCheck={toggleRememberPassword}
            type="circle"
          />
        </div>

        <div className="form-control-forgot-pw">
          <Link href="/reset-password?page=/login">
            <a>Quên mật khẩu?</a>
          </Link>
        </div>
      </div>

      <div className="form-item-question">
        Bạn chưa có tài khoản?{" "}
        <Link href="/register">
          <a className="form-item-question-link">Đăng ký</a>
        </Link>
      </div>

      <button
        type="submit"
        className={`btn-primary ${!isValid ? "btn-disabled" : ""}`}
      >
        Xác nhận
      </button>
    </form>
  )
}
