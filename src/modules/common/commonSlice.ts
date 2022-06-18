import { toggleBodyOverflow } from "@/helper"
import { CommonSlice, LocationType, PayloadBoolean } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

const initialState: CommonSlice = {
  isOpenSearchModal: undefined,
  isScreenLoading: false,
  isOpenPromotionModal: false,
  isOpenAlertModal: false,
  isOpenLocationFormModal: undefined,
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
      try {
        if (payload) {
          toggleBodyOverflow("hidden")
        } else {
          toggleBodyOverflow("unset")
        }
      } catch (error) {
        console.log(error)
      }
    },

    setOpenPromotionModal: (state, { payload }: PayloadBoolean) => {
      state.isOpenPromotionModal = payload
    },

    setOpenAlertModal: (state, { payload }: PayloadBoolean) => {
      state.isOpenAlertModal = payload
    },

    setOpenLocationFormModal: (
      state,
      { payload }: { payload: LocationType | undefined }
    ) => {
      state.isOpenLocationFormModal = payload
    },
  },
})

export default commonSlice.reducer
export const {
  setOpenSearchModal,
  setScreenLoading,
  setOpenPromotionModal,
  setOpenAlertModal,
  setOpenLocationFormModal,
} = commonSlice.actions
