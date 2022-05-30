import { Header } from "@/components"
import { ModalContainer } from "@/container"
import { LayoutProps } from "@/models"
import { App } from "./app"

export const MainNoFooter = ({ children }: LayoutProps) => {
  return (
    <App>
      <Header />
      <main>{children}</main>
      <ModalContainer />
    </App>
  )
}
