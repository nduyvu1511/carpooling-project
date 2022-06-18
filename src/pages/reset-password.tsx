import { CreatePasswordForm, OTP } from "@/components"
import { MainNoFooter } from "@/layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { usePassword } from "shared/hook"

const ResetPassword = () => {
  const router = useRouter()
  const { resetPassword, createPassword } = usePassword()
  const [firebaseToken, setFirebaseToken] = useState<string>()

  useEffect(() => {
    ;(document.querySelector(".form-item-input") as HTMLInputElement).focus()
  }, [])

  const handleResetPassword = (params: {
    password: string
    re_password: string
  }) => {
    if (!firebaseToken) return

    const page = router.query?.page

    if (page === "/login") {
      resetPassword({
        params: { ...params, firebase_access_token: firebaseToken },
        onSuccess: () => {
          router.push("/login")
        },
      })
    } else {
      createPassword({
        ...params,
        handleSuccess: () => {
          if (!page) {
            router.push("/")
          } else {
            router.push(page as string)
          }
        },
      })
    }
  }

  return (
    <div className="reset__password">
      <div className="content-container px-24">
        {!firebaseToken ? (
          <OTP
            type="resetPassword"
            heading="Vui lòng nhập SĐT để lấy lại mật khẩu"
            onVerifyOTP={(token) => {
              setFirebaseToken(token)
            }}
          />
        ) : (
          <div className="">
            <h1 className="page-heading">Tạo mới mật khẩu</h1>
            <CreatePasswordForm
              onSubmit={(params) => handleResetPassword(params)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

ResetPassword.Layout = MainNoFooter
export default ResetPassword
