
import * as React from 'react';
import '../styles/globals.css'
import Layout from '../components/Layout'
import Router from 'next/router'
NProgress.configure({ showSpinner: false });
import NProgress from 'nprogress'
function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false)

  Router.events.on('routeChangeStart', (url) => {
    NProgress.start()
    // console.log('changing')
    setLoading(true)
  })
  Router.events.on('routeChangeComplete', (url) => {
    NProgress.done()
    // console.log('complete')

    setLoading(false)
  })
  return (<>

    <Layout >
      <Component  {...pageProps} />
    </Layout>
  </>)
}

export default MyApp
