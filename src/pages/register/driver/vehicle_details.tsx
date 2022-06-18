import { ImageFileLoading, InputLoading, VehicleForm } from "@/components"
import { ScreenContainer } from "@/container"
import { DriverLayout } from "@/layout"
import { VehicleDetailFormParamsNoToken } from "@/models"
import { useRouter } from "next/router"
import { useRegistrationCertificate } from "shared/hook"

const VehicleInsurance = () => {
  const router = useRouter()
  const {
    data: regisCertificate,
    createRegistrationCertificate,
    updateRegistrationCertificate,
    isValidating,
  } = useRegistrationCertificate(true)

  const handleSubmit = (data: VehicleDetailFormParamsNoToken) => {
    if (regisCertificate?.car_registration_certificate_id) {
      updateRegistrationCertificate({
        params: {
          ...data,
          token: "",
          car_registration_certificate_id:
            regisCertificate.car_registration_certificate_id,
        },
        onSuccess: () => {
          router.push("/register/driver")
        },
      })
    } else {
      createRegistrationCertificate({
        params: { ...data, token: "" },
        onSuccess: () => {
          router.push("/register/driver")
        },
      })
    }
  }

  return (
    <ScreenContainer heading="Thông tin xe">
      <div className="content-container px-24">
        {!isValidating ? (
          <VehicleForm
            defaultValues={regisCertificate}
            onSubmit={(data) => handleSubmit(data)}
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

VehicleInsurance.Layout = DriverLayout
export default VehicleInsurance
