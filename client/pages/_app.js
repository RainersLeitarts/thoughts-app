import ApolloProvider from '../apollo/ApolloProvider'
import { AuthProvider } from '../context/auth'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ApolloProvider>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  )


}

export default MyApp
