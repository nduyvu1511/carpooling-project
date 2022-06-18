import { OTP } from "@/components"
import { AuthContainer } from "@/container"
import { MainNoFooter } from "@/layout"
import { setToken, setUserInfo } from "@/modules"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { useAuth } from "shared/hook"

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loginWithPhoneNumber, getUserInfo } = useAuth()

  const handleLogin = (token: string) => {
    loginWithPhoneNumber({
      firebaseToken: token,
      onSuccess: (token) => {
        dispatch(setToken(token))
        getUserInfo(token, (userInfo) => {
          dispatch(setUserInfo(userInfo))
          router.push("/")
        })
      },
    })
  }

  return (
    <AuthContainer type="otp">
      <div className="px-24">
        <OTP
          type="login"
          heading="Đăng nhập bằng SĐT"
          onVerifyOTP={(token) => {
            handleLogin(token)
          }}
        />
      </div>
    </AuthContainer>
  )
}

Login.Layout = MainNoFooter
export default Login
