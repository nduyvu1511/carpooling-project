import { OTP } from "@/components"
import { MainNoFooter } from "@/layout"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

const ResetPassword = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    ;(document.querySelector(".form-item-input") as HTMLInputElement).focus()
  }, [])

  return (
    <div className="updatePhone__page">
      <div className="content-container px-24">
        <OTP
          heading="Cập nhật SĐT"
          onVerifyOTP={() => {
            dispatch(notify("Xác thực thành công", "success"))
          }}
        />
      </div>
    </div>
  )
}

ResetPassword.Layout = MainNoFooter
export default ResetPassword
