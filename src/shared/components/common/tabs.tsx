import { useRouter } from "next/router"

interface TabsProps {
  list: {
    name: string
    path: string
  }[]
}

export const Tabs = ({ list }: TabsProps) => {
  const router = useRouter()

  return (
    <ul className="tabs">
      {list.map((item) => (
        <li
          key={item.path}
          onClick={() => router.push(item.path)}
          className={`tabs-item ${
            router.pathname === item.path ? "tabs-item-active" : ""
          }`}
        >
          <a>{item.name}</a>
        </li>
      ))}
    </ul>
  )
}
