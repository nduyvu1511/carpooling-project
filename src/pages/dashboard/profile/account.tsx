import { arrowRightIcon } from "@/assets"
import { ProfileContainer } from "@/container"
import { dashboardAccounts } from "@/helper"
import { MainNoFooter } from "@/layout"
import { useRouter } from "next/router"

const Account = () => {
  const router = useRouter()

  return (
    <ProfileContainer>
      <div className="profile__account">
        <ul className="profile__account-list">
          {dashboardAccounts.map((item) => (
            <li
              onClick={() => router.push(item.path)}
              key={item.path}
              className="profile__account-list-item"
            >
              <a className="profile__account-list-item-link">{item.name}</a>

              {arrowRightIcon()}
            </li>
          ))}

          <li className="profile__account-list-item profile__account-list-item-primary">
            <a className="profile__account-list-item-link">Đăng xuất</a>
          </li>
          {/* <li className="profile__account-list-item profile__account-list-item-primary">
            <a className="profile__account-list-item-link">Đóng tài khoản</a>
          </li> */}
        </ul>
      </div>
    </ProfileContainer>
  )
}

Account.Layout = MainNoFooter
export default Account
