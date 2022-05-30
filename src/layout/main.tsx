import { Footer, Header } from "@/components"
import { ModalContainer } from "@/container"
import { LayoutProps } from "@/models"
import { App } from "./app"

export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <App>
      <Header />
      <main>{children}</main>
      <Footer />
      <ModalContainer />
    </App>
  )
}
