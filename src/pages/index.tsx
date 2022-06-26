/* eslint-disable @next/next/no-img-element */
import { HomeCustomer, HomeDriver, HomeGuest } from "@/components/pages"
import { MainLayout } from "@/layout"
import { useAuthorization } from "shared/hook"

const Home = () => {
  const { role } = useAuthorization()

  return (
    <>
      {role === "car_driver" ? (
        <HomeDriver />
      ) : role === "customer" ? (
        <HomeCustomer />
      ) : (
        <HomeGuest />
      )}
    </>
  )
}

export default Home
