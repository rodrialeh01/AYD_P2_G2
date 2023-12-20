import mongoose, { Schema, model } from 'mongoose';

const petSchema = new Schema(
    {
        nombre: String,
        edad: Number,
        especie: String,
        raza: String,
        comportamiento: String,
        contacto_veterinario: String,
        comentarios_extra: String,
        id_cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        id_cuidador: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        estado: String,
        is_hospedada: Boolean,
        is_atendida: Boolean,
        fecha_devolucion: String
    }
);

const Pets = model('Pets', petSchema);

export default Pets;