import { arrowUpIcon, blankAvatar } from "@/assets"
import { RootState } from "@/core/store"
import { toggleBodyOverflow } from "@/helper"
import { API_URL } from "@/services"
import Image from "next/image"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { animated, useTransition } from "react-spring"
import { useClickOutside } from "shared/hook"
import { Navigation } from "../navigation/navigation"

const HeaderAccount = () => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.user)

  const [showOption, setShowOption] = useState<boolean>(false)
  const [showNav, setShowNav] = useState<boolean>(false)
  const optionRef = useRef<HTMLDivElement>(null)
  const optionSmRef = useRef<HTMLDivElement>(null)

  const transition = useTransition(showOption, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  })

  useClickOutside([optionRef], () => {
    toggleBodyOverflow("unset")
    setShowOption(false)
  })

  useClickOutside([optionSmRef], () => {
    toggleBodyOverflow("unset")
    setShowNav(false)
  })

  return (
    <>
      <div
        ref={optionRef}
        onClick={() => {
          setShowOption(!showOption)
          !showOption
            ? toggleBodyOverflow("hidden")
            : toggleBodyOverflow("unset")
        }}
        className="header__account__option"
      >
        <p className="header__account__option-name">
          {userInfo?.partner_name || ""}
        </p>
        <div className="header__account__option-avatar image-container">
          <Image
            src={
              userInfo?.avatar_url
                ? `${API_URL}${userInfo.avatar_url?.image_url || ""}`
                : blankAvatar
            }
            objectFit="cover"
            layout="fill"
            alt=""
          />
        </div>
        <span
          className={`header__account__option-arrow ${
            showOption ? "header__account__option-arrow-active" : ""
          }`}
        >
          {arrowUpIcon()}
        </span>

        {transition((style, show) =>
          show ? (
            <animated.div
              className="menu"
              style={{ ...style, width: 400, backgroundColor: "#fff" }}
            >
              <Navigation />
            </animated.div>
          ) : null
        )}
      </div>

      {showNav ? (
        <div
          onClick={() => setShowNav(false)}
          className="drawer-mobile-overlay"
        ></div>
      ) : null}

      <div
        ref={optionSmRef}
        onClick={() => {
          setShowNav(!showNav)
          !showNav ? toggleBodyOverflow("hidden") : toggleBodyOverflow("unset")
        }}
        className="header__account__option-sm"
      >
        <p className="header__account__option-name">
          {userInfo?.partner_name || ""}
        </p>
        <div className="header__account__option-avatar image-container">
          <Image
            src={
              userInfo?.avatar_url
                ? `${API_URL}${userInfo.avatar_url?.image_url || ""}`
                : blankAvatar
            }
            objectFit="cover"
            layout="fill"
            alt=""
          />
        </div>
        <span
          className={`header__account__option-arrow ${
            showNav ? "header__account__option-arrow-active" : ""
          }`}
        >
          {arrowUpIcon()}
        </span>
        <div className={`drawer-left ${showNav ? "drawer-left-active" : ""}`}>
          <Navigation />
        </div>
      </div>
    </>
  )
}

export { HeaderAccount }
