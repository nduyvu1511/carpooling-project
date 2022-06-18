import { arrowRightIcon, logoIcon } from "@/assets"
import { SuccessScreen } from "@/components"
import { RootState } from "@/core/store"
import { driverFormFields, isObjectHasValue } from "@/helper"
import { FilledDataFieldsKey } from "@/models"
import { clearRegisterData, setToken } from "@/modules"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import { useFetchFilledDataFields, useToken } from "shared/hook"

const DriverInfo = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { verifiedRegisterToken, carAccountType } = useSelector(
    (state: RootState) => state.auth
  )
  const { data } = useFetchFilledDataFields()
  const { token } = useToken()

  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>()

  const filledDataLength = useMemo(() => {
    if (!data || !isObjectHasValue(data)) return 0

    return (
      Object.keys(data).reduce(
        (a, b) => a + (data?.[b as FilledDataFieldsKey] ? 1 : 0),
        0
      ) || 0
    )
  }, [data])

  const isFilledAllData = useMemo(() => {
    return filledDataLength === Object.keys(data || {}).length
  }, [data, filledDataLength])

  const handleCreateDriverForm = () => {
    if (!isFilledAllData) {
      dispatch(notify("Vui lòng nhập đầy đủ thông tin để tiếp tục", "warning"))
      return
    }
    setShowSuccessScreen(true)
    dispatch(clearRegisterData())
  }

  useEffect(() => {
    if (!router?.query) return
    if (router.query?.type === "register") {
      if (!verifiedRegisterToken || !carAccountType) {
        router.push("/register")
      }
    } else {
      if (!token) router.push("/")
    }
  }, [token, verifiedRegisterToken, router, carAccountType])

  useEffect(() => {
    if (!verifiedRegisterToken) return
    if (!router?.query || router.query?.type !== "register") return
    if (!token) {
      dispatch(setToken(verifiedRegisterToken))
    }
  }, [router, verifiedRegisterToken, token, dispatch])

  console.log(filledDataLength)

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
          <div
            style={{
              width:
                (filledDataLength / Object.keys(data || {}).length) * 100 + "%",
            }}
            className="driver__page-status-inner"
          ></div>
        </div>

        <div className="driver__page-body">
          {driverFormFields.map((parent, index) => (
            <div key={index} className="driver__page-body-item">
              <h3 className="driver__body-heading px-24">{parent.heading}</h3>
              <ul className="driver__body-list">
                {parent?.child?.length > 0 &&
                  parent.child.map((child, index) => (
                    <li
                      onClick={() =>
                        router.push(`/register/driver/${child.route}`)
                      }
                      key={index}
                      className="driver__body-list-item px-24"
                    >
                      <p className="driver__body-list-item-name">
                        {child.label}
                      </p>
                      <p
                        className={`driver__body-list-item-noti ${
                          data?.[child.name]
                            ? "driver__body-list-item-noti-success"
                            : ""
                        }
                        } ${
                          !child.isRequired
                            ? "driver__body-list-item-noti-no-required"
                            : ""
                        }`}
                      >
                        {data?.[child.name]
                          ? "Đã hoàn tất"
                          : child.isRequired
                          ? "Bắt buộc"
                          : "Không băt buộc"}
                        {arrowRightIcon(24)}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="driver__page-footer">
          <button
            onClick={handleCreateDriverForm}
            className={`btn-primary ${
              !isFilledAllData ? "btn-not-allowed" : ""
            }`}
          >
            Gửi hồ sơ
          </button>
        </div>
      </div>

      {showSuccessScreen ? (
        <SuccessScreen
          title="Chúc mừng bạn đã hoàn thành hồ sơ đăng ký trở thành tài xế tại exxe, hồ sơ của bạn sẽ được xét duyệt và chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất"
          onClick={() => router.push("/")}
          btnLabel="Về Trang Chủ"
        />
      ) : null}
    </div>
  )
}

export default DriverInfo
