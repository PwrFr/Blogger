import * as React from 'react';
import '../styles/globals.css'
import Layout from '../components/Layout'
import Router from 'next/router'
NProgress.configure({ showSpinner: false });
import NProgress from 'nprogress'
import { motion } from 'framer-motion'
import Loader from '../components/Loader';
import { Box } from '@material-ui/core';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  p: 4,
  borderRadius: '0.5rem',

};

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
      {loading &&
        <Modal
          open={loading}
          // onClose={() => handleExpandClick(i)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Loader />
          </Box>
        </Modal>}
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
