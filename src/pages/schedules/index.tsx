import { CompoundingFilterForm, RidesItem } from "@/components"
import { RideContainer } from "@/container"
import { CompoundingCarRes } from "@/models"
import { useRouter } from "next/router"
import InfiniteScroll from "react-infinite-scroll-component"
import useDriverSchedules from "shared/hook/user/useDriverSchedules"

const Schedules = () => {
  const router = useRouter()
  const { data: carpoolingList, hasMore, fetchMore, isValidating } = useDriverSchedules()

  return (
    <RideContainer heading="Lịch trình sắp tới">
      <div className="schedules-container px-24 container">
        <div className="schedules__inner">
          <div className="schedules__inner-left">
            <CompoundingFilterForm
              type="customer"
              onChange={(data) => {
                console.log(data)
              }}
            />
          </div>
          <div className="">
            {isValidating ? (
              <h3>Loading...</h3>
            ) : (
              <InfiniteScroll
                hasMore={hasMore}
                next={() => {
                  fetchMore()
                }}
                dataLength={carpoolingList?.length || 0}
                loader={<h3 style={{ textAlign: "center" }}>Loading...</h3>}
              >
                <div className="schedules__inner-right">
                  {carpoolingList &&
                    carpoolingList?.length > 0 &&
                    carpoolingList.map((item) => (
                      <RidesItem
                        onClick={() => {
                          router.push(
                            `/schedules/detail?compounding_car_id=${item.compounding_car_id}`
                          )
                        }}
                        key={item.compounding_car_id}
                        rides={
                          {
                            ...item,
                            price_unit: {
                              name: "",
                              price_unit: item.amount_total,
                            },
                          } as any
                        }
                      />
                    ))}
                </div>
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    </RideContainer>
  )
}

export default Schedules
