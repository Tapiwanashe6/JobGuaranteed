import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext.jsx';
import { ClerkProvider} from '@clerk/clerk-react';

// Get Clerk publishable key from environment
// If not set, the app will work but without authentication
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.warn('⚠️ CLERK_PUBLISHABLE_KEY not set. App will work without authentication.')
  console.warn('To enable Clerk auth:')
  console.warn('1. Get your key from https://dashboard.clerk.com/last-active?path=api-keys')
  console.warn('2. Add it to client/.env.local: VITE_CLERK_PUBLISHABLE_KEY=pk_...')
}

createRoot(document.getElementById('root')).render(
  PUBLISHABLE_KEY ? (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </ClerkProvider>
  ) : (
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  ),
)
