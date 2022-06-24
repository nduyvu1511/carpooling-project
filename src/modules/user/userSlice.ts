import { UserInfo } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface UserSlice {
  token: string
  userInfo: UserInfo | undefined
  fcmToken: string
}

const initialState: UserSlice = {
  token: "",
  userInfo: {} as UserInfo,
  fcmToken: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, { payload }: { payload: string }) => {
      state.token = payload
    },

    setUserInfo: (state, { payload }: { payload: UserInfo | undefined }) => {
      state.userInfo = payload
    },
  },
})

export const { setToken, setUserInfo } = userSlice.actions

export default userSlice.reducer
