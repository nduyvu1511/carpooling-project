import { addCircleIcon, logoIcon, logoSmIcon, searchIcon } from "@/assets"
import { navLinks } from "@/helper"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { HeaderAccount } from "./headerAccount"

export const Header = () => {
  const router = useRouter()

  return (
    <div className={`header`}>
      <div className="header-container">
        <div className="header__inner">
          <div className="header__account header__account-sm">
            <HeaderAccount />
          </div>

          <div className="header__inner-left">
            <div className="header__logo">
              <Link href="/" passHref>
                <div className="header__logo-wrapper">
                  <span className="hide-on-mobile"> {logoIcon()}</span>
                  <span className="show-on-mobile"> {logoSmIcon()}</span>
                  {/* <a>Carpooling</a> */}
                </div>
              </Link>
            </div>

            <ul className="header__nav-list">
              {navLinks.map((item) => (
                <li key={item.path} className="header__nav-list-item">
                  <a className="header__nav-list-item-link" href={item.path}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="header__inner-right">
            <div className="header__actions">
              <div
                onClick={() => router.push("/search")}
                className="header__actions-item"
              >
                {searchIcon(24, "#00AFF5")}
                <span className="header__actions-item-text">Tìm kiếm</span>
              </div>
              <div
                onClick={() => router.push("/offer-seats/departure")}
                className="header__actions-item"
              >
                {addCircleIcon(24, "#00AFF5")}
                <span className="header__actions-item-text">
                  Thêm chuyến đi
                </span>
              </div>
            </div>

            <div className="header__account header__account-lg">
              <HeaderAccount />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
