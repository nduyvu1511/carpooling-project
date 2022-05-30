import { ReactNode } from "react"

interface TagProps {
  label: string
  value: number
  onClick?: (id: number) => void
  active?: boolean
  disabled?: boolean
  size?: "s" | "m" | "l"
  icon?: ReactNode
}

export const Tag = ({
  label,
  onClick,
  value,
  active,
  disabled,
  size,
  icon,
}: TagProps) => {
  return (
    <span
      onClick={() => onClick && onClick(value)}
      className={`tag ${active ? "tag-active" : ""} ${
        disabled ? "tag-disabled" : ""
      } tag-${size}`}
    >
      {icon || null}
      {label}
    </span>
  )
}
