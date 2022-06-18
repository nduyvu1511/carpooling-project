import { ModalContainer } from "@/container"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import { useSelector } from "react-redux"
import { useToken } from "shared/hook"
import { RootState } from "../core"
import { App } from "./app"

export const DriverLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { token } = useToken()
  const { verifiedRegisterToken } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    if (!token) {
      if (!verifiedRegisterToken) {
        router.push("/register/driver")
      }
    }
  }, [token, verifiedRegisterToken])

  return (
    <App>
      {children}
      <ModalContainer />
    </App>
  )
}
