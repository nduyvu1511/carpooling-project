import {
  DriverBioForm,
  DriverFormSlice,
  DriverLicenseForm,
  IdCardForm,
  VehicleRegistrationForm,
} from "@/models"
import { createSlice } from "@reduxjs/toolkit"

const initialState: DriverFormSlice = {
  idCard: undefined,
  info: undefined,
  license: undefined,
  vehicleImages: undefined,
  vehicleInsuranceImages: undefined,
  vehicleRegistration: undefined,
}

const driverFormSlice = createSlice({
  name: "driver_form",
  initialState,
  reducers: {
    setIdCard: (state, { payload }: { payload: IdCardForm | undefined }) => {
      state.idCard = payload
    },

    setDriverInfo: (
      state,
      { payload }: { payload: DriverBioForm | undefined }
    ) => {
      state.info = payload
    },

    setVehicleImages: (
      state,
      { payload }: { payload: string[] | undefined }
    ) => {
      state.vehicleImages = payload
    },

    setLicense: (
      state,
      { payload }: { payload: DriverLicenseForm | undefined }
    ) => {
      state.license = payload
    },

    setVehicleRegistration: (
      state,
      { payload }: { payload: VehicleRegistrationForm | undefined }
    ) => {
      state.vehicleRegistration = payload
    },

    setVehicleInsuranceImages: (
      state,
      { payload }: { payload: string[] | undefined }
    ) => {
      state.vehicleInsuranceImages = payload
    },
  },
})

export default driverFormSlice.reducer
export const {
  setDriverInfo,
  setIdCard,
  setLicense,
  setVehicleImages,
  setVehicleInsuranceImages,
  setVehicleRegistration,
} = driverFormSlice.actions
