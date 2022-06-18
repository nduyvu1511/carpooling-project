import { headerNavs } from "@/helper"
import { useRouter } from "next/router"

export const HomeNav = () => {
  const router = useRouter()

  return (
    <ul className="home-mobile__nav">
      {headerNavs.map((item) => (
        <li key={item.path} className="home-mobile__nav-item">
          <div
            onClick={() => router.push(item.path)}
            className="nav__item cursor-pointer"
          >
            <div className="nav__item-icon">{item.icon}</div>
            <span className="nav__item-title">{item.label}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
