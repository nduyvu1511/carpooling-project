/* eslint-disable @next/next/no-img-element */
import { HomeCustomer } from "@/components/pages"
import { useRouter } from "next/router"

const Home = () => {
  const router = useRouter()

  return <HomeCustomer />
}

// Home.Layout = MainlayoutWithNavigation

export default Home
