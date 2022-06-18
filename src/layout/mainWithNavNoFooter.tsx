import { BottomNavigation, Header } from "@/components"
import { ModalContainer } from "@/container"
import { LayoutProps } from "@/models"
import { App } from "./app"

export const MainlayoutWithNavNoFooter = ({ children }: LayoutProps) => {
  return (
    <section className="main-with-navigation">
      <App>
        <Header />
        <main className="main-with-navigation">{children}</main>
        <ModalContainer />
        <BottomNavigation />
      </App>
    </section>
  )
}
