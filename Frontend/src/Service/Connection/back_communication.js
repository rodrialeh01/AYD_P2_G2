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

//Obtener mascotas
export const getPets = async () => {
    const response = await instance.get(`pet/pets`);
    return response;
}

//Atender mascota
export const attendPet = async (data) => {
    const response = await instance.post(`pet/atender`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

//Obtener mascotas atendidas
export const getPetsAttended = async (idCuidador) => {
    const response = await instance.get(`pet/keeper/${idCuidador}`);
    return response;
}

//Actualizar estado de la mascota
export const updateStatus = async (data) => {
    const response = await instance.post(`/pet/estado`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

//Devolver mascota
export const returnPet = async (id) => {
    const response = await instance.post(`/pet/devolver/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

//Recoger mascota
export const pickPet = async (id) => {
    const response = await instance.post(`/pet/recoger/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

// Obtener reseñas
export const getReviews = async () => {
    const response = await instance.get(`review/reviews`);
    return response;
}

// Crear reseña
export const createReview = async (data) => {
    const response = await instance.post(`review/create`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

// Eliminar reseña
export const deleteReview = async (id) => {
    const response = await instance.delete(`review/delete/${id}`);
    return response;
}

// Crear Producto
export const createProduct = async (data) => {
    const response = await instance.post(`product/create`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

// Obtener Productos
export const getProducts = async () => {
    const response = await instance.get(`product/products`);
    return response;
}

// Obtener Un Producto
export const getProduct = async (id) => {
    const response = await instance.get(`product/${id}`);
    return response;
}

// Actualizar Producto
export const updateProduct = async (id, data) => {
    const response = await instance.patch(`product/update/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}
