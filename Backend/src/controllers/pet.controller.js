import Pet from '../db/models/pet.model.js';

export const createPet = async (req, res) => {
    try {
        const { nombre, edad, especie, raza, comportamiento, contacto_veterinario, comentarios_extra, id_cliente } = req.body;

        if(!nombre || !edad || !especie || !raza || !comportamiento || !contacto_veterinario || !comentarios_extra || !id_cliente) {
            return res.response(null, 'Missing params', 400);
        }
        

        Pet.create({
            nombre: nombre,
            edad: edad,
            especie: especie,
            raza: raza,
            comportamiento: comportamiento,
            contacto_veterinario: contacto_veterinario,
            comentarios_extra: comentarios_extra,
            id_cliente: id_cliente,
            is_hospedada: false,
            is_atendida: false
        });

        res.response(null, 'Pet created successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const getPet = async (req, res) => {
    try{

        const { id } = req.params;

        if(!id) {
            return res.response(null, 'Missing params', 400);
        }

        const result = await Pet.findOne({ _id: id });

        if(!result) {
            return res.response(null, 'Pet not found', 404);
        }

        res.response(result, 'Pet found', 200);

    } catch(error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const getPets = async (req, res) => {
    try{

        const result = await Pet.find();

        if(!result) {
            return res.response(null, 'Pets not found', 404);
        }

        res.response(result, 'Pets found', 200);

    } catch(error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const updatePet = async (req, res) => {
    try{

        const { id } = req.params;
        const { nombre, edad, especie, raza, comportamiento, contacto_veterinario, comentarios_extra } = req.body;

        if(!id || !nombre || !especie || !edad || !raza || !comportamiento || !contacto_veterinario || !comentarios_extra) {
            return res.response(null, 'Missing params', 400);
        }

        const result = await Pet.updateOne({ _id: id }, {
            nombre: nombre,
            edad: edad,
            especie: especie,
            raza: raza,
            comportamiento: comportamiento,
            contacto_veterinario: contacto_veterinario,
            comentarios_extra: comentarios_extra
        });

        if(!result) {
            return res.response(null, 'Pet not found', 404);
        }

        res.response(null, 'Pet updated successfully', 200);

    } catch(error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const getPetsByClient = async (req, res) => {

    try{

        const { id } = req.params;

        if(!id) {
            return res.response(null, 'Missing params', 400);
        }

        const result = await Pet.find({ id_cliente: id });

        if(!result) {
            return res.response(null, 'Pet not found', 404);
        }

        res.response(result, 'Pet found', 200);

    } catch(error) {
        console.log(error);
        res.response(null, error.message, 500);
    }

};

export const getPetsByCuidador = async (req, res) => {

    try{

        const { id } = req.params;

        if(!id) {
            return res.response(null, 'Missing params', 400);
        }

        const result = await Pet.find({ id_cuidador: id });

        if(!result) {
            return res.response(null, 'Pet not found', 404);
        }

        res.response(result, 'Pet found', 200);

    } catch(error) {
        console.log(error);
        res.response(null, error.message, 500);
    }

};

export const hospedarPet = async (req, res) => {

    try{
        const { id_pet, fecha_devolucion } = req.body;

        if(!id_pet || !fecha_devolucion) {
            return res.response(null, 'Missing params', 400);
        }

        const result = await Pet.updateOne({ _id: id_pet }, {
            fecha_devolucion: fecha_devolucion,
            is_hospedada: true
        });

        if(!result) {
            return res.response(null, 'Pet not found', 404);
        }

        res.response(null, 'Pet hospeded successfully', 200);
    } catch(error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const devolverPet = async (req, res) => {
    try{

        const { id_pet } = req.params;

        if(!id_pet) {
            return res.response(null, 'Missing params', 400);
        }

        const result = await Pet.updateOne({ _id: id_pet }, {
            fecha_devolucion: null,
            id_cuidador: null,
            is_hospedada: true,
            is_atendida: false,
            estado: 'Listo para recoger'
        });

        if(result.matchedCount === 0) {
            return res.response(null, 'Pet not found', 404);
        }

        res.response(null, 'Pet updated successfully', 200);

    } catch(error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const changeStatePet = async (req, res) => {
    try{

        const { id_pet, estado } = req.body;

        if(!id_pet || !estado) {
            return res.response(null, 'Missing params', 400);
        }

        const result = await Pet.updateOne({ _id: id_pet }, {
            estado: estado
        });

        if(!result) {
            return res.response(null, 'Pet not found', 404);
        }

        res.response(null, 'Pet updated successfully', 200);

    } catch(error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const atenderPet = async (req, res) => {
    try{

        const { id_pet, id_cuidador } = req.body;

        if(!id_pet || !id_cuidador) {
            return res.response(null, 'Missing params', 400);
        }

        // verificar que el cuidador no tenga mas de 2 mascotas atendidas
        const result = await Pet.find({ id_cuidador: id_cuidador, is_atendida: true });

        if(result.length >= 2) {
            return res.response(null, 'Cuidador can\'t atend more than 2 pets', 400);
        }

        const result2 = await Pet.updateOne({ _id: id_pet }, {
            is_atendida: true,
            id_cuidador: id_cuidador
        });

        if(!result2) {
            return res.response(null, 'Pet not found', 404);
        }

        res.response(null, 'Pet updated successfully', 200);

    } catch(error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const recogerPet = async (req, res) => {

    try{

        const { id_pet } = req.params;

        if(!id_pet) {
            return res.response(null, 'Missing params', 400);
        }

        const result = await Pet.updateOne({ _id: id_pet }, {
            fecha_devolucion: null,
            id_cuidador: null,
            is_hospedada: false,
            is_atendida: false,
            estado: 'Recogida'
        });

        if(result.matchedCount === 0) {
            return res.response(null, 'Pet not found', 404);
        }

        res.response(null, 'Pet updated successfully', 200);

    } catch(error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}