import '../styles/globals.scss'
import { wrapper } from '../store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore } from 'react-redux'
import { Provider } from 'react-redux'
import Head from 'next/head'

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props

  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={null}>
        <>
          <Head>
            <meta charSet='utf-8' />
          </Head>
          <Component {...pageProps} />
        </>
      </PersistGate>
    </Provider>
  )
}
export default MyApp
