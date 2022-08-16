import styles from '../styles/ThoughtCard.module.css'
import like from '../public/images/like.png'
import { useContext } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import liked from '../public/images/liked.png'
import comment from '../public/images/comment.png'
import { AuthContext } from '../context/auth'

const ThoughtCard = ({ thought: { id, body, username, likeCount, commentCount, likes } }) => {
    const context = useContext(AuthContext)

    const likeIds = likes?.map(like => like.username)
   
    console.log("ID: "+ id)
   
    const [likeThought, { loading: loading2 }] = useMutation(TOGGLE_LIKE_QUERY, {
        onError(err) {
            console.log(err)
            
        },
        variables: {
            thoughtId: id
        }
    })

    const likeHandler = () => {
        likeThought()
    }

    return (
        <div className={styles.card}>
            <p className={styles.text}>{body}</p>
            <div className={styles.bottomInfo}>
                <div onClick={likeHandler} className={styles.reactionContainer}>
                    <div className={styles.reactionImg} style={{ backgroundImage: `url(${likeIds.includes(context?.user?.username) ? liked.src : like.src})` }} />
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

const TOGGLE_LIKE_QUERY = gql`
    mutation toggleLike(
            $thoughtId: String!
        ) {
            likeThought(
                thoughtId: $thoughtId
            ){
            id
            body
            username
            likes {
                id
                username
            }
        }
    }
`