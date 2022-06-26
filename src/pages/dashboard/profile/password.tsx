import { ChangePasswordForm, CreatePasswordForm } from "@/components"
import { RideContainer } from "@/container"
import { MainNoFooter } from "@/layout"
import { useRouter } from "next/router"
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
    isValidating,
  } = usePassword(true)

  if (isValidating) return null

  return (
    <RideContainer heading={hasPassword ? "Đổi mật khẩu" : "Tạo mới mật khẩu"}>
      <animated.section style={animation} className="password-page">
        <div className="content-container password-page-form">
          {hasPassword ? (
            <ChangePasswordForm
              onSubmit={(data) =>
                changePassword({
                  ...data,
                  handleSuccess: () => {
                    router.push("/dashboard/profile")
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
                    router.push("/dashboard/profile")
                  },
                })
              }
            />
          )}
        </div>
      </animated.section>
    </RideContainer>
  )
}

export default Password
