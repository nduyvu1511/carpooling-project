import {
  chatIcon,
  closeFillIcon,
  dbIcon,
  thunderIcon,
  trustUserIcon,
  userCircleIcon,
} from "@/assets"
import {
  CertificateInspectionFormKey,
  CompoundingCarCustomerState,
  CompoundingCarDriverState,
  CompoundingOrderField,
  CompoundingType,
  DepartureFormKey,
  DriverFormKey,
  DrivingLicenseClassType,
  DrivingLicenseFormKey,
  DrivingLicenseKeyType,
  FilledDataFieldsKey,
  HourWaitTimeType,
  IdCardKeyType,
  IdCardName,
  NewPasswordFormKeys,
  OptionModel,
  RidesFormFieldKey,
  UserInfoFormKey,
  VehicleDetailFormKey,
  VehicleInsuranceFormKey,
} from "@/models"
import { ReactNode } from "react"
import { BiMerge } from "react-icons/bi"
import { CgArrowRight, CgArrowsExchange } from "react-icons/cg"
import { FiSearch } from "react-icons/fi"
import {
  HiCalculator,
  HiCalendar,
  HiOutlineClipboardList,
  HiOutlineLocationMarker,
  HiOutlineTrash,
  HiStar,
} from "react-icons/hi"
import { MdLockOutline, MdOutlineDateRange, MdPayment, MdPendingActions } from "react-icons/md"
import { RiCarWashingLine, RiCouponLine } from "react-icons/ri"

export const notifications = [{}]

interface PasswordFormDataProps {
  label: string
  name: "password" | "newPassword" | "reNewPassword"
}

export const passwordFormData: PasswordFormDataProps[] = [
  {
    label: "Mật khẩu cũ",
    name: "password",
  },
  {
    label: "Mật khẩu mới",
    name: "newPassword",
  },
  {
    label: "Xác nhận mật khẩu",
    name: "reNewPassword",
  },
]

export const navLinks = [
  {
    name: "Một Chiều",
    path: "/one-way",
  },
  {
    name: "Hai Chiều",
    path: "/two-way",
  },
  {
    name: "Đi Ghép",
    path: "/Carpool",
  },
]

export const headerUserOptions = [
  // { icon: quotesIcon(24), name: "Chuyến đi của bạn", path: "/rides" },
  { icon: chatIcon(24), name: "Tin nhắn", path: "/chat" },
  {
    icon: userCircleIcon(24),
    name: "Thông tin cá nhân",
    path: "/dashboard/profile",
  },
  {
    icon: dbIcon(24),
    name: "Hoạt động",
    path: "/activities",
  },

  {
    icon: closeFillIcon(24),
    name: "Đăng xuất",
  },
]

export const quotes = [
  {
    icon: dbIcon(),
    title: "Lựa chọn của bạn với mức giá thấp",
    desc: "Cho dù bạn đang đi đâu, Bằng xe buýt hay đi chung xe, hãy tìm một chuyến đi hoàn hảo từ nhiều điểm đến và tuyến đường của chúng tôi với mức giá thấp.",
  },
  {
    icon: trustUserIcon(),
    title: "Tin tưởng người bạn đi cùng",
    desc: "Chúng tôi dành thời gian để tìm hiểu từng thành viên và các đối tác xe buýt của chúng tôi. Chúng tôi kiểm tra các bài đánh giá, hồ sơ và ID để bạn biết mình đang đi cùng ai và có thể đặt chuyến đi của bạn một cách thoải mái trên nền tảng an toàn của chúng tôi.",
  },
  {
    icon: thunderIcon(),
    title: "Cuộn, nhấp, nhấn và đi!",
    desc: "Đặt một chuyến đi chưa bao giờ dễ dàng hơn thế! Nhờ ứng dụng đơn giản được hỗ trợ bởi công nghệ tuyệt vời của chúng tôi, bạn có thể đặt một chuyến đi gần mình chỉ trong vài phút.",
  },
]

export const headerNavs: {
  label: string
  path: string
  icon: ReactNode
}[] = [
  {
    label: "Một Chiều",
    icon: <CgArrowRight />,
    path: "/offer-seats?compounding_type=one_way",
  },
  {
    label: "Hai Chiều",
    icon: <CgArrowsExchange />,
    path: "/offer-seats?compounding_type=two_way",
  },
  {
    label: "Đi Ghép",
    icon: <BiMerge />,
    path: "/offer-seats?compounding_type=compounding",
  },
  // {
  //   label: "Tìm kiếm",
  //   icon: <FiSearch />,
  //   path: "/search",
  // },
]

export const userFormFields: {
  name: UserInfoFormKey
  label: string
  placeholder: string
  type: "text" | "date" | "select" | "textarea"
  isRequired: boolean
}[] = [
  {
    name: "name",
    label: "Họ tên",
    placeholder: "Họ tên",
    type: "text",
    isRequired: true,
  },
  {
    name: "avatar_attachment_id",
    label: "Ảnh đại diện",
    placeholder: "Ảnh đại diện",
    type: "text",
    isRequired: true,
  },
  {
    name: "gender",
    label: "Giới tính",
    placeholder: "Giới tính",
    type: "select",
    isRequired: true,
  },
  {
    name: "date_of_birth",
    label: "Ngày sinh",
    placeholder: "DD/MM/YYYY",
    type: "date",
    isRequired: true,
  },
  {
    name: "description",
    label: "Giới thiệu",
    placeholder: "Giới thiệu",
    type: "textarea",
    isRequired: false,
  },
]

export const drivingClassList: {
  label: string
  value: DrivingLicenseClassType
}[] = [
  {
    label: "Bằng B1",
    value: "b1",
  },

  {
    label: "Bằng B2",
    value: "b2",
  },

  {
    label: "Bằng C",
    value: "c",
  },

  {
    label: "Bằng D",
    value: "d",
  },

  {
    label: "Bằng E",
    value: "e",
  },
  {
    label: "Bằng F",
    value: "f",
  },
]

export const models = [
  { label: "Hyundai", value: "Hyundai" },
  { label: "Ford", value: "Ford" },
  { label: "Toyota", value: "Toyota" },
  { label: "Suzuki", value: "Suzuki" },
  { label: "Isuzu", value: "Isuzu" },
  { label: "KIA", value: "KIA" },
  { label: "Mercedes Benz", value: "Mercedes Benz" },
]

export const ratings = [
  { label: "5 sao", value: 5 },
  { label: "4 sao", value: 4 },
  { label: "3 sao", value: 3 },
]

export const idCardFormFields: {
  name: IdCardName
  type: IdCardKeyType
  placeholder: string
  isRequired: boolean
}[] = [
  {
    name: "front_identity_card_image_url",
    type: "file",
    placeholder: "Mặt Trước",
    isRequired: true,
  },
  {
    name: "back_identity_card_image_url",
    type: "file",
    placeholder: "Mặt Sau",
    isRequired: true,
  },
  {
    name: "identity_number",
    type: "text",
    placeholder: "Số CMND / Thẻ Căn Cước / Hộ Chiếu",
    isRequired: true,
  },
  {
    name: "date_of_issue",
    type: "date",
    placeholder: "Ngày Cấp",
    isRequired: true,
  },
  {
    name: "date_of_expiry",
    type: "date",
    placeholder: "Ngày Hết Hạn",
    isRequired: true,
  },
  {
    name: "place_of_issue",
    type: "select",
    placeholder: "Nơi Cấp",
    isRequired: true,
  },
  {
    name: "province_id",
    type: "select",
    placeholder: "Tỉnh | Địa Chỉ Hiện Tại",
    isRequired: true,
  },
  {
    name: "district_id",
    type: "select",
    placeholder: "Quận/Huyện | Địa Chỉ Hiện Tại",
    isRequired: true,
  },
  {
    name: "ward_id",
    type: "select",
    placeholder: "Xã/Phường | Địa Chỉ Hiện Tại",
    isRequired: true,
  },
  {
    name: "street",
    type: "text",
    placeholder: "Số Nhà/Tổ | Địa Chỉ Hiện Tại",
    isRequired: true,
  },
]

export const driverFormFields: {
  heading: string
  child: {
    route: string
    label: string
    isRequired: boolean
    key: DriverFormKey
    name: FilledDataFieldsKey
  }[]
}[] = [
  {
    heading: "Thông tin cá nhân",

    child: [
      {
        route: "bio_details",
        label: "Họ & Tên",
        isRequired: true,
        key: "info",
        name: "user_information",
      },
      {
        route: "identity_card_details",
        label: "CMND / Thẻ Căn Cước / Hộ Chiếu",
        isRequired: true,
        key: "idCard",
        name: "identity_card",
      },
      {
        route: "driving_license_details",
        label: "Bằng Lái xe",
        isRequired: true,
        key: "license",
        name: "car_driving_license",
      },
    ],
  },

  {
    heading: "Thông tin phương tiện di chuyển ",
    child: [
      {
        route: "vehicle_details",
        label: "Giấy Đăng Ký Xe",
        isRequired: true,
        key: "vehicleRegistration",
        name: "car_registration_certificate",
      },
      {
        route: "registration_certificate",
        label: "Giấy Đăng Kiểm",
        isRequired: true,
        key: "registrationCertificate",
        name: "periodical_inspection_certificate",
      },
      {
        route: "vehicle_insurance",
        label: "Bảo Hiểm Xe Bắt Buộc",
        isRequired: true,
        key: "vehicleInsuranceImages",
        name: "compulsory_car_insurance",
      },
    ],
  },
]

export const drivingLicenseFormFields: {
  name: DrivingLicenseFormKey
  type: DrivingLicenseKeyType
  placeholder: string
  isRequired: boolean
}[] = [
  {
    name: "front_license_image_url",
    type: "file",
    placeholder: "Mặt Trước",
    isRequired: true,
  },
  {
    name: "back_license_image_url",
    type: "file",
    placeholder: "Mặt Sau",
    isRequired: true,
  },
  {
    name: "identity_number",
    type: "text",
    placeholder: "Số Bằng Lái Xe",
    isRequired: true,
  },
  {
    name: "license_class",
    type: "select",
    placeholder: "Hạng Bằng Lái",
    isRequired: true,
  },
  {
    name: "date_of_issue",
    type: "date",
    placeholder: "Ngày Cấp",
    isRequired: true,
  },
  {
    name: "date_of_expiry",
    type: "date",
    placeholder: "Ngày Hết Hạn",
    isRequired: true,
  },
]

export const VehicleImagesForm: {
  name: "frontImage" | "backImage"
  placeholder: string
  isRequired: boolean
}[] = [
  {
    name: "frontImage",
    placeholder: "Hình Đầu Xe",
    isRequired: true,
  },
  {
    name: "backImage",
    placeholder: "Hình Đuôi Xe",
    isRequired: true,
  },
]

export const vehicleInsuranceForm: {
  name: VehicleInsuranceFormKey
  placeholder: string
  isRequired: boolean
  type: "text" | "date" | "file"
}[] = [
  {
    name: "front_insurance_image_url",
    placeholder: "Mặt Trước",
    isRequired: true,
    type: "file",
  },
  {
    name: "back_insurance_image_url",
    placeholder: "Mặt Sau",
    isRequired: true,
    type: "file",
  },
  {
    name: "identity_number",
    placeholder: "Số Bảo Hiểm",
    isRequired: true,
    type: "text",
  },
  {
    name: "date_of_issue",
    placeholder: "Ngày Cấp",
    isRequired: true,
    type: "date",
  },
  {
    name: "date_of_expiry",
    placeholder: "Ngày Hết Hạn",
    isRequired: true,
    type: "date",
  },
]

export const vehicleDetailFormFields: {
  name: VehicleDetailFormKey
  placeholder: string
  type: "file" | "text" | "select" | "date"
  isRequired: boolean
  options?: OptionModel[]
}[] = [
  {
    name: "front_car_image_url",
    placeholder: "Hình Đầu Xe",
    isRequired: true,
    type: "file",
  },
  {
    name: "back_car_image_url",
    placeholder: "Hình Đuôi Xe",
    isRequired: true,
    type: "file",
  },
  {
    name: "car_id",
    placeholder: "Loại Xe",
    isRequired: true,
    type: "select",
  },
  {
    name: "car_brand_id",
    placeholder: "Hãng Xe",
    isRequired: true,
    type: "select",
  },
  {
    name: "car_name",
    placeholder: "Tên Xe",
    isRequired: true,
    type: "text",
  },

  {
    name: "license_plates",
    placeholder: "Biển Số Xe",
    isRequired: true,
    type: "text",
  },

  {
    name: "year_of_issue",
    placeholder: "Năm Sản Xuất Xe",
    isRequired: true,
    type: "text",
  },
]

export const genderList: {
  value: "male" | "female"
  label: string
}[] = [
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
]

export const seats = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
  { label: "13", value: "13" },
  { label: "14", value: "14" },
  { label: "15", value: "15" },
  { label: "16", value: "16" },
]

interface DepartureForm {
  type?: "date" | "select" | "text"
  placeholder: string
  name: DepartureFormKey
  isRequired: boolean
}

export const waitingTimes = [
  {
    label: "30 Phút",
    value: "30 minutes",
  },
  {
    label: "1 Tiếng",
    value: "1 hour",
  },
  {
    label: "1 Tiếng 30 phút",
    value: "1.5 hours",
  },
  {
    label: "2 Tiếng",
    value: "2 hours",
  },

  {
    label: "3 Tiếng",
    value: "3 hours",
  },

  {
    label: "4 Tiếng",
    value: "4 hours",
  },
  {
    label: "5 Tiếng",
    value: "5 hours",
  },
]

export const userInfoFormfields: {
  name: UserInfoFormKey
  placeholder: string
  type: "file" | "text" | "select" | "date" | "textarea"
  isRequired: boolean
}[] = [
  {
    name: "avatar_attachment_id",
    isRequired: true,
    placeholder: "Chọn ảnh đại diện",
    type: "file",
  },
  {
    name: "name",
    isRequired: true,
    placeholder: "Họ Tên",
    type: "text",
  },
  {
    name: "date_of_birth",
    isRequired: true,
    placeholder: "Ngày sinh",
    type: "date",
  },
  {
    name: "gender",
    isRequired: true,
    placeholder: "Giới tính",
    type: "select",
  },
  {
    name: "description",
    isRequired: false,
    placeholder: "Mô tả bản thân",
    type: "textarea",
  },
]

export const createNewPasswordFormFields: {
  name: "password" | "re_password"
  label: string
}[] = [
  { label: "Mật khẩu mới", name: "password" },
  { label: "Xác nhận mật khẩu mới", name: "re_password" },
]

export const changePasswordFormFields: {
  name: NewPasswordFormKeys
  label: string
}[] = [
  { label: "Mật khẩu cũ", name: "old_password" },
  { label: "Mật khẩu mới", name: "password" },
  { label: "Xác nhận mật khẩu mới", name: "re_password" },
]

export const certificatesRegistrationFormFields: {
  type: "text" | "date" | "file"
  name: CertificateInspectionFormKey
  isRequired: boolean
  label: string
}[] = [
  {
    type: "file",
    name: "front_inspection_certificate_image_url",
    isRequired: true,
    label: "Ảnh Mặt Trước",
  },
  {
    type: "file",
    name: "back_inspection_certificate_image_url",
    isRequired: true,
    label: "Ảnh Mặt Sau",
  },
  {
    type: "text",
    name: "identity_number",
    isRequired: true,
    label: "Số Đăng kiểm",
  },
  {
    type: "date",
    name: "date_of_expiry",
    isRequired: true,
    label: "Ngày Hết Hạn",
  },
]

export const dashboardAccounts: {
  name: string
  path: string
  icon: ReactNode
  type: "both" | "customer" | "driver"
}[] = [
  {
    name: "Hoạt động",
    path: "/activities",
    icon: <HiOutlineClipboardList />,
    type: "both",
  },
  {
    name: "Lịch trình sắp tới",
    path: "/schedules",
    icon: <HiCalendar />,
    type: "both",
  },
  // {
  //   name: "Đơn hàng nháp",
  //   path: "/dashboard/profile/draft-order",
  //   icon: <HiOutlineTrash />,
  //   type: "both",
  // },
  // {
  //   name: "Đơn hàng đang thanh toán",
  //   path: "/dashboard/profile/pending-deposit",
  //   icon: <MdPendingActions />,
  //   type: "both",
  // },
  {
    name: "Đánh giá",
    path: "/dashboard/ratings/given",
    icon: <HiStar />,
    type: "both",
  },
  {
    name: "Kho voucher",
    path: "/dashboard/profile/promotion",
    icon: <RiCouponLine />,
    type: "both",
  },
  // {
  //   name: "Thanh toán",
  //   path: "/dashboard/profile/payment",
  //   icon: <MdPayment />,
  // type: 'both'
  // },
  {
    name: "Mật khẩu",
    path: "/dashboard/profile/password",
    icon: <MdLockOutline />,
    type: "both",
  },
]

export const ridesFormFields: {
  name: RidesFormFieldKey
  type: "text" | "date" | "select"
  placeholder: string
  isRequired: boolean
}[] = [
  {
    name: "from_pick_up_station_id",
    type: "text",
    placeholder: "Mặt Trước",
    isRequired: true,
  },
  {
    name: "to_pick_up_station_id",
    type: "text",
    placeholder: "Điểm đến",
    isRequired: true,
  },

  {
    name: "from_pick_up_station_id",
    type: "text",
    placeholder: "Mặt Trước",
    isRequired: true,
  },
  {
    name: "from_pick_up_station_id",
    type: "text",
    placeholder: "Mặt Trước",
    isRequired: true,
  },
]

interface CreateRidesOneWayFormFieldsParams {
  label: string
  isRequired: boolean
  name: RidesFormFieldKey
  type: "select" | "date" | "text"
  icon?: ReactNode
  childs?: CreateRidesOneWayFormFieldsParams[]
}

export const createRidesOneWayFormFields: CreateRidesOneWayFormFieldsParams[] = [
  {
    name: "from_pick_up_station_id",
    isRequired: true,
    label: "Chọn điểm đi",
    type: "text",
    icon: <HiOutlineLocationMarker />,
  },

  {
    name: "to_pick_up_station_id",
    isRequired: true,
    label: "Chọn điểm đến",
    type: "text",
    icon: <HiOutlineLocationMarker />,
  },
  {
    name: "expected_going_on_date",
    isRequired: true,
    label: "Chọn ngày đi",
    type: "date",
    icon: <MdOutlineDateRange />,
    childs: [
      {
        name: "expected_going_on_date",
        isRequired: true,
        label: "Chọn ngày đi",
        type: "date",
      },
      {
        name: "expected_going_on_date",
        isRequired: true,
        label: "Chọn giờ đi",
        type: "text",
      },
    ],
  },
  {
    name: "car_id",
    isRequired: true,
    label: "Chọn loại xe",
    type: "select",
    icon: <RiCarWashingLine />,
  },
  {
    name: "number_seat",
    isRequired: true,
    label: "Chọn số ghế",
    type: "select",
    icon: <RiCarWashingLine />,
  },
]

export const CreateRidesTwoWayFormFields: CreateRidesOneWayFormFieldsParams[] = [
  ...createRidesOneWayFormFields,
]

export const hoursBackList: { label: string; value: HourWaitTimeType }[] = [
  {
    label: "1 Giờ",
    value: "01_hour",
  },
  {
    label: "2 Giờ",
    value: "02_hour",
  },
  {
    label: "3 Giờ",
    value: "03_hour",
  },
  {
    label: "4 Giờ",
    value: "04_hour",
  },
  {
    label: "5 Giờ",
    value: "05_hour",
  },
  {
    label: "6 Giờ",
    value: "06_hour",
  },
  {
    label: "7 Giờ",
    value: "07_hour",
  },
  {
    label: "8 Giờ",
    value: "08_hour",
  },
  {
    label: "9 Giờ",
    value: "09_hour",
  },
  {
    label: "10 Giờ",
    value: "10_hour",
  },
  {
    label: "11 Giờ",
    value: "11_hour",
  },
  {
    label: "12 Giờ",
    value: "12_hour",
  },
]

export const compoundingTypeFilters: {
  label: string
  value: CompoundingType
}[] = [
  {
    label: "Một Chiều",
    value: "one_way",
  },
  {
    label: "Hai Chiều",
    value: "two_way",
  },
  {
    label: "Đi Ghép",
    value: "compounding",
  },
]

export const compoundingOrderList: {
  value: CompoundingOrderField
  label: string
}[] = [
  { value: "sort_by_lowest_price", label: "Giá thấp đến cao" },
  { value: "sort_by_highest_price", label: "Giá cao đến thấp" },
  { value: "sort_by_distance", label: "Vị trí gần nhất" },
]

export const activityStates: {
  value: CompoundingCarCustomerState
  label: string
}[] = [
  {
    label: "Đơn nháp",
    value: "draft",
  },
  {
    label: "Đã xác nhận",
    value: "confirm",
  },
  {
    label: "Đã thanh toán",
    value: "deposit",
  },
  {
    label: "Chờ tài xế",
    value: "waiting",
  },
  {
    label: "Đã có tài xế",
    value: "assign",
  },
  {
    label: "Đang di chuyển",
    value: "in_process",
  },
  {
    label: "Đã hoàn thành",
    value: "done",
  },
  {
    label: "Khách hàng thanh toán",
    value: "customer_pay",
  },
  {
    label: "Xác nhận thanh toán",
    value: "confirm_pay",
  },
  {
    label: "Đã hủy",
    value: "cancel",
  },
]

export const driveractivityStates: {
  value: CompoundingCarDriverState
  label: string
}[] = [
  {
    label: "Đã hủy",
    value: "cancel",
  },
  {
    label: "Đã xác nhận",
    value: "confirm",
  },
  {
    label: "Đã thanh toán",
    value: "confirm_deposit",
  },
  {
    label: "Đã hoàn thành",
    value: "done",
  },
  {
    label: "Đơn nháp",
    value: "draft",
  },
  {
    label: "Đang di chuyển",
    value: "start_running",
  },
  {
    label: "Ngừng chọn khách",
    value: "stop_picking",
  },
  {
    label: "Chờ hành khách",
    value: "waiting",
  },
  {
    label: "Chờ thanh toán",
    value: "waiting_deposit",
  },
]
