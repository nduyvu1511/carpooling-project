import { OTP } from "@/components"
import { AuthContainer } from "@/container"
import { MainNoFooter } from "@/layout"
import { setVerifiedRegisterOTP } from "@/modules"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAuth, useToken } from "shared/hook"

const Register = () => {
  const { token } = useToken()
  const dispatch = useDispatch()
  const router = useRouter()
  const { loginWithPhoneNumber } = useAuth()

  const handleRegister = (firebaseToken: string) => {
    loginWithPhoneNumber({
      firebaseToken,
      onSuccess: (token) => {
        dispatch(setVerifiedRegisterOTP(token))
        router.push("/register/type")
      },
    })
  }

  useEffect(() => {
    if (token) router.push("/")
  }, [token, router])

  return (
    <AuthContainer type="register">
      <div className="register-container">
        <div className="register-container__inner px-24">
          <OTP
            type="register"
            heading="Đăng ký bằng SĐT"
            onVerifyOTP={(token) => {
              handleRegister(token)
            }}
          />
          <div className="register-login-link">
            Bạn đã có tài khoản?{" "}
            <Link href="/login">
              <a>Đăng nhập</a>
            </Link>
          </div>
        </div>
      </div>
    </AuthContainer>
  )
}

Register.Layout = MainNoFooter
export default Register
