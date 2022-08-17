import { useRouter } from 'next/router'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import Layout from '../components/Layout'
import ThoughtCard from '../components/ThoughtCard'
import styles from '../styles/SingleThought.module.css'
import deleteImg from '../public/images/delete.png'
import { AuthContext } from '../context/auth'

const DeleteCommentButton = ({ thoughtId, commentId }) => {
    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: {
            thoughtId,
            commentId
        }
    })

    const handleDelete = (e) => {
        if (confirm('Do you want to delete this comment?')) {
            deleteComment()
        }
    }

    return (
        <div onClick={handleDelete} style={{ backgroundImage: `url(${deleteImg.src})` }} className={styles.delImg} />
    )
}

const SingleThought = () => {
    const context = useContext(AuthContext)
    const [text, setText] = useState('')
    const router = useRouter()
    const { id } = router.query
    const maxLength = 300

    const { loading, data } = useQuery(FETCH_THOUGHT_QUERY, {
        variables: {
            thoughtId: id
        }
    })
    const [createComment, { loading: commentLoading }] = useMutation(CREATE_COMMENT_MUTATION, {
        update() {
            setText('')
        },
        variables: {
            thoughtId: id,
            body: text
        }
    })

    const handlePostComment = () => {
        if (!context.user) {
            router.push('/authorize')
            return
        }
        createComment()
    }

    const onChange = e => {
        setText(e.target.value)
    }

    return (
        <div>
            <Layout>
                <div className={styles.container}>
                    <div className={styles.content}>
                        {loading && <h1>Loading...</h1>}
                        {data && <ThoughtCard thought={data.getThought} />}
                        <h3 className={styles.comments}>Comments: </h3>
                        <div className={styles.addComment}>
                            <textarea onChange={onChange} className={styles.textarea} value={text} placeholder='Your comment' maxLength={maxLength} />
                            <div className={styles.lowerContent}>
                                <div>
                                    <button disabled={text.trim() === '' || !context.user} onClick={handlePostComment} className={styles.button}>Post</button>
                                    {!context.user && <p className={styles.alert}>Login to comment!</p>}
                                </div>
                                <p className={styles.charCount}>{text.length} / {maxLength}</p>
                            </div>
                        </div>

                        {data && data.getThought.comments.map((comment) => {
                            return (
                                <div key={comment.id} name={comment.id} className={styles.addComment}>
                                    <p>{comment.body}</p>
                                    <div className={styles.controls}>
                                        {context.user && context.user.username === comment.username && <DeleteCommentButton thoughtId={id} commentId={comment.id} />}
                                        <p className={styles.author}>by: {comment.username}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

const FETCH_THOUGHT_QUERY = gql`
    query($thoughtId: ID!){
        getThought(thoughtId: $thoughtId){
            id
            body
            username
            createdAt
            likes{
                username
            }
            likeCount
            comments{
                id
                username
                body
                createdAt
            }
            commentCount
        }
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($thoughtId: String! $commentId: String!){
        deleteComment(thoughtId: $thoughtId commentId: $commentId){
            id
            comments{
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`

const CREATE_COMMENT_MUTATION = gql`
    mutation($thoughtId: String!, $body: String!){
        createComment(thoughtId: $thoughtId, body: $body) {
            id
            body
            comments {
                id
                username
                body
                createdAt
            }
            commentCount
        }
  }
`

export default SingleThought