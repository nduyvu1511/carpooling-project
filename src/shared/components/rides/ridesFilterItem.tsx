import { ItemSelect } from "../inputs"

interface RidesFilterItemProps {
  heading: string
  type?: "radio" | "checkbox"
  onClick: (val: string) => void
  list: string[]
}

export const RidesFilterItem = ({
  heading,
  list,
  onClick,
  type = "radio",
}: RidesFilterItemProps) => {
  return (
    <div className="rides__filter">
      <div className="rides__filter-header">
        <h3 className="rides__filter-header-heading px-24">{heading}</h3>
      </div>
      <ul className="rides__filter-list">
        {list.map((item) => (
          <li
            key={item}
            onClick={() => onClick(item)}
            className="rides__filter-item"
          >
            <ItemSelect
              type={type}
              isChecked={true}
              onCheck={() => {}}
              title={item}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
