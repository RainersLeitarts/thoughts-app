import React, { useContext, useEffect, useState } from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { AuthContext } from '../context/auth'
import Layout from '../components/Layout'
import styles from '../styles/AddThought.module.css'


const AddThought = () => {
    const [text, setText] = useState('')
    const router = useRouter()
    const context = useContext(AuthContext)

    const maxLength = 300

    const onChange = e => {
        setText(e.target.value)
    }

    const [createThought, { loading }] = useMutation(CREATE_THOUGHT_MUTATION, {
        onError(err) {
            console.log(err)
        },
        variables: {body: text},
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_THOUGHTS_QUERY
            })

            proxy.writeQuery(
                {
                    query: FETCH_THOUGHTS_QUERY,
                    data: {
                        getThoughts: [result.data.createThought, ...data.getThoughts]
                    }
                }
            )

            router.push('/')
        }
    })

    const onSubmit = (e) => {
        e.preventDefault()
        createThought()
    }

    useEffect(() => {
        if (!context.user) {
            router.push('/authorize')
        }
    }, [context.user])

    return (
        <Layout>
            <form onSubmit={onSubmit} className={styles.container}>
                    <h1 className={styles.title}>Whats on your mind?</h1>
                    <textarea onChange={onChange} value={text} maxLength={maxLength} className={styles.textarea}>
                    </textarea>
                    <p className={styles.charCount}>{text.length} / {maxLength}</p>
                    <button className={styles.button}>Post</button>
            </form>
        </Layout>
    )
}

const CREATE_THOUGHT_MUTATION = gql`
    mutation createThought($body: String!){
        createThought(body: $body){
            id
            body
            createdAt
            username
        }
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

export default AddThought