import { ImageSingleFile } from "@/components"
import { DriverContainer } from "@/container"
import { driverBioSchema } from "@/core/schema"
import { DriverBioForm } from "@/models"
import { setDriverInfo } from "@/modules"
import { yupResolver } from "@hookform/resolvers/yup"
import moment from "moment"
import { useRouter } from "next/router"
import { Controller, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import Select from "react-select"

const BioDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    control,
  } = useForm<DriverBioForm>({
    resolver: yupResolver(driverBioSchema),
    mode: "all",
  })

  const onSubmitHandler = (data: DriverBioForm) => {
    dispatch(setDriverInfo(data))
    router.back()
  }

  return (
    <DriverContainer
      onAction={handleSubmit(onSubmitHandler)}
      btnLabel="Lưu"
      heading="Thông tin"
    >
      <div className="content-container px-24">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="form-item">
            <label className="form-item-label driver-bio__form-label">
              Cập nhật hình ảnh cá nhân{" "}
              <span className="form-label-warning">(Bắt buộc)</span>
            </label>

            <Controller
              control={control}
              name="avatar"
              render={({ field: { onChange } }) => (
                <div className="driver-bio__form-input">
                  <ImageSingleFile
                    isError={!!errors?.avatar?.message}
                    getBase64Image={(img) => {
                      onChange(img)
                    }}
                  />
                </div>
              )}
              rules={{ required: true }}
            />

            {errors["avatar"] || dirtyFields["avatar"] ? (
              <p className="form-item-input-text-error">
                {errors["avatar"]?.message}
              </p>
            ) : null}
          </div>

          <div className="form-item">
            <div className="form-item-wrapper">
              <label className="form-item-label" htmlFor="name">
                Họ tên <span className="form-label-warning">(Bắt buộc)</span>
              </label>

              <input
                className={`form-item-input ${
                  errors["name"] ? "form-item-input-error" : ""
                }`}
                id="name"
                type="text"
                placeholder="Họ tên"
                {...register("name", {
                  required: true,
                })}
              />

              {errors?.name || dirtyFields?.name ? (
                <p className="form-item-input-text-error">
                  {errors?.name?.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="form-item">
            <div className="form-item-wrapper">
              <label className="form-item-label" htmlFor="sex">
                Giới tính <span className="form-label-warning">(Bắt buộc)</span>
              </label>

              <Controller
                control={control}
                name="sex"
                render={({ field: { onChange, onBlur } }) => (
                  <Select
                    className={`${
                      errors["sex"] ? "form-item-select-error" : ""
                    }`}
                    placeholder="Giới tính"
                    options={[
                      { label: "Nam", value: "male" },
                      { label: "Nữ", value: "female" },
                    ]}
                    onChange={(val) => onChange(val?.value || "")}
                    onBlur={onBlur}
                  />
                )}
                rules={{ required: true }}
              />

              {errors?.sex || dirtyFields?.sex ? (
                <p className="form-item-input-text-error">
                  {errors?.sex?.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="form-item">
            <div className="form-item-wrapper">
              <label className="form-item-label" htmlFor="dateOfBirth">
                Ngày sinh <span className="form-label-warning">(Bắt buộc)</span>
              </label>

              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { onChange, onBlur } }) => (
                  <input
                    className={`form-item-input ${
                      errors["dateOfBirth"] ? "form-item-input-error" : ""
                    }`}
                    id="dateOfBirth"
                    type="date"
                    onBlur={onBlur}
                    placeholder="Ngày sinh"
                    onChange={(e) =>
                      onChange(moment(e.target.value).format("DD/MM/YYYY"))
                    }
                  />
                )}
                rules={{ required: true }}
              />

              {errors?.dateOfBirth || dirtyFields?.dateOfBirth ? (
                <p className="form-item-input-text-error">
                  {errors?.dateOfBirth?.message}
                </p>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </DriverContainer>
  )
}

export default BioDetail
