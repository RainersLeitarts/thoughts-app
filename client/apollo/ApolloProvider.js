import { ApolloClient } from '@apollo/client'
import { InMemoryCache } from '@apollo/client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider as AP } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
    uri: 'http://localhost:3001'
})

const authLink = setContext((req, prev) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        getThoughts: {
                            likes:{
                               merge: true
                            }
                            
                        },
                    },
                },
            }
        }
    )
})

export default function ApolloProvider({children}) {
    return (
        <AP client={client}>
            {children}
        </AP>
    )
}