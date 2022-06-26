/* eslint-disable @next/next/no-img-element */
import { Header } from "@/components"
import { RootState } from "@/core/store"
import { MainLayout } from "@/layout"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

export const HomeGuest = () => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.user)

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="container">
        <h1 className="page-heading">
          Hãy tưởng tượng đây là trang Home cho khách hành chưa đăng nhập
        </h1>

        <br />

        <div style={{ display: "flex", justifyContent: "center" }} className="content-container">
          <button
            onClick={() => router.push("/login")}
            className="btn-primary"
            style={{ marginRight: 10 }}
          >
            Đăng nhập
          </button>
          <button onClick={() => router.push("/register")} className="btn-primary">
            Đăng ký
          </button>
        </div>
      </div>
    </>
  )
}

HomeGuest.Layout = MainLayout
