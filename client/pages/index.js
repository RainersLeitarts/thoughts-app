import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import ThoughtCard from '../components/ThoughtCard'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function Home() {
  const { loading, data } = useQuery(FETCH_THOUGHTS_QUERY)

  return (
    <Layout>
      <div className={styles.container}>
        {loading && (
          <div className={styles.loading}>
              LOADING...
          </div>
        )}
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 1, 650: 2, 1000: 3, 1300: 4 }}
        >
          {data && <Masonry
            gutter="10px"
          >
            {data?.getThoughts?.map((thought, key) => {
              return (
                <ThoughtCard thought={thought} key={key} />
              )
            })}
          </Masonry>}
        </ResponsiveMasonry>
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
