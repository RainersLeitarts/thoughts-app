import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import ThoughtCard from '../components/ThoughtCard'

export default function Home() {
  const { loading, data } = useQuery(FETCH_THOUGHTS_QUERY)

  return (
    <Layout>
      <div className={styles.container}>
        {data?.getThoughts?.map((thought, key) => {
          return (
            <ThoughtCard thought={thought} key={key}/>
          )
        })}
      </div>
    </Layout>

  )
}

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
