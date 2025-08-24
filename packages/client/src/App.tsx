import './App.css'
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { SetContextLink } from '@apollo/client/link/context'
import { BrowserRouter, Routes, Route } from 'react-router'
import { SnackbarProvider } from 'notistack'
import { AuthState } from './state/auth.state'

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SignIn from './pages/SignIn'

const authLink = new SetContextLink(prevContext => {
  const token = AuthState.access_token.get()
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const httpLink = new HttpLink({ uri: import.meta.env.VITE_SERVER_URL })

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignIn />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ApolloProvider>
  )
}

export default App
