import {
  CAR_ACCOUNT_TYPE_KEY, getFromSessionStorage,
  setToSessionStorage,
  VERIFY_REGISTER_OTP_KEY
} from "@/helper"
import { CarAccountType, UserInfo } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface AuthSlice {
  phoneNumber: string | undefined
  currentUserInfo: UserInfo | undefined
  isValidateCreatePasswordOTP: boolean | undefined
  carAccountType: CarAccountType | undefined
  verifiedRegisterToken: string | undefined
}

let initialState: AuthSlice = {
  phoneNumber: undefined,
  currentUserInfo: undefined,
  isValidateCreatePasswordOTP: undefined,
  carAccountType: undefined,
  verifiedRegisterToken: undefined,
}

try {
  initialState.carAccountType = getFromSessionStorage(CAR_ACCOUNT_TYPE_KEY)
  initialState.verifiedRegisterToken = getFromSessionStorage(
    VERIFY_REGISTER_OTP_KEY
  )
} catch (error) {
  console.log(error)
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPhoneNumber: (state, { payload }: { payload: string | undefined }) => {
      state.phoneNumber = payload
    },

    setCurrentUserInfo: (
      state,
      { payload }: { payload: UserInfo | undefined }
    ) => {
      state.currentUserInfo = payload
    },

    clearRegisterData: (state) => {
      state.verifiedRegisterToken = undefined
      state.carAccountType = undefined
      setToSessionStorage(CAR_ACCOUNT_TYPE_KEY, undefined)
      setToSessionStorage(VERIFY_REGISTER_OTP_KEY, undefined)
    },

    setValidateCreatePasswordOTP: (
      state,
      { payload }: { payload: boolean | undefined }
    ) => {
      state.isValidateCreatePasswordOTP = payload
    },

    setCarAccountType: (
      state,
      { payload }: { payload: CarAccountType | undefined }
    ) => {
      state.carAccountType = payload
      setToSessionStorage(CAR_ACCOUNT_TYPE_KEY, payload)
    },

    setVerifiedRegisterOTP: (
      state,
      { payload }: { payload: string | undefined }
    ) => {
      state.verifiedRegisterToken = payload
      setToSessionStorage(VERIFY_REGISTER_OTP_KEY, payload)
    },
  },
})

export const {
  clearRegisterData,
  setPhoneNumber,
  setCurrentUserInfo,
  setValidateCreatePasswordOTP,
  setCarAccountType,
  setVerifiedRegisterOTP,
} = authSlice.actions

export default authSlice.reducer
