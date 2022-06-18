import React, { useEffect, useState } from "react"
import OtpInput from "react-otp-input"

interface PhoneFormProps {
  phoneNumber: string
  onSubmit: (otpCode: string) => void
  reGenerateRecaptcha: Function
}

const RESEND_OTP_TIMEOUT = 60

export const OtpForm = ({
  phoneNumber,
  onSubmit,
  reGenerateRecaptcha,
}: PhoneFormProps) => {
  const [otpVal, setOtpVal] = useState<string>("")
  const [secondsExpire, setSecondsExprire] =
    useState<number>(RESEND_OTP_TIMEOUT)

  useEffect(() => {
    if (secondsExpire === 0) return
    const interval = setInterval(() => {
      setSecondsExprire(secondsExpire - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [secondsExpire])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (otpVal?.length < 6) return
        onSubmit && onSubmit(otpVal)
      }}
      className="form-control"
    >
      <div className="form-control-otp">
        <label className="form-control-otp-label" htmlFor="otpInput">
          Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến <b>{phoneNumber}</b>
        </label>

        <div className="form-control-otp-input">
          <OtpInput
            shouldAutoFocus
            value={otpVal}
            onChange={(otp: string) => setOtpVal(otp)}
            numInputs={6}
            isInputNum
          />
        </div>
      </div>

      <div className="otp__resend">
        {secondsExpire === 0 ? (
          <>
            <p className="otp__resend-title">Bạn không nhận được mã?</p>
            <span
              className="otp__resend-btn"
              onClick={() => {
                setSecondsExprire(RESEND_OTP_TIMEOUT)
                reGenerateRecaptcha && reGenerateRecaptcha()
              }}
            >
              Gửi lại
            </span>
          </>
        ) : (
          <p className="otp__resend-countdown">
            Vui lòng chờ {secondsExpire} giây để gửi lại
          </p>
        )}
      </div>

      <button
        type="submit"
        className={`btn-primary otp-btn-login ${
          otpVal.length === 6 ? "" : "btn-disabled"
        }`}
      >
        Xác nhận
      </button>
    </form>
  )
}
