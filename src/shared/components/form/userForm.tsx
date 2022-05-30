import { userFormSchema } from "@/core/schema"
import { userFormFields } from "@/helper"
import { Field, Form, Formik } from "formik"

export const UserForm = () => {
  return (
    <Formik
      initialValues={{
        phone: "",
        email: "",
        birthday: "",
        name: "",
        sex: "",
        bio: "",
      }}
      validationSchema={userFormSchema}
      onSubmit={(data) => console.log(data)}
    >
      {({ errors, touched, isValid }) => (
        <Form className="form-control">
          {userFormFields.map((input, index) => (
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
                  component={`${input.name === "bio" ? "textarea" : "input"}`}
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
