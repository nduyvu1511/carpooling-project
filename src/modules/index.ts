import { combineReducers } from "@reduxjs/toolkit"
import { reducer as notificationsReducer } from "reapop"
import authSlice from "./auth/authSlice"
import channelSlice from "./chat/channelSlice"
import messageSlice from "./chat/messageSlice"
import chatModalSlice from "./chat/modalSlice"
import commonSlice from "./common/commonSlice"
import compoundingSlice from "./compounding/compoundingSlice"
import locationHistorySlice from "./location/locationHistorySlice"
import userSlice from "./user/userSlice"

const rootReducer = combineReducers({
  common: commonSlice,
  user: userSlice,
  auth: authSlice,
  channel: channelSlice,
  message: messageSlice,
  chatModal: chatModalSlice,
  notifications: notificationsReducer(),
  locationHistory: locationHistorySlice,
  compounding: compoundingSlice,
})

export default rootReducer

export * from "./auth/authSlice"
export * from "./chat"
export * from "./common/commonSlice"
export * from "./compounding/compoundingSlice"
export * from "./location/locationHistorySlice"
export * from "./user/userSlice"

