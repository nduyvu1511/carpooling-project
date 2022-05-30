import {
  chatIcon,
  closeFillIcon,
  dbIcon,
  paymentIcon,
  quotesIcon,
  thunderIcon,
  trustUserIcon,
  userCircleIcon,
} from "@/assets"
import { UserFormSchemaKey } from "@/models"

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
  { icon: quotesIcon(24), name: "Chuyến đi của bạn", path: "/rides" },
  { icon: chatIcon(24), name: "Tin nhắn", path: "/chat" },
  {
    icon: userCircleIcon(24),
    name: "Thông tin cá nhân",
    path: "/dashboard/profile/menu",
  },
  {
    icon: dbIcon(24),
    name: "Giao dịch",
    path: "/dashboard/account/money-available",
  },
  {
    icon: paymentIcon(24),
    name: "Thanh toán",
    path: "/dashboard/account/payments-history",
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
    desc: "Cho dù bạn đang đi đâu, bằng xe buýt hay đi chung xe, hãy tìm một chuyến đi hoàn hảo từ nhiều điểm đến và tuyến đường của chúng tôi với mức giá thấp.",
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

export const userFormFields: {
  name: UserFormSchemaKey
  label: string
  placeholder: string
}[] = [
  {
    name: "name",
    label: "Họ tên",
    placeholder: "Họ tên",
  },
  {
    name: "sex",
    label: "Giới tính",
    placeholder: "Giới tính",
  },
  {
    name: "birthday",
    label: "Ngày sinh",
    placeholder: "DD/MM/YYYY",
  },
  {
    name: "email",
    label: "Địa chỉ email",
    placeholder: "Địa chỉ email",
  },

  {
    name: "phone",
    label: "Số điện thoại",
    placeholder: "Số điện thoại",
  },
  {
    name: "bio",
    label: "Giới thiệu",
    placeholder: "Giới thiệu",
  },
]

export const provinces = [
  {
    label: "An Giang",
    value: "An Giang",
  },
  {
    label: "Bà Rịa-Vũng Tàu",
    value: "Bà Rịa-Vũng Tàu",
  },
  {
    label: "Bạc Liêu",
    value: "Bạc Liêu",
  },
  {
    label: "Bắc Kạn",
    value: "Bắc Kạn",
  },
  {
    label: "Bắc Giang",
    value: "Bắc Giang",
  },
  {
    label: "Bắc Ninh",
    value: "Bắc Ninh",
  },
  {
    label: "Bến Tre",
    value: "Bến Tre",
  },
  {
    label: "Bình Dương",
    value: "Bình Dương",
  },
  {
    label: "Bình Định",
    value: "Bình Định",
  },
  {
    label: "Bình Phước",
    value: "Bình Phước",
  },
  {
    label: "Bình Thuận",
    value: "Bình Thuận",
  },
  {
    label: "Cà Mau",
    value: "Cà Mau",
  },
  {
    label: "Cao Bằng",
    value: "Cao Bằng",
  },
  {
    label: "Cần Thơ (TP)",
    value: "Cần Thơ (TP)",
  },
  {
    label: "Đà Nẵng (TP)",
    value: "Đà Nẵng (TP)",
  },
  {
    label: "Đắk Lắk",
    value: "Đắk Lắk",
  },
  {
    label: "Đắk Nông",
    value: "Đắk Nông",
  },
  {
    label: "Điện Biên",
    value: "Điện Biên",
  },
  {
    label: "Đồng Nai",
    value: "Đồng Nai",
  },
  {
    label: "Đồng Tháp",
    value: "Đồng Tháp",
  },
  {
    label: "Gia Lai",
    value: "Gia Lai",
  },
  {
    label: "Hà Giang",
    value: "Hà Giang",
  },
  {
    label: "Hà Nam",
    value: "Hà Nam",
  },
  {
    label: "Hà Nội (TP)",
    value: "Hà Nội (TP)",
  },
  {
    label: "Hà Tây",
    value: "Hà Tây",
  },
  {
    label: "Hà Tĩnh",
    value: "Hà Tĩnh",
  },
  {
    label: "Hải Dương",
    value: "Hải Dương",
  },
  {
    label: "Hải Phòng (TP)",
    value: "Hải Phòng (TP)",
  },
  {
    label: "Hòa Bình",
    value: "Hòa Bình",
  },
  {
    label: "Hồ Chí Minh (TP)",
    value: "Hồ Chí Minh (TP)",
  },
  {
    label: "Hậu Giang",
    value: "Hậu Giang",
  },
  {
    label: "Hưng Yên",
    value: "Hưng Yên",
  },
  {
    label: "Khánh Hòa",
    value: "Khánh Hòa",
  },
  {
    label: "Kiên Giang",
    value: "Kiên Giang",
  },
  {
    label: "Kon Tum",
    value: "Kon Tum",
  },
  {
    label: "Lai Châu",
    value: "Lai Châu",
  },
  {
    label: "Lào Cai",
    value: "Lào Cai",
  },
  {
    label: "Lạng Sơn",
    value: "Lạng Sơn",
  },
  {
    label: "Lâm Đồng",
    value: "Lâm Đồng",
  },
  {
    label: "Long An",
    value: "Long An",
  },
  {
    label: "Nam Định",
    value: "Nam Định",
  },
  {
    label: "Nghệ An",
    value: "Nghệ An",
  },
  {
    label: "Ninh Bình",
    value: "Ninh Bình",
  },
  {
    label: "Ninh Thuận",
    value: "Ninh Thuận",
  },
  {
    label: "Phú Thọ",
    value: "Phú Thọ",
  },
  {
    label: "Phú Yên",
    value: "Phú Yên",
  },
  {
    label: "Quảng Bình",
    value: "Quảng Bình",
  },
  {
    label: "Quảng Nam",
    value: "Quảng Nam",
  },
  {
    label: "Quảng Ngãi",
    value: "Quảng Ngãi",
  },
  {
    label: "Quảng Ninh",
    value: "Quảng Ninh",
  },
  {
    label: "Quảng Trị",
    value: "Quảng Trị",
  },
  {
    label: "Sóc Trăng",
    value: "Sóc Trăng",
  },
  {
    label: "Sơn La",
    value: "Sơn La",
  },
  {
    label: "Tây Ninh",
    value: "Tây Ninh",
  },
  {
    label: "Thái Bình",
    value: "Thái Bình",
  },
  {
    label: "Thái Nguyên",
    value: "Thái Nguyên",
  },
  {
    label: "Thanh Hóa",
    value: "Thanh Hóa",
  },
  {
    label: "Thừa Thiên – Huế",
    value: "Thừa Thiên – Huế",
  },
  {
    label: "Tiền Giang",
    value: "Tiền Giang",
  },
  {
    label: "Trà Vinh",
    value: "Trà Vinh",
  },
  {
    label: "Tuyên Quang",
    value: "Tuyên Quang",
  },
  {
    label: "Vĩnh Long",
    value: "Vĩnh Long",
  },
  {
    label: "Vĩnh Phúc",
    value: "Vĩnh Phúc",
  },
  {
    label: "Yên Bái",
    value: "Yên Bái",
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
