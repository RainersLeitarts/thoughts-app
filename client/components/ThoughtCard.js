import styles from '../styles/ThoughtCard.module.css'
import like from '../public/images/like.png'
import liked from '../public/images/liked.png'
import comment from '../public/images/comment.png'

const ThoughtCard = ({ thought: { body, username, likeCount, commentCount } }) => {
    return (
        <div className={styles.card}>
            <p className={styles.text}>{body}</p>
            <div className={styles.bottomInfo}>
                <div className={styles.reactionContainer}>
                    <div className={styles.reactionImg} style={{ backgroundImage: `url(${like.src})` }} />
                    {likeCount}
                </div>
                <div className={styles.reactionContainer}>
                    <div className={styles.reactionImg} style={{ backgroundImage: `url(${comment.src})` }} />
                    {commentCount}
                </div>
                <div>by: {username}</div>
            </div>
        </div>
    )
}

export default ThoughtCard