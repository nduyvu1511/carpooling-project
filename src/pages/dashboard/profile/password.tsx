import { ChangePasswordForm, CreatePasswordForm } from "@/components"
import { MainNoFooter } from "@/layout"
import { useRouter } from "next/router"
import React from "react"
import { useDispatch } from "react-redux"
import { animated, useSpring } from "react-spring"
import { usePassword } from "shared/hook"

const Password = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  const {
    data: hasPassword,
    createPassword,
    changePassword,
  } = usePassword(true)

  return (
    <animated.section style={animation} className="password-page">
      <div className="page-heading">
        {hasPassword ? "Đổi mật khẩu" : "Tạo mới mật khẩu"}
      </div>

      <div className="content-container password-page-form">
        {hasPassword ? (
          <ChangePasswordForm
            onSubmit={(data) =>
              changePassword({
                ...data,
                handleSuccess: () => {
                  router.push("/dashboard/profile/account")
                },
              })
            }
          />
        ) : (
          <CreatePasswordForm
            onSubmit={(data) =>
              createPassword({
                ...data,
                handleSuccess: () => {
                  router.push("/dashboard/profile/account")
                },
              })
            }
          />
        )}
      </div>
    </animated.section>
  )
}

Password.Layout = MainNoFooter
export default Password
