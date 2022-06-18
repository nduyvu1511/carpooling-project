import { PHONE_SCHEMA } from "@/helper"
import { setCurrentUserInfo, setToken, setUserInfo } from "@/modules"
import { useRouter } from "next/router"
import { BsFacebook } from "react-icons/bs"
import { FaPhoneAlt } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { useDispatch } from "react-redux"
import { useAuth } from "shared/hook"

interface IAuthLayout {
  children: React.ReactNode
  type: "register" | "login" | "otp"
  heading?: string
}

export const AuthContainer = ({ children, type, heading }: IAuthLayout) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loginWithGoogle, loginWithFacebook, getUserInfo } = useAuth()

  const handleUpdatePhoneNumber = async (token: string) => {
    getUserInfo(token, (userInfo) => {
      if (PHONE_SCHEMA.test(userInfo?.phone || "")) {
        dispatch(setToken(token))
        dispatch(setUserInfo(userInfo))
        router.push("/")
      } else {
        dispatch(setCurrentUserInfo(userInfo))
      }
    })
  }

  const handleLoginWithGoogle = async () => {
    try {
      loginWithGoogle((token: string) => {
        handleUpdatePhoneNumber(token)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoginWithFacebook = async () => {
    try {
      loginWithFacebook((token) => {
        handleUpdatePhoneNumber(token)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth__inner content-container">
        {heading ? (
          <h3 className="form-heading page-heading">{heading}</h3>
        ) : null}

        <div className="form-body">
          {children}

          {type === "login" ? (
            <footer className="auth__footer">
              <div className="recaptcha-container"></div>

              <div className="auth__footer-buttons">
                <button
                  onClick={() => router.push("/login/otp")}
                  className="btn-reset auth__footer-buttons-item px-24"
                >
                  <span className="">Tiếp tục với SMS</span>
                  <FaPhoneAlt className="phone-icon" />
                </button>
                {/* <button
                  onClick={handleLoginWithGoogle}
                  className="btn-reset auth__footer-buttons-item px-24"
                >
                  <span className="">Tiếp tục với Google</span>
                  <FcGoogle className="google-icon" />
                </button>
                <button
                  onClick={handleLoginWithFacebook}
                  className="btn-reset auth__footer-buttons-item px-24"
                >
                  <span className="">Tiếp tục với Facebook</span>
                  <BsFacebook className="facebook-icon" />
                </button> */}
              </div>
            </footer>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default AuthContainer
