import './App.css'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'

const client = new ApolloClient({
  link: new HttpLink({ uri: import.meta.env.VITE_SERVER_URL }),
  cache: new InMemoryCache(),
})


function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
