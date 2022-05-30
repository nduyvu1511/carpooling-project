import { arrowUpIcon, blankAvatar } from "@/assets"
import { toggleHTMLOverflow } from "@/helper"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useRef, useState } from "react"
import { useTransition, animated } from "react-spring"
import { useClickOutside } from "shared/hook"
import { Menu } from "../menu"
import { Navigation } from "./navigation"

const HeaderAccount = () => {
  const router = useRouter()
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
    toggleHTMLOverflow("unset")
    setShowOption(false)
  })

  useClickOutside([optionSmRef], () => {
    toggleHTMLOverflow("unset")
    setShowNav(false)
  })

  return (
    <>
      <div
        ref={optionRef}
        onClick={() => {
          setShowOption(!showOption)
          !showOption
            ? toggleHTMLOverflow("hidden")
            : toggleHTMLOverflow("unset")
        }}
        className="header__account__option"
      >
        <p className="header__account__option-name">{"Nduyvu"}</p>
        <div className="header__account__option-avatar image-container">
          <Image src={blankAvatar} objectFit="cover" layout="fill" alt="" />
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
            <animated.div style={{ ...style }}>
              <Menu width={400}>
                <Navigation />
              </Menu>
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
          !showNav ? toggleHTMLOverflow("hidden") : toggleHTMLOverflow("unset")
        }}
        className="header__account__option-sm"
      >
        <p className="header__account__option-name">{"Nduyvu"}</p>
        <div className="header__account__option-avatar image-container">
          <Image src={blankAvatar} objectFit="cover" layout="fill" alt="" />
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
