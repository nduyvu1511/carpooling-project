import { arrowRightIcon } from "@/assets"
import { headerUserOptions } from "@/helper"
import { useRouter } from "next/router"
import React from "react"

export const Navigation = () => {
  const router = useRouter()

  return (
    <ul className="navigation">
      <li className="navigation-item navigation-item-sm">
        <div
          onClick={() => {
            router.push("/login")
          }}
          className="navigation-item-link"
        >
          <span className="navigation-item-title">Đăng nhập</span>
          {arrowRightIcon()}
        </div>
      </li>

      <li className="navigation-item navigation-item-sm">
        <div
          onClick={() => {
            router.push("/register")
          }}
          className="navigation-item-link"
        >
          <span className="navigation-item-title">Đăng ký</span>
          {arrowRightIcon()}
        </div>
      </li>

      {headerUserOptions.map((item) => (
        <li key={item.name} className="navigation-item">
          <div
            onClick={() => (item?.path ? router.push(item.path) : null)}
            className="navigation-item-link"
          >
            {item.icon}
            <span className="navigation-item-title">{item.name}</span>
            {arrowRightIcon()}
          </div>
        </li>
      ))}

      <li className="show-on-tablet navigation-item navigation-item-sm">
        <h3 className="navigation-item-heading">Chọn kiều di chuyển</h3>
      </li>

      <li className="show-on-tablet navigation-item navigation-item-sm">
        <div onClick={() => {}} className="navigation-item-link">
          <span className="navigation-item-title">Một chiều</span>
          {arrowRightIcon()}
        </div>
      </li>

      <li className="show-on-tablet navigation-item navigation-item-sm">
        <div onClick={() => {}} className="navigation-item-link">
          <span className="navigation-item-title">Hai chiều</span>
          {arrowRightIcon()}
        </div>
      </li>

      <li className="show-on-tablet navigation-item navigation-item-sm">
        <div onClick={() => {}} className="navigation-item-link">
          <span className="navigation-item-title">Ba chiều</span>
          {arrowRightIcon()}
        </div>
      </li>
    </ul>
  )
}
