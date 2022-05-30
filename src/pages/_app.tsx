import { EmptyLayout } from "@/layout"
import { persistor, store } from "core"
import Head from "next/head"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { SWRConfig } from "swr"
import { AppPropsWithLayout } from "../models"
import "../styles/index.scss"
import { NotificationsProvider } from "reapop"

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SWRConfig>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <Layout>
            <NotificationsProvider>
              <Component {...pageProps} />
            </NotificationsProvider>
          </Layout>
        </SWRConfig>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
