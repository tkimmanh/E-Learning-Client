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

// ** toast
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ** redux
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <App />
          </Provider>
        </PersistGate>
        <ToastContainer limit={1} />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
