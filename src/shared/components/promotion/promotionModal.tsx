import { setOpenPromotionModal } from "@/modules"
import { useDispatch } from "react-redux"
import { useInputText } from "shared/hook"
import { Modal } from "../modal"
import { PromotionItem } from "./promotionItem"

export const PromotionModal = () => {
  const dispatch = useDispatch()
  const { value: promotionCode, onChange } = useInputText("")

  return (
    <Modal
      view="small"
      onClose={() => dispatch(setOpenPromotionModal(false))}
      mainChildren={
        <div className="promotion__modal">
          <div className="content-container px-24">
            <div className="promotion__modal-input">
              <div className="form-item">
                <input
                  placeholder="Nhập mã giảm giá..."
                  type="text"
                  value={promotionCode}
                  onChange={onChange}
                  className="form-item-input"
                />
              </div>
              <button
                className={`btn-primary ${
                  !promotionCode ? "btn-disabled" : ""
                }`}
              >
                Áp dụng
              </button>
            </div>
            <ul className="promotion__list">
              <li className="promotion__list-item">
                <PromotionItem />
              </li>

              <li className="promotion__list-item">
                <PromotionItem />
              </li>

              <li className="promotion__list-item">
                <PromotionItem />
              </li>
              <li className="promotion__list-item">
                <PromotionItem />
              </li>

              <li className="promotion__list-item">
                <PromotionItem />
              </li>
            </ul>
          </div>
        </div>
      }
      headerChildren={<h1>Chọn mã khuyến mãi</h1>}
    />
  )
}
