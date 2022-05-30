import { CommonSlice, PayloadBoolean } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

const initialState: CommonSlice = {
  isOpenSearchModal: undefined,
  isScreenLoading: false,
  isOpenPromotionModal: false,
}

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setOpenSearchModal: (state, { payload }: PayloadBoolean) => {
      state.isOpenSearchModal = payload
    },

    setScreenLoading: (state, { payload }: PayloadBoolean) => {
      state.isScreenLoading = payload
    },

    setOpenPromotionModal: (state, { payload }: PayloadBoolean) => {
      state.isOpenPromotionModal = payload
    },
  },
})

export default commonSlice.reducer
export const { setOpenSearchModal, setScreenLoading, setOpenPromotionModal } =
  commonSlice.actions
