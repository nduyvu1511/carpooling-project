import { vehicleFormSchema } from "@/core/schema"
import { vehicleFormFields } from "@/helper"
import { Field, Form, Formik } from "formik"

export const VehicleForm = () => {
  return (
    <Formik
      initialValues={{
        brand: "",
        model: "",
        type: "",
        desc: "",
      }}
      validationSchema={vehicleFormSchema}
      onSubmit={(data) => console.log(data)}
    >
      {({ errors, touched, isValid }) => (
        <Form className="form-control px-24">
          {vehicleFormFields.map((input, index) => (
            <div key={index} className="form-item">
              <label className="form-item-label" htmlFor={input.name}>
                {input.label}
              </label>

              <div className="form-item-wrapper">
                <Field
                  className={`form-item-input ${
                    errors[input.name] && touched[input.name]
                      ? "form-item-input-error"
                      : ""
                  }`}
                  id={input.name}
                  type="text"
                  name={input.name}
                  placeholder={input.placeholder}
                  component={`${input.name === "desc" ? "textarea" : "input"}`}
                  rows={4}
                />

                {errors[input.name] && touched[input.name] ? (
                  <p className="form-item-input-text-error">
                    {errors[input.name]}
                  </p>
                ) : null}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className={`btn-primary ${isValid ? "" : "opacity-50"}`}
          >
            Xác nhận
          </button>
        </Form>
      )}
    </Formik>
  )
}
