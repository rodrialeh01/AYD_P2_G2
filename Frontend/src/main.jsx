import React from 'react'
import ReactDOM from 'react-dom/client'
import SidebarCliente from './components/Sidebar/SidebarCliente.jsx'
import './index.css'
import Login from './pages/Login/Login.jsx'
import Registro from './pages/Registro/Registro.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SidebarCliente />
    <Registro />
  </React.StrictMode>,
)
