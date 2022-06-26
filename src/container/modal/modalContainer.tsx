import { Backdrop } from "@/components"
import { RootState } from "@/core/store"
import { useSelector } from "react-redux"

export const ModalContainer = () => {
  const { isOpenPromotionModal } = useSelector((state: RootState) => state.common)
  const { isScreenLoading } = useSelector((state: RootState) => state.common)

  return <>{isScreenLoading ? <Backdrop /> : null}</>
}
