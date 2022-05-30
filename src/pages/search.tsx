import { RideResultItem, RidesForm } from "@/components"
import { MainLayout } from "@/layout"
import { useSpring, animated } from "react-spring"

const SearchPage = () => {
  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <animated.section style={animation} className="search__page">
      <div className="container">
        <h1 className="search__page-heading">Bạn muốn tới đâu?</h1>
        <div className="search__page-form">
          <RidesForm />
        </div>

        <div className="search__page-result">
          <div className="search__page-result-list">
            <li className="search__page-result-list-item">
              <RideResultItem type="historyResult" />
            </li>

            <li className="search__page-result-list-item">
              <RideResultItem type="historyResult" />
            </li>

            <li className="search__page-result-list-item">
              <RideResultItem type="historyResult" />
            </li>
            <li className="search__page-result-list-item">
              <RideResultItem type="historyResult" />
            </li>
          </div>
        </div>
      </div>
    </animated.section>
  )
}

SearchPage.Layout = MainLayout

export default SearchPage
