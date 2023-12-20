import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import UserProvider from './userCtx/User.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} className="scrollbar-hide"/>
    </UserProvider>
  </React.StrictMode>,
)
