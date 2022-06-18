import { PayloadBoolean } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

export interface LocationSlice {
  currentLocation: any
  isOpenMapModal: boolean
}

const initialState: LocationSlice = {
  currentLocation: undefined,
  isOpenMapModal: false,
}

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setOpenMapModal: (state, { payload }: PayloadBoolean) => {
      state.isOpenMapModal = payload
    },
  },
})

export default locationSlice.reducer
export const { setOpenMapModal } = locationSlice.actions
