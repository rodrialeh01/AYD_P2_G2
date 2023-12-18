import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    comment: String,
    qualification: Number,
    date: String
});

export const Review = model('reviews', reviewSchema);