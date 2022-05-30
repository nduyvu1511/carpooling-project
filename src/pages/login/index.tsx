import { LoginForm } from "@/components"
import { AuthContainer } from "@/container"
import { MainNoFooter } from "@/layout"

const Login = () => {
  return (
    <AuthContainer heading="Đăng nhập" type="login">
      <div className="px-24">
        <LoginForm />
      </div>
    </AuthContainer>
  )
}

Login.Layout = MainNoFooter
export default Login
