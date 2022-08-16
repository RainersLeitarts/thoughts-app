import add from '../public/images/add.png'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Navbar.module.css'
import { AuthContext } from '../context/auth'

const Navbar = () => {
  const context = useContext(AuthContext)
  const router = useRouter()

  const onClick = (e) => {
    if (!context.user) {
      router.push('/authorize')
    }
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.content}>
        <div className={styles.logo}>ThinkAboutIt</div>
        <div className={styles.links}>
          <button onClick={onClick} className={styles.createThoughtButton}>
            <div className={styles.addImg} style={{ backgroundImage: `url(${add.src})` }} />
            Add thought
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar