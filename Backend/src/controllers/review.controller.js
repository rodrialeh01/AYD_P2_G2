import { Review } from "../db/models/review.model.js";

export const createReview = async (req, res) => {

    try {

        const { idUser, comment, qualification } = req.body;

        if(!idUser || !comment || !qualification) {
            res.response(null, 'All fields are required', 400);
        }

        Review.create({
            idUser,
            comment,
            qualification
        });

        res.response(null, 'Review created successfully', 200);

    } catch(error) {
        console.log(error);
        res.response(null, error.message, 500);
    }

};

export const getReviews = async (req, res) => {
    
    try {
    
        const reviews = await Review.find().populate('idUser', { name: 1, lastName: 1, email: 1 });

        res.response(reviews, 'Reviews obtained successfully', 200);

    } catch(error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
    
};

export const deleteReview = async (req, res) => {
        
    try {
    
        const { id } = req.params;

        const result = await Review.deleteOne({ _id: id });

        if(result.deletedCount === 0) {
            return res.response(null, 'Review not found', 404);
        }

        res.response(null, 'Review deleted successfully', 200);

    } catch(error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};