import { arrowRightIcon, logoIcon } from "@/assets"
import { RootState } from "@/core/store"
import { driverFormFields, isObjectHasValue } from "@/helper"
import { useRouter } from "next/router"
import React from "react"
import { useSelector } from "react-redux"

const DriverInfo = () => {
  const driverForm = useSelector((state: RootState) => state.driverForm)
  const router = useRouter()

  return (
    <div className="driver__page">
      <div className="driver__page-inner content-container">
        <div className="mx-24 driver__page-header">
          {logoIcon()}
          <p className="driver__page-header-desc">
            Vui lòng hoàn thành mẫu đơn đăng ký để bắt đầu lái xe
          </p>
        </div>

        <div className="driver__page-status mx-24">
          <div className="driver__page-status-inner"></div>
        </div>

        <div className="driver__page-body">
          

          {driverFormFields.map((parent, index) => (
            <div key={index} className="driver__page-body-item">
              <h3 className="driver__body-heading px-24">{parent.heading}</h3>
              <ul className="driver__body-list">
                {parent?.child?.length > 0 &&
                  parent.child.map((child, index) => (
                    <li
                      onClick={() => router.push(child.route)}
                      key={index}
                      className="driver__body-list-item px-24"
                    >
                      <p className="driver__body-list-item-name">
                        {child.label}
                      </p>
                      <p
                        className={`driver__body-list-item-noti ${
                          isObjectHasValue(!driverForm?.[child.key])
                            ? "driver__body-list-item-noti-success"
                            : ""
                        } ${
                          !child.isRequired
                            ? "driver__body-list-item-no-required"
                            : ""
                        }`}
                      >
                        {child.isRequired ? "Bắt buộc" : "Không băt buộc"}
                        {arrowRightIcon(24)}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          <div className="driver__page-body-item">
            <h3 className="driver__body-heading px-24">Thông tin cá nhân</h3>
            <ul className="driver__body-list">
              <li className="driver__body-list-item px-24">
                <p className="driver__body-list-item-name">Hình xe</p>
                <p className="driver__body-list-item-noti driver__body-list-item-noti-success driver__body-list-item-no-required">
                  Bắt buộc
                  {arrowRightIcon(24)}
                </p>
              </li>

              <li className="driver__body-list-item px-24">
                <p className="driver__body-list-item-name">Giấy đăng ký xe</p>
                <p className="driver__body-list-item-noti driver__body-list-item-noti-success driver__body-list-item-no-required">
                  Bắt buộc
                  {arrowRightIcon(24)}
                </p>
              </li>

              <li className="driver__body-list-item px-24">
                <p className="driver__body-list-item-name">Bảo hiểm xe</p>
                <p className="driver__body-list-item-noti driver__body-list-item-noti-success driver__body-list-item-no-required">
                  Bắt buộc
                  {arrowRightIcon(24)}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="driver__page-footer">
          <button className="btn-primary">Gửi hồ sơ</button>
        </div>
      </div>
    </div>
  )
}

export default DriverInfo
