import styles from '../styles/ThoughtCard.module.css'
import like from '../public/images/like.png'
import { useContext } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import liked from '../public/images/liked.png'
import comment from '../public/images/comment.png'
import deleteImg from '../public/images/delete.png'
import { AuthContext } from '../context/auth'

const ThoughtCard = ({ thought: { id, body, username, likeCount, commentCount, likes } }) => {
    const context = useContext(AuthContext)
    const router = useRouter()

    //likes.find
    const likeIds = likes?.map(like => like.username)


    const [likeThought, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
        onError(err) {
            console.log(err)
        },
        variables: {
            thoughtId: id
        }
    })

    const [deleteThought] = useMutation(DELETE_THOUGHT_MUTATION, {
        update(proxy){
            const data = proxy.readQuery({
                query: FETCH_THOUGHTS_QUERY
            })
            proxy.writeQuery(
                {
                    query: FETCH_THOUGHTS_QUERY,
                    data: {
                        getThoughts: data.getThoughts.filter(thought => thought.id !== id)
                    }
                }
            )
        },
        variables: {
            thoughtId: id
        }
    })

    const likeHandler = (e) => {
        e.stopPropagation()

        if(!context.user){
            router.push('/authorize')
            return
        }

        likeThought()
    }

    const deleteHandler = (e) => {
        e.stopPropagation()
        if(confirm('Are you sure you want to delete this thought?')){
            deleteThought()
            router.push(`/`)
        }
    }

    const handleRouteChange = (e) => {
        router.push(`/${id}`)
    }


    return (
        <div onClick={handleRouteChange} className={styles.card}>
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
                {context.user && context.user?.username === username && (
                    <div onClick={deleteHandler} className={styles.reactionContainer}>
                        <div className={styles.reactionImg} style={{ backgroundImage: `url(${deleteImg.src})` }} />
                    </div>
                )}
                <div>by: {username}</div>
            </div>
        </div>
    )
}

export default ThoughtCard

const TOGGLE_LIKE_MUTATION = gql`
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
            likeCount
        }
    }
`

const DELETE_THOUGHT_MUTATION = gql`
    mutation deleteThought($thoughtId: ID!){
        deleteThought(thoughtId: $thoughtId)
    }
`

const FETCH_THOUGHTS_QUERY = gql`
  {
    getThoughts {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        id
        createdAt
        username
      }
    }
  }
`