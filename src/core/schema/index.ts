import {
  BIRTHDAY_SCHEMA,
  PASSWORD_SCHEMA,
  PHONE_SCHEMA,
  STRING_AT_LEAST_TWO_CHARACTER,
} from "@/helper"
import * as Yup from "yup"

export const UserAddressSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(PHONE_SCHEMA, "Vui lòng nhập số điện thoại hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  name: Yup.string()
    .min(2, "Tên không hợp lệ")
    .required("Vui lòng nhập Họ Tên"),
  street: Yup.string()
    .matches(/[^A-Za-z0-9]+/, "Phải bao gồm số nhà và tên đường!")
    .required("Vui lòng nhập địa chỉ cụ thể"),
})

export const phoneNumberSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(PHONE_SCHEMA, "Vui lòng nhập số điện thoại hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
})

export const createPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .matches(
      PASSWORD_SCHEMA,
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt"
    )
    .required("Vui lòng nhập mật khẩu"),
  reNewPassword: Yup.string().matches(
    PASSWORD_SCHEMA,
    "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt"
  ),
})

export const changePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      PASSWORD_SCHEMA,
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt"
    )
    .required("Vui lòng nhập mật khẩu"),
  newPassword: Yup.string()
    .matches(
      PASSWORD_SCHEMA,
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt"
    )
    .required("Vui lòng nhập mật khẩu"),
  reNewPassword: Yup.string()
    .matches(
      PASSWORD_SCHEMA,
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt"
    )
    .oneOf(
      [Yup.ref("newPassword")],
      "Mật khẩu xác nhận phải trung với mật khẩu mới"
    )
    .required("Vui lòng nhập mật khẩu xác nhận"),
})

export const passwordSchema = Yup.object().shape({
  password: Yup.string().matches(
    PASSWORD_SCHEMA,
    "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt"
  ),
})

export const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(PHONE_SCHEMA, "Vui lòng nhập số điện thoại hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  password: Yup.string()
    .matches(
      PASSWORD_SCHEMA,
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt"
    )
    .required("Vui lòng nhập mật khẩu"),
})

export const userFormSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(
      PHONE_SCHEMA,
      "Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số và ký tự đặc biệt"
    )
    .required("Vui lòng nhập số điện thoại"),
  email: Yup.string().matches(
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    "Vui lòng nhập đúng định dạng email"
  ),
  birthday: Yup.string().matches(
    BIRTHDAY_SCHEMA,
    "Vui lòng nhập ngày sinh theo định dạng DD/MM/YYYY"
  ),
  name: Yup.string()
    .matches(
      STRING_AT_LEAST_TWO_CHARACTER,
      "Họ tên người dùng phải chứa ít nhất hai chữ cái"
    )
    .required("Vui lòng nhập tên"),
  sex: Yup.string()
    .oneOf(["male", "female"])
    .required("Vui lòng chọn giới tính"),
  bio: Yup.string(),
})

export const messageSchema = Yup.object().shape({
  message: Yup.string().required("Vui lòng nhập bình luận"),
})
