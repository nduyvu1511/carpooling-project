import { addCircleIcon, arrowRightIcon } from "@/assets"
import { Modal, UserForm } from "@/components"
import { ProfileContainer } from "@/container"
import { PRIMARY_COLOR } from "@/helper"
import { MainlayoutWithNavNoFooter } from "@/layout"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const MenuProfile = () => {
  const [showUserForm, setShowUserForm] = useState<boolean>()
  const router = useRouter()

  return (
    <>
      <ProfileContainer>
        <div className="profile__menu">
          <div className="profile__menu__user">
            <div
              onClick={() => setShowUserForm(true)}
              className="profile__menu__user-top"
            >
              <div className="profile__menu__user-info">
                <p className="profile__menu__user-info-name">Nduyvu</p>
                <p className="profile__menu__user-info-desc">
                  This is description
                </p>
              </div>
              <div className="profile__menu__user-avatar">
                <div className="image-container">
                  <Image
                    src={
                      "https://cf.shopee.vn/file/09b9fbc2a9d3473a63969c2fc18a1c65_tn"
                    }
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
                <Link href="/dashboard/profile/picture" passHref>
                  <div className="profile__menu-actions-item">
                    {addCircleIcon(24, PRIMARY_COLOR)}
                    <span>Thêm ảnh hồ sơ</span>
                  </div>
                </Link>
                <div
                  onClick={() => setShowUserForm(true)}
                  className="profile__menu-actions-item"
                >
                  <span>Chỉnh sửa hồ sơ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile__menu__item profile__menu__verify">
            <h3 className="profile__menu-heading">Xác thực người dùng</h3>
            <ul className="profile__menu-list">
              <li className="profile__menu-list-item">
                {addCircleIcon(24, "#0BB2F5")}
                <Link href="/verify-id">
                  <a className="profile__menu-list-item-text">Xác thực ID</a>
                </Link>
              </li>

              <li className="profile__menu-list-item">
                {addCircleIcon(24, "#0BB2F5")}
                <Link href="/verify-id">
                  <a className="profile__menu-list-item-text">
                    Xác thực email duyvujarvan4@gmail.com
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="profile__menu__item profile__menu__vehicles">
            <h3 className="profile__menu-heading">Phương tiện</h3>
            <ul className="profile__menu-list">
              <li
                onClick={() => router.push("/dashboard/profile/vehicle/id")}
                className="vehicle__item px-24"
              >
                <div className="vehicle__item-info">
                  <a>FORD</a>
                </div>
                <span>{arrowRightIcon()}</span>
              </li>

              <li className="profile__menu-list-item">
                <Link href="/dashboard/profile/vehicle/brand">
                  {addCircleIcon(24, PRIMARY_COLOR)}
                </Link>
                <Link href="/dashboard/profile/vehicle/brand">
                  <a className="profile__menu-list-item-text">
                    Thêm phương tiện
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </ProfileContainer>

      {showUserForm ? (
        <Modal
          headerChildren={<h1>Thông tin cá nhân</h1>}
          view="small"
          onClose={() => setShowUserForm(false)}
          mainChildren={<UserForm />}
        />
      ) : null}
    </>
  )
}

MenuProfile.Layout = MainlayoutWithNavNoFooter

export default MenuProfile
