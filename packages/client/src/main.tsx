import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UrlGeneratedProvider } from './state/url.state.tsx'
import { AuthProvider } from './state/auth.state.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <UrlGeneratedProvider>
        <App />
      </UrlGeneratedProvider>
    </AuthProvider>
  </StrictMode>
)
