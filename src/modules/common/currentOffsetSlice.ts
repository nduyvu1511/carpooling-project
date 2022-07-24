import { createSlice } from "@reduxjs/toolkit"

interface CurrentOffsetSlice {
  currentcompoundingCustomerListOffset: number | undefined
  currentCompoundingDriverListOffset: number | undefined
}

const initialState: CurrentOffsetSlice = {
  currentcompoundingCustomerListOffset: undefined,
  currentCompoundingDriverListOffset: undefined,
}

const currentOffsetSlice = createSlice({
  name: "current_offset",
  initialState,
  reducers: {
    setCurrentCompoundingCustomerListOffset: (
      state,
      { payload }: { payload: number | undefined }
    ) => {
      state.currentcompoundingCustomerListOffset = payload
    },
    setCurrentcurrentCompoundingDriverListOffset: (
      state,
      { payload }: { payload: number | undefined }
    ) => {
      state.currentCompoundingDriverListOffset = payload
    },
  },
})

export default currentOffsetSlice.reducer
export const {
  setCurrentCompoundingCustomerListOffset,
  setCurrentcurrentCompoundingDriverListOffset,
} = currentOffsetSlice.actions
