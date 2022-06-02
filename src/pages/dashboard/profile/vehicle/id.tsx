import { AlertScreen, VehicleForm } from "@/components"
import { MainLayout } from "@/layout"
import { useState } from "react"

const VehicleDetail = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false)

  return (
    <section className="vehicle-detail-container">
      <div className="vehicle__detail content-container">
        <h1 className="vehicle__detail-heading page-heading">
          VOLKSWAGEN POLO
        </h1>

        <div className="vehicle__form">
          <VehicleForm />
        </div>

        <div className="vehicle__detail-actions">
          <button
            onClick={() => setShowAlert(true)}
            className="vehicle__detail-actions-delete-btn"
          >
            xóa phương tiện
          </button>
        </div>
      </div>

      {showAlert ? (
        <AlertScreen
          onClose={() => setShowAlert(false)}
          title="Bạn có chắc chắn muốn xóa phương tiện này?"
          btnLabel="Xóa phương tiện"
        />
      ) : null}
    </section>
  )
}

VehicleDetail.Layout = MainLayout
export default VehicleDetail
