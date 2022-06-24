import { RideContainer } from "@/container"
import { formatMoneyVND, getCompoundingTypeName } from "@/helper"
import { useAuthorization, useCustomerActivities } from "shared/hook"

const Activities = () => {
  const { role } = useAuthorization()
  const { data, isValidating } = useCustomerActivities()

  if (!data?.length) return null
  return (
    <RideContainer heading="Hoạt động">
      <div className="activities__page content-container px-24">
        <ul className="activity__list">
          {data.map((item: any, index: number) => (
            <li key={index} className="activity__list-item">
              <div className="activity__item">
                <div className="activity__item-content">
                  <p className="activity__item-content-title">
                    {item.compounding_car_name}
                  </p>

                  <p className="activity__item-content-type">
                    <strong>Loại</strong>
                    {getCompoundingTypeName(item.compounding_type)}
                  </p>

                  <div className="activity__item-content-date">
                    <p className="activity__item-content-date-from">
                      <strong>Ngày đi: </strong> {item.expected_going_on_date}
                    </p>
                    <p className="activity__item-content-date-to">
                      <strong>Ngày về: </strong> {item.expected_picking_up_date}
                    </p>
                  </div>
                </div>

                <div className="activity__item-sub">
                  <p className="activity__item-sub-price">
                    {formatMoneyVND(item.price_unit.price_unit)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </RideContainer>
  )
}

export default Activities
