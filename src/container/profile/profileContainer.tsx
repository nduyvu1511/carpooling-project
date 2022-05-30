import { Tabs } from "@/components"
import { useRouter } from "next/router"
import React, { ReactNode } from "react"

interface ProfileContainerProps {
  children: ReactNode
}

export const ProfileContainer = ({ children }: ProfileContainerProps) => {
  const router = useRouter()

  return (
    <section className="profile-container">
      <Tabs
        list={[
          { path: "/dashboard/profile/menu", name: "Về tôi" },
          { path: "/dashboard/profile/account", name: "Tài khoản" },
        ]}
      />

      <div className="content-container profile-body">{children}</div>
    </section>
  )
}
