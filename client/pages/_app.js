import ApolloProvider from '../apollo/ApolloProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider>
      <Component {...pageProps} />
    </ApolloProvider>
  )


}

export default MyApp
