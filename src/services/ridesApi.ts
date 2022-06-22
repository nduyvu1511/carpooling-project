import {
  ConfirmCompoundingCar,
  ConfirmTransactionParams,
  CreateCarpoolCompounding,
  CreateCompoundinCarDriver,
  CreateCompoundingCarCustomerParams,
  CreateCompoundingParams,
  CreatePaymentDriverParams,
  CreatePaymentParams,
  GetCarpoolingListParams,
  GetCompoundingListWithoutADriverParams,
  GetDetailCompounding,
  GetDetailCompoundingCustomer,
  RidesDraftParams,
  UpdateCompoundingCar,
  UpdateCompoundingCarCustomer,
  UpdateCompoundingCarDriver,
} from "@/models"
import axiosClient from "."

const ridesApi = {
  getCarpoolingCompoundingList: (params: GetCarpoolingListParams) => {
    return axiosClient.post(
      "/compounding_car_controller/get_compounding_car_by_compounding",
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
    params: GetDetailCompoundingCustomer
  ) => {
    return axiosClient.post(
      "/compounding_car_controller/create_compounding_car_customer",
      {
        params,
      }
    )
  },

  confirmCreateCompoundingCar: (params: UpdateCompoundingCarCustomer) => {
    return axiosClient.post(
      "/compounding_car_controller/confirm_compounding_car",
      {
        params,
      }
    )
  },

  confirmCarpoolingCompoundingCarCustomer: (
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

  createExistedCarpoolingCompoundingCar: (params: CreateCarpoolCompounding) => {
    return axiosClient.post(
      "/compounding_car_controller/create_compounding_car_customer",
      {
        params,
      }
    )
  },

  getPendingCompoundingCar: (params: RidesDraftParams) => {
    return axiosClient.post(
      "/compounding_car_controller/get_pending_compounding_car",
      {
        params,
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

  getHistoryCompoundingCarCustomer: (token: string) => {
    return axiosClient.post(
      "/compounding_car_controller/get_history_compounding_car_customer",
      {
        params: {
          token,
        },
      }
    )
  },

  getHistoryCompoundingCarDrive: (token: string) => {
    return axiosClient.post(
      "/compounding_car_controller/get_history_compounding_car_driver",
      {
        params: {
          token,
        },
      }
    )
  },

  confirmDepositCompoundingCarCustomer: (
    params: GetDetailCompoundingCustomer
  ) => {
    return axiosClient.post(
      "/compounding_car_controller/deposit_compounding_car_customer",
      {
        params,
      }
    )
  },

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

  getPaymentMethods: (token: string) => {
    return axiosClient.post("/payment_controller/get_payment_method_in_app", {
      params: {
        token,
      },
    })
  },

  createPayment: (params: CreatePaymentParams) => {
    return axiosClient.post(
      "/vpnay_for_compounding_car_app_controller/create_payment",
      {
        params,
      }
    )
  },

  confirmTransaction: (params: ConfirmTransactionParams) => {
    return axiosClient.post("/payment/vnpay/confirm_transaction", {
      params,
    })
  },

  getCompoundingListWithoutADriver: (
    params: GetCompoundingListWithoutADriverParams
  ) => {
    return axiosClient.post(
      "/compounding_car_controller/get_compounding_car_by_no_driver",
      {
        params,
      }
    )
  },

  getDepositCompoundingCarDriver: (params: GetDetailCompounding) => {
    return axiosClient.post(
      "/compounding_car_controller/get_deposit_compounding_car_driver",
      {
        params,
      }
    )
  },

  createPaymentForDriver: (params: CreatePaymentDriverParams) => {
    return axiosClient.post(
      "/vpnay_for_compounding_car_app_controller/create_payment_for_car_driver",
      {
        params,
      }
    )
  },

  confirmDepositForDriver: (params: GetDetailCompounding) => {
    return axiosClient.post(
      "/compounding_car_controller/confirm_deposit_compounding_car_driver",
      {
        params,
      }
    )
  },

  cancelDepositForDriver: (params: GetDetailCompounding) => {
    return axiosClient.post(
      "/compounding_car_controller/cancel_deposit_compounding_car_driver",
      {
        params,
      }
    )
  },

  getPendingDepositCompoundingList: (token: string) => {
    return axiosClient.post(
      "/compounding_car_controller/get_pending_deposit_compounding_car_driver",
      {
        params: {
          token,
        },
      }
    )
  },

  createCompoundingCarForDriver: (params: CreateCompoundinCarDriver) => {
    return axiosClient.post(
      "/compounding_car_for_driver_controller/create_compounding_car",
      {
        params,
      }
    )
  },

  confirmCompoundingCarForDriver: (params: GetDetailCompounding) => {
    return axiosClient.post(
      "/compounding_car_for_driver_controller/confirm_compounding_car",
      {
        params,
      }
    )
  },

  updateCompoundingCarForDriver: (params: UpdateCompoundingCarDriver) => {
    return axiosClient.post(
      "/compounding_car_for_driver_controller/update_compounding_car",
      {
        params,
      }
    )
  },
}

export { ridesApi }
