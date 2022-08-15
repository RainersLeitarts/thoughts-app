import styles from '../styles/Layout.module.css'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className={styles.layout}>
        {children}
      </div>
    </>
  )
}

export default Layout