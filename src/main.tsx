// ** React
import React from 'react'
import ReactDOM from 'react-dom/client'

// ** Components
import { ThemeProvider } from './components/theme-provider.tsx'
import App from './App.tsx'

// ** styles
import './global.css'

// ** Router
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
