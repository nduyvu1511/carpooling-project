import { RideDoneItem } from "@/components"
import { MainNoFooter } from "@/layout"

export const Rides = () => {
  return (
    <section className="rides__page">
      <div className="container">
        <h1 className="rides__page-heading page-heading">Chuyến đi của bạn</h1>

        <div className="content-container">
          <div className="rides__pages-content">
            <ul className="rides__page-content-list">
              <li className="rides__page-content-list-item">
                <RideDoneItem />
              </li>

              <li className="rides__page-content-list-item">
                <RideDoneItem />
              </li>

              <li className="rides__page-content-list-item">
                <RideDoneItem />
              </li>

              <li className="rides__page-content-list-item">
                <RideDoneItem />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

Rides.Layout = MainNoFooter

export default Rides
