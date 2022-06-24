import { authentication, fbProvider, googleProvider } from "@/core"
import { RootState } from "@/core/store"
import { isObjectHasValue } from "@/helper"
import { LoginForm, LoginRes, UserInfo } from "@/models"
import { setScreenLoading } from "@/modules"
import { userApi } from "@/services"
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"

interface otpProps {
  otpInput: string
  handleSuccess: (token: string) => void
  handleError?: Function
}

interface LoginWithPhoneNumberProps {
  firebaseToken: string
  onSuccess: (token: string) => void
  onError?: Function
}

interface UseAuthRes {
  token: string
  loginWithFacebook: (
    handleSuccess: (token: string) => void,
    handleError?: Function
  ) => void
  loginWithGoogle: (handleSuccess: (token: string) => void) => void
  loginWithPhoneNumber: (props: LoginWithPhoneNumberProps) => void
  getUserInfo: (
    token: string,
    handleSuccess: (props: UserInfo) => void,
    handleError?: Function
  ) => void
  loginWithPassword: (
    loginForm: LoginForm,
    handleSuccess: (params: LoginRes) => void
  ) => void
  OTPVerifier: (props: otpProps) => void
  checkPhoneExist: (
    phone: string,
    type: "login" | "register" | "resetPassword",
    onSuccess: Function,
    onErr?: Function
  ) => void
}

export const useAuth = (): UseAuthRes => {
  const { token } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const loginWithFacebook = async (
    handleSuccess: (token: string) => void,
    handleError?: Function
  ) => {
    try {
      const result: any = await signInWithPopup(authentication, fbProvider)
      const credential: any = FacebookAuthProvider.credentialFromResult(result)
      const facebook_access_token = credential.accessToken
      dispatch(setScreenLoading(true))

      const res: any = await userApi.firebaseAuth({
        type: "facebook",
        facebook_access_token,
      })
      dispatch(setScreenLoading(false))

      const token = res?.result?.data?.token
      if (res?.result?.success) {
        // dispatch(setCurrentToken(token))
        handleSuccess(token)
      } else {
        handleError && handleError()
        dispatch(
          notify({
            type: "danger",
            title: res?.result?.message || "",
          })
        )
      }
    } catch (error: any) {
      handleError && handleError()
      console.log("error: ", error.message)
      dispatch(setScreenLoading(false))
    }
  }

  const loginWithGoogle = async (handleSuccess: (token: string) => void) => {
    try {
      const response: any = await signInWithPopup(
        authentication,
        googleProvider
      )
      const credential = GoogleAuthProvider.credentialFromResult(response)
      const firebase_access_token = credential?.idToken
      if (!googleProvider || !firebase_access_token || !response?.user) return
      dispatch(setScreenLoading(true))

      const res: any = await userApi.firebaseAuth({
        type: "data_google",
        data_in_token: response.user,
        firebase_access_token,
      })

      dispatch(setScreenLoading(false))
      const token = res?.result?.data?.token

      if (res?.result?.success) {
        // dispatch(setCurrentToken(token))
        handleSuccess(token)
      } else {
        dispatch(
          notify({
            type: "danger",
            title: res?.result?.message || "",
          })
        )
      }
    } catch (error) {
      console.log(error)
      dispatch(setScreenLoading(false))
    }
  }

  const OTPVerifier = async (props: otpProps) => {
    const { otpInput, handleSuccess, handleError } = props
    const confirmationResult = window.confirmationResult
    dispatch(setScreenLoading(true))

    try {
      const responseToken = await confirmationResult.confirm(otpInput)
      const firebaseToken = responseToken?._tokenResponse?.idToken
      dispatch(setScreenLoading(false))

      if (firebaseToken) {
        handleSuccess(firebaseToken)
      } else {
        handleError && handleError()
        dispatch(notify("Vui lòng nhập đúng mã OTP", "error"))
      }
    } catch (error) {
      dispatch(setScreenLoading(false))
      dispatch(
        notify("Vui lòng nhập đúng mã OTP", "error", {
          position: "top-center",
        })
      )
    }
  }

  // const updatePhoneNumber = async (props: otpProps) => {
  //   const { handleSuccess, handleError, otpInput } = props
  //   dispatch(setScreenLoading(true))

  //   try {
  //     OTPVerifier({
  //       otpInput,
  //       handleSuccess: async (firebase_access_token) => {
  //         if (!currentToken || !firebase_access_token || !phoneNumber) {
  //           dispatch(
  //             notify({
  //               title: "thiếu field cho update phone number ",
  //               type: "warning",
  //             })
  //           )
  //           return
  //         }

  //         try {
  //           const res: any = await userApi.updatePhoneNumber({
  //             firebase_access_token,
  //             phone: phoneNumber,
  //             token: currentToken,
  //           })
  //           dispatch(setScreenLoading(false))

  //           if (res?.result?.success) {
  //             handleSuccess("")
  //           } else {
  //             const message = res?.result?.message
  //             dispatch(
  //               notify({
  //                 title: message || "Số điện thoại đã tồn tại",
  //                 type: "warning",
  //               })
  //             )
  //             if (message === "Tài khoản chưa được kích hoạt!") {
  //               // dispatch(setOpenOtpLoginModal(false))
  //             } else {
  //               handleError && handleError()
  //             }
  //           }
  //         } catch (error) {
  //           handleError && handleError()
  //         }
  //       },
  //       handleError: () => {
  //         dispatch(setScreenLoading(false))
  //       },
  //     })
  //   } catch (error) {
  //     dispatch(setScreenLoading(false))
  //   }
  // }

  const loginWithPhoneNumber = async (props: LoginWithPhoneNumberProps) => {
    const { onSuccess, firebaseToken, onError } = props
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.firebaseAuth({
        firebase_access_token: firebaseToken,
      })

      dispatch(setScreenLoading(false))

      const token = res?.result?.data?.token
      if (res?.result?.success) {
        token && onSuccess(token)
      } else {
        onError && onError()
      }
    } catch (error) {
      onError && onError()
      console.log(error)
      dispatch(setScreenLoading(false))
    }
  }

  const loginWithPassword = async (
    loginForm: LoginForm,
    handleSuccess: (params: LoginRes) => void
  ) => {
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.login(loginForm)
      dispatch(setScreenLoading(false))
      if (res?.result?.success) {
        handleSuccess(res.result.data)
      } else {
        dispatch(
          notify(res?.result?.message || "Đăng nhập không thành công", "error")
        )
      }
    } catch (error) {
      dispatch(setScreenLoading(false))
    }
  }

  const checkPhoneExist = async (
    phone: string,
    type: "login" | "register" | "resetPassword",
    onSuccess: Function,
    onErr?: Function
  ) => {
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.checkPhoneExist(phone)
      dispatch(setScreenLoading(false))

      const hasPw = res?.result?.success

      if (hasPw !== true && hasPw !== false) {
        return
      }

      if (type === "register") {
        if (hasPw && res?.result?.data?.car_account_type) {
          onErr && onErr()
          return
        }

        onSuccess && onSuccess()
      } else {
        hasPw ? onSuccess() : onErr && onErr()
      }
    } catch (error) {
      dispatch(setScreenLoading(false))
    }
  }

  const getUserInfo = async (
    token: string,
    handleSuccess: (props: UserInfo) => void,
    handleError?: Function
  ) => {
    if (!token) return

    try {
      const res: any = await userApi.getUserInfo(token)
      if (res?.result?.success) {
        if (isObjectHasValue(res?.result?.data)) {
          handleSuccess(res.result.data)
        }
      } else {
        handleError && handleError()
      }
    } catch (error) {
      console.log(error)
      handleError && handleError()
    }
  }

  return {
    token,
    loginWithFacebook,
    loginWithGoogle,
    getUserInfo,
    loginWithPhoneNumber,
    loginWithPassword,
    OTPVerifier,
    checkPhoneExist,
  }
}
