import { phoneNumberSchema } from "@/core/schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

interface OtpFormProps {
  onSubmit: (phoneNumber: string) => void
  phone?: string
}

export const PhoneForm = ({ onSubmit, phone }: OtpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
  } = useForm<{ phone: string }>({
    resolver: yupResolver(phoneNumberSchema),
    mode: "all",
    defaultValues: {
      phone: phone || "",
    },
  })

  useEffect(() => {
    ;(document.querySelector(".form-item-input") as HTMLInputElement)?.focus()
  }, [])

  const onSubmitHandler = ({ phone }: { phone: string }) => {
    onSubmit && onSubmit(phone)
  }

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="form-item">
        <label htmlFor={"phone"} className="form-item-label">
          Số điện thoại <span className="form-label-warning">(Bắt buộc)</span>
        </label>

        <div className="form-item-inner">
          <div className="form-item-wrapper">
            <input
              className={`form-item-input ${
                errors?.["phone"] ? "form-item-input-error" : ""
              }`}
              id="phone"
              type="text"
              {...register("phone", {
                required: true,
              })}
              placeholder="Số điện thoại"
            />
          </div>
          {errors?.["phone"] || dirtyFields?.["phone"] ? (
            <p className="form-item-input-text-error">
              {errors?.["phone"]?.message}
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        className={`btn-primary ${isValid ? "" : "btn-disabled"}`}
      >
        Xác nhận
      </button>
    </form>
  )
}
