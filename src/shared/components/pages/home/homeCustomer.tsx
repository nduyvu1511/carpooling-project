/* eslint-disable @next/next/no-img-element */
import { logoIcon } from "@/assets"
import { RidesSearchForm, RidesItem } from "@/components"
import { HeaderAccount } from "@/components/header/headerAccount"
import { RootState } from "@/core/store"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { HomeNav } from "@/components"
import Link from "next/link"
import { headerNavs } from "@/helper"

export const HomeCustomer = () => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.user)

  return (
    <section className="home-customer__container">
      <header className="home-customer__header px-24">
        <div className="container">
          <div className="home-customer__header__inner">
            <div className="home-customer__header-top">
              <div className="home-customer__header-logo">
                <Link passHref href="/">
                  <div className="cursor-pointer">{logoIcon()}</div>
                </Link>
              </div>

              <div className="home-customer__header-user">
                <HeaderAccount />
              </div>
            </div>

            <div className="home-customer__header-content">
              <HomeNav />
              {/* <div className="home-customer__header-navs">
                {headerNavs.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => router.push(item.path)}
                    className="home-customer__nav-item cursor-pointer"
                  >
                    {item.icon}
                    <a className="home-customer__nav-item-label">
                      {item.label}
                    </a>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </header>

      <div className="home-customer__content">
        <div className="container">
          <div className="home-customer__form">
            <RidesSearchForm />
          </div>
          <div className="home-customer__rides grid grid-col-1 grid-col-sm-2 grid-col-lg-4">
            <RidesItem />
            <RidesItem />
            <RidesItem />
            <RidesItem />
            <RidesItem />
            <RidesItem />
          </div>
        </div>
      </div>
    </section>
  )
}
