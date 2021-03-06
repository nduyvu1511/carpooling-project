import { arrowRightIcon } from "@/assets"
import { RootState } from "@/core/store"
import { dashboardAccounts } from "@/helper"
import { MainlayoutWithNavNoFooter } from "@/layout"
import { API_URL } from "@/services"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useLogout, useToken } from "shared/hook"

const MenuProfile = () => {
  const router = useRouter()
  const { handleLogout } = useLogout()
  const { token } = useToken()
  const { userInfo } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (!token) router.push("/")
  }, [token, router])

  if (!userInfo) return null

  return (
    <div className="content-container">
      <div className="profile__menu">
        <div className="profile__menu__user">
          <div
            onClick={() => router.push("/dashboard/profile/info")}
            className="profile__menu__user-top cursor-pointer"
          >
            <div className="profile__menu__user-info">
              <p className="profile__menu__user-info-name">
                {userInfo?.partner_name}
              </p>
              <p className="profile__menu__user-info-desc">
                {userInfo?.description}
              </p>
            </div>
            <div className="profile__menu__user-avatar">
              <div className="image-container">
                <Image
                  src={`${API_URL}${userInfo?.avatar_url?.image_url || ""}`}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              {arrowRightIcon()}
            </div>
          </div>

          <div className="profile__menu__user-bottom">
            <div className="profile__menu-actions">
              {/* <Link href="/dashboard/profile/picture" passHref>
                <div className="profile__menu-actions-item">
                  {addCircleIcon(24, PRIMARY_COLOR)}
                  <span>Th??m ???nh h??? s??</span>
                </div>
              </Link> */}
              <div
                onClick={() => router.push("/dashboard/profile/info")}
                className="profile__menu-actions-item"
              >
                <span>Ch???nh s???a h??? s??</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile__account">
        <ul className="profile__account-list">
          {dashboardAccounts.map((item) => (
            <li
              onClick={() => router.push(item.path)}
              key={item.path}
              className="profile__account-list-item"
            >
              {item.icon}

              <a className="profile__account-list-item-link">{item.name}</a>

              {arrowRightIcon()}
            </li>
          ))}

          <li className="profile__account-list-item profile__account-list-item-primary">
            <button
              onClick={() => handleLogout()}
              className="profile__account-list-item-link btn-reset"
            >
              ????ng xu???t
            </button>
          </li>
          {/* <li className="profile__account-list-item profile__account-list-item-primary">
            <a className="profile__account-list-item-link">????ng t??i kho???n</a>
          </li> */}
        </ul>
      </div>
    </div>
  )
}

MenuProfile.Layout = MainlayoutWithNavNoFooter

export default MenuProfile
