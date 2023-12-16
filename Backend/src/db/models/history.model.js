import mongoose, { Schema, model, mongo } from 'mongoose';

const historySchema = new Schema(
    {
        bookState: Number,
        idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        idBook: { type: mongoose.Schema.Types.ObjectId, ref: 'books' }
    },
    {
        timestamps: true
    }
);

export const History = model('history', historySchema);