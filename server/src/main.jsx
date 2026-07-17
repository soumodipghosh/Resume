// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App.jsx'
import { store } from './app/store.js'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* ➕ Added wrapper for better responsiveness */}
        <div className="min-h-screen w-full">
          <App />
        </div>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)