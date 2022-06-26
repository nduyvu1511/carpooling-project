import { RideContainer } from "@/container"
import {
  activityStates as activityStateData
} from "@/helper"
import { CompoundingCarCustomerState } from "@/models"
import { RiLoader4Line } from "react-icons/ri"
import InfiniteScroll from "react-infinite-scroll-component"
import { useCustomerActivities } from "shared/hook"
import { ActivityItem } from "./activityItem"

export const CustomerActivities = () => {
  const {
    data,
    isLoading,
    fetchMoreActivities,
    filterCompoundingActivities,
    hasMore,
    activityStates,
  } = useCustomerActivities()

  const handleFilter = (val: CompoundingCarCustomerState) => {
    filterCompoundingActivities(val)
  }

  return (
    <RideContainer heading="Hoạt động">
      <div className="activities__page content-container px-24">
        <div className="activity__filter">
          <ul className="activity__filter-list">
            {activityStateData.map((item, index) => (
              <li
                onClick={() => handleFilter(item.value)}
                key={index}
                className={`activity__filter-list-item ${
                  activityStates.includes(item.value) ? "activity__filter-list-item-active" : ""
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {isLoading ? (
          <div
            style={{
              paddingBlock: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RiLoader4Line style={{ fontSize: 30 }} className="loader" />
          </div>
        ) : (
          <InfiniteScroll
            hasMore={hasMore}
            next={() => fetchMoreActivities()}
            dataLength={data.length}
            loader={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBlock: "20px",
                }}
              >
                <RiLoader4Line className="loader" />
              </div>
            }
          >
            <ul className="activity__list">
              {data.map((item, index) => (
                <li key={index} className="activity__list-item">
                  <ActivityItem
                    activity={{
                      amount_total: item.amount_total,
                      compounding_car_name: item.compounding_car_name,
                      compounding_type: item.compounding_type,
                      expected_going_on_date: item.expected_going_on_date,
                      expected_picking_up_date: item.expected_picking_up_date,
                      id: item.compounding_car_customer_id,
                    }}
                  />
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        )}
      </div>
    </RideContainer>
  )
}
