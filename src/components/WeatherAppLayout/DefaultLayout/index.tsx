
import styles from './DefaultLayout.module.css'
import Header from '../Header'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'

const DefaultLayoutApp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.device_wrapper}>
        <div className={styles.main_app}>
            <div className={styles.header_device}>
                <Header/>
            </div>
            <div>
                <main className={styles.main_device}>
                    <Outlet/>
                </main>
            </div>
            <div className={styles.footer_device}>
            <Footer/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayoutApp
