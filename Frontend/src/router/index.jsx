import { createBrowserRouter } from 'react-router-dom';
import LayoutPrivate from '../Layout/LayoutPrivate';
import AtenderMascota from '../pages/AtenderMascota/AtenderMascota';
import Login from '../pages/Login/Login';
import MascotasHospedadas from '../pages/MascotasHospedadas/MascotasHospedadas';
import MisMascotas from '../pages/MisMascotas/MisMascotas';
import PerfMascota from '../pages/PerfMascota/PerfMascota';
import EditarPerfil from '../pages/Perfil/Cliente/EditarPerfil';
import Perfil from '../pages/Perfil/Cliente/Perfil';
import EditarPerfilC from '../pages/Perfil/Cuidador/EditarPerfilC';
import PerfilC from '../pages/Perfil/Cuidador/PerfilC';
import Registro from '../pages/Registro/Registro';
import Resenia from '../pages/Reviews/Resenia';
import ReseniaCuidador from '../pages/Reviews/ReseniaCuidador';
import TiendaCuidador from '../pages/Tienda/TiendaCuidador';
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
                path: 'mypets',
                element: < MisMascotas />
            },
            {
                path: 'resenia',
                element: < Resenia />
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
                element: < MascotasHospedadas />
            },
            {
                path: 'atention',
                element: <AtenderMascota/>
            },
            {
                path: 'resenia',
                element: < ReseniaCuidador />
            },
            {
                path: 'tienda',
                element: < TiendaCuidador />
            }
        ]
    }
])