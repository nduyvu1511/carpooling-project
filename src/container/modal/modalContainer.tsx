import { InputRidesSearchModal, MapModal } from "@/components"
import { PromotionModal } from "@/components/promotion/promotionModal"
import { RootState } from "@/core/store"
import { useSelector } from "react-redux"

export const ModalContainer = () => {
  const {
    modal: { isOpenSearchModal },
  } = useSelector((state: RootState) => state.rides)
  const { isOpenMapModal } = useSelector((state: RootState) => state.location)
  const { isOpenPromotionModal } = useSelector(
    (state: RootState) => state.common
  )

  return (
    <>
      {isOpenSearchModal ? <InputRidesSearchModal /> : null}
      {isOpenMapModal ? <MapModal /> : null}
      {isOpenPromotionModal ? <PromotionModal /> : null}
    </>
  )
}
