import { arrowIcon2 } from "@/assets"
import { OtpForm, PhoneForm } from "@/components"
import { authentication } from "@/core/config"
import { setScreenLoading } from "@/modules"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useAuth } from "shared/hook"

declare global {
  interface Window {
    recaptchaVerifier: any
    confirmationResult: any
  }
}

interface LoginOtpProps {
  onVeifyOTP: Function
  heading?: string
}

export const OTP = ({ onVeifyOTP, heading }: LoginOtpProps) => {
  const dispatch = useDispatch()
  const { OTPVerifier } = useAuth()
  const [expandForm, setExpandForm] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>("")

  const generateRecaptcha = () => {
    return new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      authentication
    )
  }

  // Generate OTP input
  const generateOtpCode = async (phoneNumber: string) => {
    if (!phoneNumber) return
    dispatch(setScreenLoading(true))
    const verify = generateRecaptcha()

    try {
      const confirmationResult = await signInWithPhoneNumber(
        authentication,
        `+84${phoneNumber.slice(1)}`,
        verify
      )
      dispatch(setScreenLoading(false))
      setPhone(phoneNumber)
      window.confirmationResult = confirmationResult

      setExpandForm(true)
    } catch (error) {
      dispatch(setScreenLoading(false))
      generateRecaptcha()
    }
  }

  // Validate OTP
  const handleVerifyOTP = async (otpInput: string) => {
    OTPVerifier({
      otpInput,
      handleSuccess: () => {
        onVeifyOTP()
      },
    })
  }

  return (
    <>
      {heading ? (
        <div className="resetPassword__page-header">
          {expandForm ? (
            <button
              onClick={() => {
                setExpandForm(false)
              }}
              className="btn-reset"
            >
              {arrowIcon2()}
            </button>
          ) : null}
          <h1 className="page-heading">
            {expandForm ? "Lấy mã xác thực" : heading}
          </h1>
        </div>
      ) : null}

      {!expandForm ? (
        <PhoneForm onSubmit={(phone) => generateOtpCode(phone)} />
      ) : (
        <div className="otp__form">
          <OtpForm
            reGenerateRecaptcha={() => generateOtpCode(phone || "")}
            phoneNumber={phone || ""}
            onSubmit={(val) => handleVerifyOTP(val)}
          />
        </div>
      )}

      <div id="recaptcha-container"></div>
    </>
  )
}
