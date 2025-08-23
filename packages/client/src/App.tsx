import './App.css'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { SnackbarProvider } from 'notistack'

import Home from './pages/Home'
import NotFound from './pages/NotFound'

const client = new ApolloClient({
  link: new HttpLink({ uri: import.meta.env.VITE_SERVER_URL }),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ApolloProvider>
  )
}

export default App
