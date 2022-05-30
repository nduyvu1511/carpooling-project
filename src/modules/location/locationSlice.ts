import { LocationSlice, PayloadBoolean } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

const initialState: LocationSlice = {
  isOpenModal: false,
  currentLocation: undefined,
  isOpenMapModal: false,
}

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setOpenLocation: (state, { payload }: PayloadBoolean) => {
      state.isOpenModal = payload
    },

    setOpenMapModal: (state, { payload }: PayloadBoolean) => {
      state.isOpenMapModal = payload
    },
  },
})

export default locationSlice.reducer
export const { setOpenLocation, setOpenMapModal } = locationSlice.actions
