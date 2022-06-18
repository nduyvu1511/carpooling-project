import { useRouter } from "next/router"
import { useMemo } from "react"
import { AiOutlineMessage } from "react-icons/ai"
import { BiCalendar, BiMerge, BiSearch } from "react-icons/bi"
import { MdOutlineAccountCircle, MdOutlineExplore } from "react-icons/md"

export const BottomNavigation = () => {
  const router = useRouter()

  const navs = useMemo(
    () => [
      {
        path: "/",
        label: "Trang chủ",
        icon: <MdOutlineExplore />,
        isActive: router.pathname === "/",
      },

      {
        path: "/search",
        label: "Tìm kiếm",
        icon: <BiSearch />,
        isActive: router.pathname === "/search",
      },
      {
        path: "/activities",
        label: "Hoạt động",
        icon: <BiCalendar />,
        isActive: router.pathname === "/activities",
      },
      {
        path: "/chat",
        label: "Tin nhắn",
        icon: <AiOutlineMessage />,
        isActive: router.pathname === "/chat",
      },
      {
        path: "/dashboard/profile/menu",
        label: "Tài khoản",
        icon: <MdOutlineAccountCircle />,
        isActive: router.pathname === "/dashboard/profile/menu",
      },
    ],
    [router.pathname]
  )

  return (
    <div className="nav__bottom px-24">
      <ul className="nav__bottom-list">
        {navs.map((item) => (
          <li
            onClick={() => router.push(item.path)}
            key={item.path}
            className={`nav__bottom-list-item ${
              item.isActive ? "nav__bottom-list-item-active" : ""
            }`}
          >
            <div className="nav__bottom-item">
              {item.icon}
              <span className="nav__bottom-item-label">{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
