import { IdentityCardForm, ImageFileLoading, InputLoading } from "@/components"
import { ScreenContainer } from "@/container"
import { DriverLayout } from "@/layout"
import { IdCardParamsNoToken } from "@/models"
import { useRouter } from "next/router"
import { useIdentityCard } from "shared/hook"

const IdentityCardDetail = () => {
  const router = useRouter()
  const {
    createIdentityCard,
    updateIdentityCard,
    data: idCard,
    isValidating,
  } = useIdentityCard(true)

  const handleSubmitForm = (data: IdCardParamsNoToken) => {
    if (idCard?.identity_card_id) {
      updateIdentityCard({
        params: {
          ...data,
          token: "",
          identity_card_id: idCard.identity_card_id,
        },
        onSuccess: () => {
          router.push("/register/driver")
        },
      })
    } else {
      createIdentityCard({
        params: { ...data, token: "" },
        onSuccess: () => {
          router.push("/register/driver")
        },
      })
    }
  }

  return (
    <ScreenContainer heading="CMND / Thẻ Căn Cước / Hộ Chiếu">
      <div className="content-container px-24">
        {!isValidating ? (
          <IdentityCardForm
            defaultValues={idCard}
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
            <InputLoading />
          </>
        )}
      </div>
    </ScreenContainer>
  )
}

IdentityCardDetail.Layout = DriverLayout

export default IdentityCardDetail
