import { combineReducers } from "@reduxjs/toolkit"
import { reducer as notificationsReducer } from "reapop"
import authSlice from "./auth/authSlice"
import channelSlice from "./chat/channelSlice"
import messageSlice from "./chat/messageSlice"
import chatModalSlice from "./chat/modalSlice"
import commonSlice from "./common/commonSlice"
import locationHistorySLice from "./location/locationHistorySlice"
import locationSlice from "./location/locationSlice"
import ridesFormSlice from "./rides/ridesFormSlice"
import ridesSlice from "./rides/ridesSlice"
import userSlice from "./user/userSlice"

const rootReducer = combineReducers({
  common: commonSlice,
  user: userSlice,
  auth: authSlice,
  channel: channelSlice,
  message: messageSlice,
  chatModal: chatModalSlice,
  notifications: notificationsReducer(),
  location: locationSlice,
  locationHistory: locationHistorySLice,
  ridesForm: ridesFormSlice,
  rides: ridesSlice,
})

export default rootReducer

export * from "./auth/authSlice"
export * from "./chat"
export * from "./common/commonSlice"
export * from "./location/locationHistorySlice"
export * from "./location/locationSlice"
export * from "./rides/ridesFormSlice"
export * from "./rides/ridesSlice"
export * from "./user/userSlice"
