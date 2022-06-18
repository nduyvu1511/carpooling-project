import { BottomNavigation, Footer, Header } from "@/components"
import { ModalContainer } from "@/container"
import { LayoutProps } from "@/models"
import { App } from "./app"

export const MainlayoutWithNavigation = ({ children }: LayoutProps) => {
  return (
    <section className="main-with-navigation">
      <App>
        <Header />
        <main className="main-with-navigation">{children}</main>
        <Footer />
        <ModalContainer />
        <BottomNavigation />
      </App>
    </section>
  )
}
