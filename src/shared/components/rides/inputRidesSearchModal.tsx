import { Input, Modal, RideResultItem } from "@/components"
import { RootState } from "@/core/store"
import { setOpenRidesModalSearch } from "@/modules/rides/ridesSlice"
import { useDispatch, useSelector } from "react-redux"

export const InputRidesSearchModal = () => {
  const dispatch = useDispatch()
  const {
    modal: { type },
  } = useSelector((state: RootState) => state.rides)

  return (
    <Modal
      onClose={() => {
        dispatch(
          setOpenRidesModalSearch({ isOpenSearchModal: false, type: undefined })
        )
      }}
      headerChildren={
        <Input
          onChange={(val) => console.log(val)}
          attributes={{
            type: "text",
            placeholder: type === "from" ? "Đón tại..." : "Đi đến...",
          }}
        />
      }
      mainChildren={
        <div className="rides__search-modal">
          <ul className="rides__searech-modal-list">
            <li className="rides__search-modal-list-item">
              <RideResultItem type="history" />
            </li>
            <li className="rides__search-modal-list-item">
              <RideResultItem type="history" />
            </li>

            <li className="rides__search-modal-list-item">
              <RideResultItem type="history" />
            </li>
          </ul>
        </div>
      }
    />
  )
}
