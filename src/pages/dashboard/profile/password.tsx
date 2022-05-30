import { PasswordForm } from "@/components"
import { MainNoFooter } from "@/layout"
import React from "react"
import { useSpring, animated } from "react-spring"

const Password = () => {
  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <animated.section style={animation} className="password-page">
      <div className="page-heading">Đổi mật khẩu</div>

      <div className="content-container password-page-form">
        <PasswordForm
          onSubmit={(data) => console.log(data)}
          type="changePassword"
        />
      </div>
    </animated.section>
  )
}

Password.Layout = MainNoFooter
export default Password
