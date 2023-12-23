import mongoose, { Schema, model } from 'mongoose';

const reviewSchema = new Schema(
    {
        idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        comment: String,
        qualification: Number
    },
    {
        timestamps: true
    }
);

export const Review = model('reviews', reviewSchema);