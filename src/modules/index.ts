import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "./auth/authSlice"
import messageSlice from "./chat/messageSlice"
import channelSlice from "./chat/channelSlice"
import commonSlice from "./common/commonSlice"
import searchSlice from "./search/searchSlice"
import userSlice from "./user/userSlice"
import chatModalSlice from "./chat/modalSlice"
import ridesSlice from "./rides/ridesSlice"
import { reducer as notificationsReducer } from "reapop"
import locationSlice from "./location/locationSlice"

const rootReducer = combineReducers({
  common: commonSlice,
  user: userSlice,
  auth: authSlice,
  search: searchSlice,
  channel: channelSlice,
  message: messageSlice,
  chatModal: chatModalSlice,
  rides: ridesSlice,
  notifications: notificationsReducer(),
  location: locationSlice,
})

export default rootReducer

export * from "./auth/authSlice"
export * from "./common/commonSlice"
export * from "./search/searchSlice"
export * from "./user/userSlice"
export * from "./chat"
export * from "./location/locationSlice"
