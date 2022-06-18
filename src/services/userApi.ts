import {
  AttachmentParams,
  Auth,
  CertificateInspectionParams,
  ChangePasswordParams,
  CreateNewPasswordParams,
  CreateUserFormParams,
  DrivingLicenseParams,
  IdCardParams,
  IdCardUpdateParams,
  LoginForm,
  ResetPasswordParams,
  Token,
  UpdateCertificateInspectionParams,
  UpdateDrivingLicenseParams,
  UpdateUserInfoParams,
  UpdateVehicleInsuranceParams,
  VehicleDetailFormParams,
  VehicleInsuranceParams,
} from "@/models"
import axiosClient from "."

const userApi = {
  login: (data: LoginForm) => {
    return axiosClient.post("/user_information_controller/login", {
      params: data,
    })
  },

  checkHasPassword: (params: Token) => {
    return axiosClient.post("user_information_controller/check_has_password", {
      params,
    })
  },

  createNewPassword: (params: CreateNewPasswordParams) => {
    return axiosClient.post("user_information_controller/create_new_password", {
      params,
    })
  },

  changePassword: (data: ChangePasswordParams) => {
    return axiosClient.post("/user_information_controller/change-password", {
      params: data,
    })
  },

  resetPassword: (data: ResetPasswordParams) => {
    return axiosClient.post("/user_information_controller/reset-password", {
      params: data,
    })
  },

  confirmDriverRole: (data: ResetPasswordParams) => {
    return axiosClient.post(
      "/user_information_controller/update_user_information",
      { params: data }
    )
  },

  checkPhoneExist: (phone: string) => {
    return axiosClient.post("/user_information_controller/check_user_account", {
      params: {
        phone,
      },
    })
  },

  firebaseAuth: (params: Auth) => {
    return axiosClient.post("/user_information_controller/auth", {
      params,
    })
  },

  updateUserInfo: (params: UpdateUserInfoParams) => {
    return axiosClient.post(
      "/user_information_controller/update_user_information",
      { params }
    )
  },

  createUserInfo: (params: CreateUserFormParams) => {
    return axiosClient.post(
      "/user_information_controller/create_user_information",
      { params }
    )
  },

  createAttachmentCommon: (params: AttachmentParams) => {
    return axiosClient.post(
      "/user_information_controller/create_attachment_data",
      {
        params,
      }
    )
  },

  createAttachmentAvatar: (params: AttachmentParams) => {
    return axiosClient.post("/detail_data_controller/create_attachment_data", {
      params,
    })
  },

  getUserInfo: (token: string) => {
    return axiosClient.post(
      "/user_information_controller/get_user_information",
      {
        params: {
          token,
        },
      }
    )
  },

  createIdentityCard: (params: IdCardParams) => {
    return axiosClient.post(
      "/user_information_controller/create_identity_card",
      {
        params,
      }
    )
  },

  updateIdentityCard: (params: IdCardUpdateParams) => {
    return axiosClient.post(
      "/user_information_controller/update_identity_card",
      {
        params,
      }
    )
  },

  getIdentityCard: (token: string) => {
    return axiosClient.post("/user_information_controller/get_identity_card", {
      params: {
        token,
      },
    })
  },

  createDrivingLicense: (params: DrivingLicenseParams) => {
    return axiosClient.post(
      "/user_information_controller/create_car_driving_license",
      {
        params,
      }
    )
  },

  updateDrivingLicense: (params: UpdateDrivingLicenseParams) => {
    return axiosClient.post(
      "/user_information_controller/update_car_driving_license",
      {
        params,
      }
    )
  },

  getDrivingLicense: (token: string) => {
    return axiosClient.post(
      "/user_information_controller/get_car_driving_license",
      {
        params: {
          token,
        },
      }
    )
  },

  createCertificateRegistrationVehicle: (params: VehicleDetailFormParams) => {
    return axiosClient.post(
      "/user_information_controller/create_car_registration_certificate",
      {
        params,
      }
    )
  },

  updateCertificateRegistrationVehicle: (params: VehicleDetailFormParams) => {
    return axiosClient.post(
      "/user_information_controller/update_car_registration_certificate",
      {
        params,
      }
    )
  },

  getCertificateRegistrationVehicle: (token: string) => {
    return axiosClient.post(
      "/user_information_controller/get_car_registration_certificate",
      {
        params: {
          token,
        },
      }
    )
  },

  createVehicleInsurance: (params: VehicleInsuranceParams) => {
    return axiosClient.post(
      "/user_information_controller/create_compulsory_car_insurance",
      {
        params,
      }
    )
  },

  updateVehicleInsurance: (params: UpdateVehicleInsuranceParams) => {
    return axiosClient.post(
      "/user_information_controller/update_compulsory_car_insurance",
      {
        params,
      }
    )
  },

  getVehicleInsurance: (token: string) => {
    return axiosClient.post(
      "/user_information_controller/get_compulsory_car_insurance",
      {
        params: {
          token,
        },
      }
    )
  },

  createCertificateInspection: (params: CertificateInspectionParams) => {
    return axiosClient.post(
      "/user_information_controller/create_periodical_inspection_certificate",
      {
        params,
      }
    )
  },

  updateCertificateInspection: (params: UpdateCertificateInspectionParams) => {
    return axiosClient.post(
      "/user_information_controller/update_periodical_inspection_certificate",
      {
        params,
      }
    )
  },

  getCertificateInspection: (token: string) => {
    return axiosClient.post(
      "/user_information_controller/get_periodical_inspection_certificate",
      {
        params: {
          token,
        },
      }
    )
  },

  getFilledDataFields: (token: string) => {
    return axiosClient.post(
      "/user_information_controller/get_general_user_information",
      {
        params: {
          token,
        },
      }
    )
  },
}

export { userApi }
