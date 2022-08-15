import styles from '../styles/ThoughtCard.module.css'

const ThoughtCard = ({thought: {body}}) => {
    console.log(body)
    return (
        <div className={styles.card}>

            {/* <div>here: {createdAt}</div>
            <div>by: {username}</div>
            <div>Likes: {likeCount}</div>
            <div>Comments: {commentCount}</div> */}
        </div>
    )
}

export default ThoughtCard