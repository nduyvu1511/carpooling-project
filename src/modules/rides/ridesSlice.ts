import {
    RideModalSearch,
    RidesSlice
} from "@/models"
import { createSlice } from "@reduxjs/toolkit"

const initialState: RidesSlice = {
  modal: {
    isOpenSearchModal: undefined,
    type: undefined,
  },
}

const commonSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    setOpenRidesModalSearch: (
      state,
      { payload }: { payload: RideModalSearch }
    ) => {
      state.modal = payload
    },
  },
})

export default commonSlice.reducer
export const { setOpenRidesModalSearch } = commonSlice.actions
