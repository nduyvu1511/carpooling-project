/* eslint-disable @next/next/no-img-element */
import { pageNotFound } from "@/assets"
import { MainNoFooter } from "@/layout"
import Link from "next/link"

const NotFound = () => {
  return (
    <div className="container page-not-found">
      {pageNotFound}
      <h1 className="page-heading">Trang này không tồn tại.</h1>
      <Link href="/" passHref>
        <button className="btn-primary">Trở về trang chủ</button>
      </Link>
    </div>
  )
}

NotFound.Layout = MainNoFooter

export default NotFound
