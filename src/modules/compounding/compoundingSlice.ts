import { getFromSessionStorage, setToSessionStorage } from "@/helper"
import { CompoundingType } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface CompoundingSlice {
  currentTwoWayCompoundingCarCustomer: number | undefined
  currentOneWayCompoundingCarCustomer: number | undefined
  currentCarpoolingCompoundingCarCustomer: number | undefined
}

let initialState: CompoundingSlice = {
  currentCarpoolingCompoundingCarCustomer: undefined,
  currentOneWayCompoundingCarCustomer: undefined,
  currentTwoWayCompoundingCarCustomer: undefined,
}

try {
  initialState.currentCarpoolingCompoundingCarCustomer = getFromSessionStorage(
    "currentCarpoolingCompoundingCarCustomer"
  )
  initialState.currentOneWayCompoundingCarCustomer = getFromSessionStorage(
    "currentOneWayCompoundingCarCustomer"
  )
  initialState.currentTwoWayCompoundingCarCustomer = getFromSessionStorage(
    "currentTwoWayCompoundingCarCustomer"
  )
} catch (error) {
  console.log(error)
}

const locationSlice = createSlice({
  name: "compounding",
  initialState,
  reducers: {
    setCurrentCompoundingCarCustomer: (
      state,
      {
        payload,
      }: { payload: { key: CompoundingType; value: number | undefined } }
    ) => {
      const { key, value } = payload
      if (key === "compounding") {
        state.currentCarpoolingCompoundingCarCustomer = value
        setToSessionStorage("currentCarpoolingCompoundingCarCustomer", value)
        return
      }
      if (key === "one_way") {
        state.currentOneWayCompoundingCarCustomer = value
        setToSessionStorage("currentOneWayCompoundingCarCustomer", value)
        return
      }
      if (key === "two_way") {
        state.currentTwoWayCompoundingCarCustomer = value
        setToSessionStorage("currentTwoWayCompoundingCarCustomer", value)
        return
      }
    },
  },
})

export default locationSlice.reducer
export const { setCurrentCompoundingCarCustomer } = locationSlice.actions
