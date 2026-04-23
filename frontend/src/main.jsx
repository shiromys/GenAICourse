import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import ErrorBoundary from './components/common/ErrorBoundary'
import './index.css'

// React DevTools recommendation for development
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Download the React DevTools for a better development experience: https://reactjs.org/link/react-devtools')
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </HelmetProvider>
    </React.StrictMode>,
)
