import add from '../public/images/add.png'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Navbar.module.css'
import { AuthContext } from '../context/auth'
import login from '../public/images/login.png'
import logout from '../public/images/logout.png'

const Navbar = () => {
  const context = useContext(AuthContext)
  const router = useRouter()

  const onClick = () => {
    console.log('here')
    if (context.user === null) {
      router.push('/authorize')
    }else{
      router.push('/add_thought')
    }
  }

  const handleAuthorize = () => {
    if (!context.user) {
      router.push('/authorize')
    }else{
      confirm('Are You sure you want to log out?') && context.logout()
    }
  }

//

  return (
    <div className={styles.navbar}>
      <div className={styles.content}>
        <div className={styles.logo}>ThinkAboutIt</div>
        <div className={styles.links}>
          <button onClick={onClick} className={styles.createThoughtButton}>
            <div className={styles.addImg} style={{ backgroundImage: `url(${add.src})` }} />
            Add thought
          </button>
          <div onClick={handleAuthorize} style={{backgroundImage: `url(${context.user ? logout.src : login.src})`}} className={styles.authorization} />
        </div>
      </div>
    </div>
  )
}

export default Navbar