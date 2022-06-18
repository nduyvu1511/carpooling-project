import {
  FromLocation,
  LocationHistory,
  LocationHistorySlice,
  LocationSearchHistory,
} from "@/models"
import { createSlice } from "@reduxjs/toolkit"

const initialState: LocationHistorySlice = {
  history: [],
  searchHistory: [],
}

const locationSlice = createSlice({
  name: "location_history",
  initialState,
  reducers: {
    addLocationSearchHistory: (
      state,
      { payload }: { payload: LocationSearchHistory }
    ) => {
      if (state.searchHistory?.some((item) => item.id === payload.id)) {
        const newSearchHistory = [...state.searchHistory].filter(
          (item) => item.id !== payload.id
        )
        state.searchHistory = [payload, ...newSearchHistory]
        return
      }

      if (state.searchHistory?.length < 10) {
        state.searchHistory.unshift(payload)
      } else {
        state.searchHistory.pop()
        state.searchHistory.unshift(payload)
      }
    },

    addLocationHistory: (state, { payload }: { payload: LocationHistory }) => {
      if (state.history?.length < 5) {
        state.history.unshift(payload)
      } else {
        state.history.pop()
        state.history.unshift(payload)
      }
    },
  },
})

export default locationSlice.reducer
export const { addLocationHistory, addLocationSearchHistory } =
  locationSlice.actions
