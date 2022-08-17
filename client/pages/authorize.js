import gql from 'graphql-tag'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import { useState } from 'react'
import Layout from '../components/Layout'
import { AuthContext } from '../context/auth'

import styles from '../styles/Authorize.module.css'

export default function Authorize() {
    const router = useRouter()
    const context = useContext(AuthContext)
    const [isLoginPage, setIsLoginPage] = useState()
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if(context.user) {
            router.push('/')
        }
    }, [context.user])

    
    const togglePage = () => {
        setIsLoginPage(prev => {
            return !prev
        })
    }

    const onChange = e => {
        setValues(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            context.login(result.data.register)
            router.push('/')
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.errors)
            setErrors(err?.graphQLErrors[0]?.extensions?.errors)
        },
        variables: values
    })

    const [loginUser, { loading: loading2 }] = useMutation(LOGIN_USER, {
        update(proxy, result) {
            context.login(result.data.login)
            router.push('/')
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.errors)
            setErrors(err?.graphQLErrors[0]?.extensions?.errors)
        },
        variables: {
            username: values.username,
            password: values.password
        }
    })

    const onSubmit = e => {
        e.preventDefault()  
        setErrors({})
        if(isLoginPage){
            loginUser()
        }else{
            addUser()
        }
    }


    return (
        <Layout>
            <div className={styles.container}>
                {
                    errors && Object.values(errors)?.map((error, key) => {
                        return (
                            <div key={key} className={styles.error}>
                                {error}
                            </div>
                        )
                    })
                }
                <form onSubmit={onSubmit} className={styles.formContainer}>
                    <h1 className={styles.title}>{isLoginPage ? 'Login' : 'Register'}</h1>
                    {!isLoginPage && <input onChange={onChange} value={values.email} className={styles.input} name='email' placeholder='E-mail' type='email' />}
                    <input onChange={onChange} value={values.username} className={styles.input} name='username' placeholder='Username' type='text' />
                    <input onChange={onChange} value={values.password} className={styles.input} name='password' placeholder='Password' type='password' />
                    {!isLoginPage && <input onChange={onChange} value={values.confirmPassword} className={styles.input} name='confirmPassword' placeholder='Repeat password' type='password' />}
                    <button className={styles.formButton} type='submit'>{isLoginPage ? loading2 ? 'Loading...' : 'Login' : loading ? 'Loading...' : 'Register'}</button>
                    <p onClick={togglePage} className={styles.option}>{isLoginPage ? 'Create an account' : 'Already have an account'}</p>
                </form>
            </div>
        </Layout>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $email: String!
        $username: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                email: $email
                username: $username
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id
            email
            username
            token
            createdAt
        }
    }
`

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ){
            id
            email
            username
            token
            createdAt
        }
    }
`