import { logoIcon, logoSmIcon } from "@/assets"
import { headerNavs, HEADER_HEIGHT } from "@/helper"
import Link from "next/link"
import { useRouter } from "next/router"
import { useScrollTop } from "shared/hook"
import { HeaderAccount } from "./headerAccount"

export const Header = () => {
  const router = useRouter()
  const height = useScrollTop()

  return (
    <div className={`header ${height > HEADER_HEIGHT ? "header-active" : ""}`}>
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

            {/* <ul className="header__nav-list">
              {navLinks.map((item) => (
                <li key={item.path} className="header__nav-list-item">
                  <a className="header__nav-list-item-link" href={item.path}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul> */}
          </div>
          <div className="header__inner-right">
            <div className="header__actions">
              {headerNavs.map((item, index) => (
                <div
                  key={index}
                  onClick={() => router.push(item.path)}
                  className="header__actions-item header__actions-item--hide"
                >
                  {item.icon}
                  <span className="header__actions-item-text">
                    {item.label}
                  </span>
                </div>
              ))}
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
