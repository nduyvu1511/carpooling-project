import { Backdrop, InputRidesSearchModal, MapModal } from "@/components"
import { PromotionModal } from "@/components/promotion/promotionModal"
import { RootState } from "@/core/store"
import { useSelector } from "react-redux"

export const ModalContainer = () => {
  const { isOpenMapModal } = useSelector((state: RootState) => state.location)
  const { isOpenPromotionModal } = useSelector(
    (state: RootState) => state.common
  )
  const { isScreenLoading } = useSelector((state: RootState) => state.common)

  return (
    <>
      {isOpenMapModal ? <MapModal /> : null}
      {isOpenPromotionModal ? <PromotionModal /> : null}
      {isScreenLoading ? <Backdrop /> : null}
    </>
  )
}
