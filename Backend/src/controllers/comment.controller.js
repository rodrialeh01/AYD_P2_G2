import { Comment } from '../db/models/comment.model.js';
import { User } from '../db/models/user.model.js';
import { Book } from '../db/models/book.model.js';



export const createComment = async (req, res) => {
            
    try {
        const { comment, idUser, idBook } = req.body;

        const userLogged = await User.findById(idUser, { __v: 0, rentedBooks: 0, purchasedBooks: 0 });


        if (!userLogged) {
            res.response(null, 'User not found', 400);
            return;
        }

        const book = await Book.findById(idBook, { __v: 0 });
        if (!book) {
            res.response(null, 'Book not found', 400);
            return;
        }

        Comment.create({
            idUser: idUser,
            comment: comment,
            idBook: idBook
        });

        res.response(null, 'Comment created successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const getCommentsByBookId = async (req, res) => {
    try {
        const { id } = req.params;

        const comments = await Comment.find({ idBook: id }, { __v: 0 });

        if (!comments.length) {
            res.response(null, 'Comments not found', 400);
            return;
        }

        res.response(comments, 'Comments retrieved successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id, { __v: 0 });

        if (!comment) {
            res.response(null, 'Comment not found', 400);
            return;
        }

        await Comment.findByIdAndDelete(id);

        res.response(null, 'Comment deleted successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
} 
