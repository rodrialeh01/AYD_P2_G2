import { createBrowserRouter } from 'react-router-dom';
import LayoutPrivate from '../Layout/LayoutPrivate';
import Login from '../pages/Login/Login';
import Registro from '../pages/Registro/Registro';
import Perfil from '../pages/Perfil/Cliente/Perfil';
import PerfilC from '../pages/Perfil/Cuidador/PerfilC';
import EditarPerfil from '../pages/Perfil/Cliente/EditarPerfil';
import EditarPerfilC from '../pages/Perfil/Cuidador/EditarPerfilC';
import PerfMascota from '../pages/PerfMascota/PerfMascota';

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Login />
    },
    {
        path:'/registro',
        element: <Registro />
    },
    {
        path:'/user',
        element: <LayoutPrivate />,
        children: [
            {
                path: 'profile',
                element: < Perfil />
            },
            {
                path: 'editprofile',
                element: < EditarPerfil />
            },
            {
                path: 'profilepet',
                element: < PerfMascota />
            },
            {
                path: 'pets',
                element: null
            }
        ]
    },
    {
        path:'/petcare',
        element: <LayoutPrivate />,
        children: [
            {
                path: 'profile',
                element: < PerfilC />
            },
            {
                path: 'editprofile',
                element: < EditarPerfilC />
            },
            {
                path: 'pets',
                element: null
            },
            {
                path: 'atention',
                element: null
            }
        ]
    }
])