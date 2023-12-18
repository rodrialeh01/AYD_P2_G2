import { createBrowserRouter } from 'react-router-dom';
import LayoutPrivate from '../Layout/LayoutPrivate';
import Login from '../pages/Login/Login';
import Registro from '../pages/Registro/Registro';

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
                element: null
            },
            {
                path: 'profilepet',
                element: null
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
                element: null
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