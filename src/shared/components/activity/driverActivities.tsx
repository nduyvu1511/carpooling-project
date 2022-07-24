import { RideContainer } from "@/container"
import { driveractivityStates } from "@/helper"
import { CompoundingCarDriverState } from "@/models"
import { useRouter } from "next/router"
import { RiLoader4Line } from "react-icons/ri"
import InfiniteScroll from "react-infinite-scroll-component"
import { useDriverActivities } from "shared/hook/user/useDriverActivities"
import { ActivityItem } from "./activityItem"

export const DriverActivities = () => {
  const router = useRouter()
  const {
    data,
    isLoading,
    fetchMoreActivities,
    filterCompoundingActivities,
    hasMore,
    activityStates,
  } = useDriverActivities()

  const handleFilter = (val: CompoundingCarDriverState) => {
    filterCompoundingActivities(val)
  }

  const url =
    "https://www.google.com/maps/dir/?api=1&origin=9.138198,105.200779&destination=10.825943,106.606360"
  return (
    <RideContainer heading="Hoạt động">
      <div className="activities__page content-container px-24">
        <div className="activity__filter">
          <ul className="activity__filter-list">
            {driveractivityStates.map((item, index) => (
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
                    onClick={() =>
                      router.push(`/schedules/detail?compounding_car_id=${item.compounding_car_id}`)
                    }
                    activity={{
                      amount_total: item.amount_total,
                      compounding_car_name: item.compounding_car_name,
                      compounding_type: item.compounding_type,
                      expected_going_on_date: item.expected_going_on_date,
                      expected_picking_up_date: item.expected_picking_up_date,
                      id: item.compounding_car_id,
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
