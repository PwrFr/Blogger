import * as React from 'react';
import '../styles/globals.css'
import Layout from '../components/Layout'
import Router from 'next/router'
NProgress.configure({ showSpinner: false });
import NProgress from 'nprogress'
import { motion } from 'framer-motion'


function MyApp({ Component, pageProps, router }) {
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
  return (
    <Layout >

      <motion.div key={router.route} initial='pageInitial' animate='pageAnimate' variants={{
        pageInitial: {
          opacity: 0,
          y: '100vh'
        },
        pageAnimate: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            delay: 0.5
          }
        }
      }}>

        <Component  {...pageProps} />
      </motion.div>
    </Layout>

  )
}

export default MyApp
