import { formatMoneyVND, getCompoundingTypeName } from "@/helper"
import { CompoundingType } from "@/models"

interface ActivityItemProps {
  activity: {
    compounding_car_name: string
    id: number
    compounding_type: CompoundingType
    expected_going_on_date: string
    expected_picking_up_date: string
    amount_total: number
  }
  onClick?: (id: number) => void
}

export const ActivityItem = ({ activity, onClick }: ActivityItemProps) => {
  return (
    <div onClick={() => onClick && onClick(activity.id)} className="activity__item">
      <div className="activity__item-content">
        <p className="activity__item-content-title">{activity.compounding_car_name}</p>

        <p className="activity__item-content-type">
          <strong>Loại</strong>
          {getCompoundingTypeName(activity.compounding_type)}
        </p>

        <div className="activity__item-content-date">
          <p className="activity__item-content-date-from">
            <strong>Ngày đi: </strong> {activity.expected_going_on_date}
          </p>
          <p className="activity__item-content-date-to">
            <strong>Ngày về: </strong> {activity.expected_picking_up_date}
          </p>
        </div>
      </div>

      <div className="activity__item-sub">
        <p className="activity__item-sub-price">{formatMoneyVND(activity.amount_total)}</p>
      </div>
    </div>
  )
}
