import { ImageFileLoading, InputLoading } from "@/components"
import DrivingLicenseForm from "@/components/form/driver/drivingLicenseForm"
import { ScreenContainer } from "@/container"
import { DriverLayout } from "@/layout"
import { DrivingLicenseFormParams } from "@/models"
import { useRouter } from "next/router"
import { useVehicleDrivingLicense } from "shared/hook"

const DrivingLicenseDetail = () => {
  const router = useRouter()
  const {
    data: drivingLicense,
    createVehicleDrivingLicense,
    updateVehicleDrivingLicense,
    isValidating,
  } = useVehicleDrivingLicense(true)

  const handleSubmitForm = (data: DrivingLicenseFormParams) => {
    if (drivingLicense?.car_driving_license_id) {
      updateVehicleDrivingLicense({
        params: {
          ...data,
          token: "",
          car_driving_license_id: drivingLicense.car_driving_license_id,
        },
        onSuccess: () => {
          router.push("/register/driver")
        },
      })
    } else {
      createVehicleDrivingLicense({
        params: { ...data, token: "" },
        onSuccess: () => {
          router.push("/register/driver")
        },
      })
    }
  }

  return (
    <ScreenContainer heading="Bằng Lái Xe">
      <div className="content-container px-24">
        {!isValidating ? (
          <DrivingLicenseForm
            defaultValues={drivingLicense}
            onSubmit={(data) => handleSubmitForm(data)}
          />
        ) : (
          <>
            <ImageFileLoading />
            <ImageFileLoading />
            <InputLoading />
            <InputLoading />
            <InputLoading />
            <InputLoading />
          </>
        )}
      </div>
    </ScreenContainer>
  )
}

DrivingLicenseDetail.Layout = DriverLayout

export default DrivingLicenseDetail
