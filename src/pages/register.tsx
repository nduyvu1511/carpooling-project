import { hidePasswordIcon, showPasswordIcon } from "@/assets"
import { InputCheckbox } from "@/components"
import { AuthContainer } from "@/container"
import { MainNoFooter } from "@/layout"
import { Field, Form, Formik } from "formik"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { loginSchema } from "../core"
import { notify } from "reapop"

const REMEMBER_PASSWORD = "is_remember_password"
const FORM_LOGIN = "form_login"

const Register = () => {
  const dispatch = useDispatch()

  return (
    <AuthContainer type="register">
      <button
        onClick={() => dispatch(notify("Welcome to the documentation", "info"))}
      >
        Show
      </button>
      <div className="">So this is register</div>
    </AuthContainer>
  )
}

Register.Layout = MainNoFooter
export default Register
