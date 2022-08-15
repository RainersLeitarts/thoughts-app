import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.content}>
        <div className={styles.logo}>ThinkAboutIt</div>
        <div className={styles.links}></div>
      </div>
    </div>
  )
}

export default Navbar