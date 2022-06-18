import { BottomNavigation } from "@/components"
import { ModalContainer } from "@/container"
import { LayoutProps } from "@/models"
import { App } from "./app"

export const MobileLayout = ({ children }: LayoutProps) => {
  return (
    <section className="mobile-layout">
      <App>
        <main className="mobile-layout">{children}</main>
        <ModalContainer />
        <BottomNavigation />
      </App>
    </section>
  )
}
