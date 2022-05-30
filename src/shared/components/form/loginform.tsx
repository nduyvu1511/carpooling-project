import { hidePasswordIcon, showPasswordIcon } from "@/assets"
import { loginSchema } from "@/core/schema"
import {
  FORM_LOGIN_KEY,
  getFromLocalStorage,
  REMEMBER_PASSWORD_KEY,
  setToLocalStorage,
} from "@/helper"
import { ILogin } from "@/models"
import { setToken, setUserInfo } from "@/modules"
import { Field, Form, Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useAuth } from "shared/hook"
import { InputCheckbox } from "../inputs"

export const LoginForm = () => {
  const router = useRouter()
  const { loginWithPassword, getUserInfo } = useAuth()
  const dispatch = useDispatch()

  const formStorage = getFromLocalStorage(FORM_LOGIN_KEY)
  const rememberStorage = getFromLocalStorage(REMEMBER_PASSWORD_KEY)

  const [showPw, setShowPw] = useState<boolean>(false)
  const [remember, setRemember] = useState<boolean>(rememberStorage === "true")

  useEffect(() => {
    ;(document.querySelector(".form-item-input") as HTMLInputElement).focus()
  }, [])

  const handleSubmit = ({ password, phone }: ILogin) => {
    dispatch(notify("Đăng nhập thành công", "success"))
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

  const handleLogin = (data: ILogin) => {
    loginWithPassword(data, (token) => {
      dispatch(setToken(token))
      getUserInfo(token, (userInfo) => {
        dispatch(setUserInfo(userInfo))
        router.push("/")
      })
    })
  }

  return (
    <Formik
      initialValues={{
        phone: formStorage?.phone || "",
        password: formStorage?.password || "",
      }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid }) => (
        <Form className="form-control">
          <div className="form-item">
            <div className="form-item-inner">
              <div className="form-item-wrapper">
                <Field
                  className={`form-item-input ${
                    errors["phone"] && touched["phone"]
                      ? "form-item-input-error"
                      : ""
                  }`}
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="Số điện thoại"
                />
              </div>
              {errors["phone"] && touched["phone"] ? (
                <p className="form-item-input-text-error">{errors["phone"]}</p>
              ) : null}
            </div>
          </div>

          <div className="form-item">
            <div className="form-item-inner">
              <div className="form-item-wrapper">
                <Field
                  className={`form-item-input ${
                    errors["password"] && touched["password"]
                      ? "form-item-input-error"
                      : ""
                  }`}
                  id="password"
                  type={showPw ? "text" : "password"}
                  name="password"
                  placeholder="Mật khẩu"
                />

                <span
                  onClick={() => setShowPw(!showPw)}
                  className="form-item-toggle-pw-btn cursor-pointer"
                >
                  {showPw ? hidePasswordIcon() : showPasswordIcon()}
                </span>
              </div>
              {errors["password"] && touched["password"] ? (
                <p className="form-item-input-text-error">
                  {errors["password"]}
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
                type="radio"
              />
            </div>

            <div className="form-control-forgot-pw">
              <Link href="/reset-password">
                <a>Quên mật khẩu?</a>
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className={`btn-primary ${isValid ? "" : "opacity-50"}`}
          >
            Xác nhận
          </button>
        </Form>
      )}
    </Formik>
  )
}
