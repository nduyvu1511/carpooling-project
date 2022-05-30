import { phoneNumberSchema } from "@/core/schema"
import { Field, Form, Formik } from "formik"
import { useEffect } from "react"

interface OtpFormProps {
  onSubmit: (phoneNumber: string) => void
}

export const PhoneForm = ({ onSubmit }: OtpFormProps) => {
  useEffect(() => {
    ;(document.querySelector(".form-item-input") as HTMLInputElement)?.focus()
  }, [])

  return (
    <Formik
      initialValues={{ phone: "" }}
      validationSchema={phoneNumberSchema}
      onSubmit={({ phone }) => {
        onSubmit && onSubmit(phone)
      }}
    >
      {({ errors, touched, isValid }) => (
        <Form className="form-control">
          <div className="form-item">
            <div className="form-item-inner">
              <div className="form-item-wrapper">
                <Field
                  className={`form-item-input ${
                    errors["phone"] && touched["phone"]
                      ? "form-item-input-error"
                      : ""
                  }`}
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="Số điện thoại"
                />
              </div>
              {errors["phone"] && touched["phone"] ? (
                <p className="form-item-input-text-error">{errors["phone"]}</p>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className={`btn-primary ${isValid ? "" : "btn-disabled"}`}
          >
            Xác nhận
          </button>
        </Form>
      )}
    </Formik>
  )
}
