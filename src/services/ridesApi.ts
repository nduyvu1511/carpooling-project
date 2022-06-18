import {
  ConfirmCompoundingCar,
  CreateCompoundingCarCustomerParams,
  CreateCompoundingParams,
  CreateExistedCarpoolingCompoundingCar,
  GetCompoundingCarParams,
  GetDetailCompounding,
  GetDetailCompoundingCustomer,
  UpdateCompoundingCar,
  UpdateCompoundingCarCustomer,
} from "@/models"
import axiosClient from "."

const ridesApi = {
  getCarpoolTrips: (params: GetCompoundingCarParams) => {
    return axiosClient.post(
      "/compounding_car_controller/get_compounding_compounding_car",
      {
        params,
      }
    )
  },

  createCompoundingCar: (
    params: CreateCompoundingParams & { token: string }
  ) => {
    return axiosClient.post(
      "/compounding_car_controller/create_compounding_car",
      {
        params,
      }
    )
  },

  createCompoundingCarCustomer: (
    params: CreateCompoundingCarCustomerParams
  ) => {
    return axiosClient.post(
      "/compounding_car_controller/create_compounding_car",
      {
        params,
      }
    )
  },

  confirmCreateCompoundingCar: (params: GetCompoundingCarParams) => {
    return axiosClient.post(
      "/compounding_car_controller/confirm_compounding_car",
      {
        params,
      }
    )
  },

  confirmCreateCarpoolingCompoundingCar: (
    params: GetDetailCompoundingCustomer
  ) => {
    return axiosClient.post(
      "/compounding_car_controller/confirm_compounding_car_customer",
      {
        params,
      }
    )
  },

  getDetailCompoundingCar: (params: GetDetailCompounding) => {
    return axiosClient.post(
      "/compounding_car_controller/get_detail_compounding_car",
      {
        params,
      }
    )
  },

  getDetailCompoundingCarCustomer: (params: UpdateCompoundingCarCustomer) => {
    return axiosClient.post(
      "/compounding_car_controller/get_detail_compounding_car_customer",
      {
        params,
      }
    )
  },

  createExistedCarpoolingCompoundingCar: (
    params: CreateExistedCarpoolingCompoundingCar
  ) => {
    return axiosClient.post(
      "/compounding_car_controller/create_compounding_car_customer",
      {
        params,
      }
    )
  },

  getPendingCompoundingCar: (token: string) => {
    return axiosClient.post(
      "/compounding_car_controller/get_pending_compounding_car",
      {
        params: { token },
      }
    )
  },

  confirmCompoundingCar: (params: ConfirmCompoundingCar) => {
    return axiosClient.post(
      "/compounding_car_controller/confirm_compounding_car",
      {
        params,
      }
    )
  },

  updateCompoundingCar: (params: UpdateCompoundingCar) => {
    return axiosClient.post(
      "/compounding_car_controller/update_compounding_car",
      {
        params,
      }
    )
  },

  getHistoryCompounding: (token: string) => {
    return axiosClient.post(
      "/compounding_car_controller/get_history_compounding_car_customer",
      {
        params: {
          token,
        },
      }
    )
  },

  getCustomerCompoundingList: (token: string) => {
    return axiosClient.post(
      "/compounding_car_controller/get_compounding_car_by_compounding",
      {
        params: {
          token,
        },
      }
    )
  },

  getDepositCompoundingCarCustomer: (params: GetDetailCompoundingCustomer) => {
    return axiosClient.post(
      "/compounding_car_controller/deposit_compounding_car_customer",
      {
        params,
      }
    )
  },

  // getCheckoutListCompoundingCarCustomer: (
  //   params: GetDetailCompoundingCustomer
  // ) => {
  //   return axiosClient.post(
  //     "/compounding_car_controller/payment_compounding_car_customer",
  //     {
  //       params,
  //     }
  //   )
  // },

  confirmPaidForCompoundingCarCustomer: (
    params: GetDetailCompoundingCustomer
  ) => {
    return axiosClient.post(
      "/compounding_car_controller/confirm_cash_payment_compounding_car_customer",
      {
        params,
      }
    )
  },
}

export { ridesApi }
