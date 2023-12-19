import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000'
});

// Registro de usuario
export const registro = async (data) => {
    console.log("desde Service: ", data);
    const response = await instance.post('/auth/sign/up', data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("desde Service 2: ", response);
    return response;
}

// Inicio de sesión
export const login = async (data) => {
    const response = await instance.post('/auth/sign/in', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

// Obtener datos del usuario
export const getUser = async (data) => 
{
    const response = await instance.get(`user/${data}`);
    return response;
}

// update user
export const editUser = async (id, data) => 
{  
    console.log("desde Service: ", data);
    const response = await instance.patch(`user/update/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

//crear perfil mascota
export const createPet = async (data) => 
{  
    console.log("desde Service: ", data);
    const response = await instance.post(`pet/create`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

//Obtener mascotas de un usuario
export const getPetsByClient = async (idClient) => {
    const response = await instance.get(`pet/client/${idClient}`);
    return response;
}

//Hospedar mascota
export const hostPet = async (data) => {
    const response = await instance.post(`pet/hospedar`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}