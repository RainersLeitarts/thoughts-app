import { ApolloClient } from '@apollo/client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider as AP } from '@apollo/react-hooks'

const httpLink = createHttpLink({
    uri: 'http://localhost:3001'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export default function ApolloProvider({children}) {
    return (
        <AP client={client}>
            {children}
        </AP>
    )
}