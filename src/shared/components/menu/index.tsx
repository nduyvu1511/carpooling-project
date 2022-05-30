import { ReactNode } from "react"

interface MenuProps {
  width?: number
  children: ReactNode
  className?: string
}

export const Menu = ({ width, children, className = "" }: MenuProps) => {
  return (
    <div style={{ width }} className={`menu ${className}`}>
      {children}
    </div>
  )
}
