import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
    idUser: String,
    comment: String,
    idBook: String
});

export const Comment = model('comments', commentSchema);