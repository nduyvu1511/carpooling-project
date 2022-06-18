import { getFromSessionStorage } from "@/helper"
import { RidesKeyType } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

export interface RidesSlice {
  compounding_car_id: number | undefined
}

let initialState: RidesSlice = {
  compounding_car_id: undefined,
}

try {
  Object.keys(initialState).forEach((item) => {
    initialState[item as RidesKeyType] = getFromSessionStorage(item)
  })
} catch (error) {
  console.log(error)
}

const commonSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    setCompoundingCarId: (
      state,
      { payload }: { payload: number | undefined }
    ) => {
      state.compounding_car_id = payload
    },
  },
})

export default commonSlice.reducer
export const { setCompoundingCarId } = commonSlice.actions
