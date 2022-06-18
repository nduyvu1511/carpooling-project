// Regex
export const DEFAULT_LIMIT_PRODUCT = 24
export const PHONE_SCHEMA = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/
export const BIRTHDAY_SCHEMA = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
export const STRING_AT_LEAST_TWO_CHARACTER = /^[a-z]+(?:\s[a-z]+)+$/
export const PASSWORD_SCHEMA =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
export const DATE_SCHEMA =
  /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
export const BASE64_REGEX =
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
export const VIETNAMESE_NAME =
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/
export const YEAR_SCHEMA = /^(19|20)\d{2}$/
export const DATE_REGEX =
  /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/
export const BASE64_READER_REGEX = /^data:image\/\w+;base64,/
export const FIREBASE_API_KEY = "AIzaSyBFTcgvxkTVzziiIlEOhvoAbP1bLpTpwsg"
export const FIREBASE_AUTH_DOMAIN = "womart-3a686.firebaseapp.com"
export const FIREBASE_DATABASE_URL =
  "https://womart-3a686-default-rtdb.asia-southeast1.firebasedatabase.app"
export const FIREBASE_PROJECT_ID = "womart-3a686"
export const FIREBASE_STORAGE_BUCKET = "womart-3a686.appspot.com"
export const FIREBASE_MESSAGING_SENDER_ID = "761325889031"
export const FIREBASE_APP_ID = "1:761325889031:web:a95b7a85155033038eeca2"
export const FIREBASE_MESUREMENT_ID = "G-Y65TNJYHSL"
export const FIREBASE_VAPID_KEY = "G-Y65TNJYHSL"
export const LIMIT_MESSAGES = 30
export const PRIMARY_COLOR = "#0BB2F5"
export const REMEMBER_PASSWORD_KEY = "is_remember_password_KEY"
export const FORM_LOGIN_KEY = "form_login_KEY"
export const HEADER_HEIGHT = 72
export const DEFAULT_TRANSITION = {
  from: {
    opacity: 0,
    transform: "translateY(100%)",
  },
  enter: {
    opacity: 1,
    transform: "translateY(0)",
  },
  leave: {
    opacity: 0,
    transform: "translateY(100%)",
  },
}

export const CAR_ACCOUNT_TYPE_KEY = "car_account_type_key"
export const CURRENT_TOKEN_KEY = "current_token_key"
export const VERIFY_REGISTER_OTP_KEY = "verify_register_otp_key"

export const SWRConfig = {
  shouldRetryOnError: false,
  revalidateOnFocus: false,
}
export const GOOGLE_MAP_API_KEY = "AIzaSyDr3nOk0D6tpZjLKMJ65ElQlynRvvxo2j0"
export const DEFAULT_DATE_TIME_VALUE = "00-00-0000 00:00:00"
export const DEFAULT_HOUR_BACK_VALUE = "00_hour"
