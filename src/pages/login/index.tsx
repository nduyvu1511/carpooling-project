import { LoginForm } from "@/components"
import { AuthContainer } from "@/container"
import { MainNoFooter } from "@/layout"
import { LoginForm as LoginFormModel } from "@/models"
import { setToken, setUserInfo } from "@/modules"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useAuth } from "shared/hook"

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loginWithPassword, getUserInfo, checkPhoneExist } = useAuth()

  const handleLogin = async (loginForm: LoginFormModel) => {
    try {
      checkPhoneExist(
        loginForm.phone,
        "login",
        () => {
          loginWithPassword(loginForm, (data) => {
            dispatch(setToken(data.token))
            getUserInfo(data.token, (userInfo) => {
              dispatch(setUserInfo(userInfo))
              router.push("/")
            })
          })
        },
        () => {
          dispatch(
            notify("Số điện thoại không tồn tại, vui lòng đăng ký", "error")
          )
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContainer heading="Đăng nhập" type="login">
      <div className="px-24">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </AuthContainer>
  )
}

Login.Layout = MainNoFooter
export default Login
