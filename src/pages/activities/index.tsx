import { RideContainer } from "@/container"
import { useAuthorization, useCompoundingActivities } from "shared/hook"

const Activities = () => {
  const { role } = useAuthorization()
  const { data, isValidating } = useCompoundingActivities()
  console.log(data)

  if (!data) return null
  return (
    <RideContainer heading="Hoạt động">
      <div className="activities__page content-container px-24">
        <ul className="activity__list">
          {data.map((item, index) => (
            <li key={index} className="activity__list-item">
              <div className="activity__item">
                <p className="activity__item-title">{}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </RideContainer>
  )
}

export default Activities
