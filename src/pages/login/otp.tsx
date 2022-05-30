import { OTP } from "@/components"
import { AuthContainer } from "@/container"
import { MainNoFooter } from "@/layout"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

const Login = () => {
  const dispatch = useDispatch()

  return (
    <AuthContainer type="otp">
      <div className="px-24">
        <OTP
          heading="Đăng nhập bằng SĐT"
          onVeifyOTP={() => {
            dispatch(notify("Xác thực thành công", "success"))
          }}
        />
      </div>
    </AuthContainer>
  )
}

Login.Layout = MainNoFooter
export default Login
