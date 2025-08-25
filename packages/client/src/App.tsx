import './App.css'
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { SnackbarProvider } from 'notistack'

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import { errorLink } from './graphql/links/error'
import { authLink } from './graphql/links/auth'
import { httpLink } from './graphql/links/http'

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
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
