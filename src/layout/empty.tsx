import { LayoutProps } from "@/models/common"
import React from "react"
import { App } from "./app"
import { ModalContainer } from "@/container"

export const EmptyLayout = ({ children }: LayoutProps) => {
  return (
    <App>
      <>{children}</>
      <ModalContainer />
    </App>
  )
}
