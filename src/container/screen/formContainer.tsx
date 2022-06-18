import { useRouter } from "next/router"
import { ReactNode } from "react"

interface DriverContainerProps {
  children: ReactNode
  onAction?: Function
  btnLabel?: string
  isBtnDisabled?: boolean
  onBackBtnClick?: Function
  skipBtnLabel?: string
  onSkipBtnClick?: Function
  showFooter?: boolean
}

export const FormContainer = ({
  children,
  onAction,
  btnLabel,
  isBtnDisabled = false,
  skipBtnLabel,
  onSkipBtnClick,
  showFooter = true,
}: DriverContainerProps) => {
  const router = useRouter()

  return (
    <div className="form__container">
      <div className="form__container-body">{children}</div>
      {showFooter ? (
        <div className="form__container-footer">
          <div className="content-container form__container-footer-inner">
            {skipBtnLabel ? (
              <button
                onClick={() => onSkipBtnClick && onSkipBtnClick()}
                className={`btn-primary form__container-footer-skip-btn`}
              >
                {skipBtnLabel}
              </button>
            ) : null}

            {showFooter ? (
              <button
                onClick={() => onAction && onAction()}
                className={`btn-primary form__container-footer-btn ${
                  isBtnDisabled ? "btn-not-allowed" : ""
                }`}
              >
                {btnLabel}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
