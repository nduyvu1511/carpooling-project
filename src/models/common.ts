import { NextPage } from "next"
import { AppProps } from "next/app"
import { ReactChild, ReactElement, ReactNode } from "react"

export interface HasChildren {
  children: ReactChild
}

export interface LayoutProps {
  children: ReactNode
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export interface PayloadBoolean {
  payload: boolean
}

export interface PayloadString {
  payload: string
}

export interface PayloadNumber {
  payload: number
}

export interface CommonSlice {
  isOpenSearchModal: boolean | undefined
  isScreenLoading: boolean
  isOpenPromotionModal: boolean
}
