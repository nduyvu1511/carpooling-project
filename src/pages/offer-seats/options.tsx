import { ItemSelect } from "@/components"
import { RideContainer } from "@/container"
import { useRouter } from "next/router"

const Options = () => {
  const router = useRouter()

  return (
    <RideContainer
      showBtn={true}
      onClick={() => router.push("/offer-seats")}
      heading="Lựa chọn"
    >
      <div className="rides-option__container">
        <div className="rides__options content-container">
          <ul className="rides__options-list">
            <li className="rides__options-list-item">
              <ItemSelect isChecked={true} onCheck={() => {}} title="Đi Ghép" />
            </li>
            <li className="rides__options-list-item">
              <ItemSelect
                isChecked={false}
                onCheck={() => {}}
                title="Một Chiều"
              />
            </li>
            <li className="rides__options-list-item">
              <ItemSelect
                isChecked={false}
                onCheck={() => {}}
                title="Hai Chiều"
              />
            </li>
          </ul>
        </div>
      </div>
    </RideContainer>
  )
}

export default Options
