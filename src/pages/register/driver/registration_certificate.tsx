import {
  ImageFileLoading,
  InputLoading,
  RegistrationCetificateForm,
} from "@/components"
import { ScreenContainer } from "@/container"
import { DriverLayout } from "@/layout"
import { CertificateInspectionParamsNoToken } from "@/models"
import { useRouter } from "next/router"
import { useCertificateInspection } from "shared/hook/form/useCertificateInspection"

const RegistrationCertificate = () => {
  const router = useRouter()
  const {
    createCertificateInspection,
    data: certificateInspection,
    isValidating,
    updateCertificateInspection,
  } = useCertificateInspection(true)

  const handleSubmit = (data: CertificateInspectionParamsNoToken) => {
    if (certificateInspection?.periodical_inspection_certificate_id) {
      updateCertificateInspection({
        params: {
          ...data,
          token: "",
          periodical_inspection_certificate_id:
            certificateInspection.periodical_inspection_certificate_id,
        },
        onSuccess: () => {
          router.push("/register/driver")
        },
      })
    } else {
      createCertificateInspection({
        params: { ...data, token: "" },
        onSuccess: () => {
          router.push("/register/driver")
        },
      })
    }
  }

  return (
    <ScreenContainer heading="Giấy Đăng Kiểm">
      <div className="content-container px-24">
        {isValidating ? (
          <>
            <ImageFileLoading />
            <ImageFileLoading />
            <InputLoading />
            <InputLoading />
          </>
        ) : (
          <RegistrationCetificateForm
            defaultValues={certificateInspection}
            onSubmit={(data) => handleSubmit(data)}
          />
        )}
      </div>
    </ScreenContainer>
  )
}

RegistrationCertificate.Layout = DriverLayout

export default RegistrationCertificate
