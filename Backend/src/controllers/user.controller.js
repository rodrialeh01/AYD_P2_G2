import { Book } from '../db/models/book.model.js';
import { Comment } from '../db/models/comment.model.js';
import { User } from '../db/models/user.model.js';

export const getUser = async (req, res) => {
    try{
        const { id } = req.params;

        const dataUser = await User.findOne({ _id:id }, { __v: 0, password: 0 });

        res.response(dataUser);

    } catch (error) {
        res.response(null, error.message, 400);
    }
};

export const updateInfoUser = async (req, res) => {
    
    try
    {
        const { id } = req.params;
        const { name, lastName, phone, birthDay, password } = req.body;

        await User.updateOne({ _id: id }, { name, lastName, phone, birthDate: birthDay, password });

        const userUpdated = await User.findOne({ _id: id }, { __v: 0, password: 0 });

        res.response(userUpdated, 'User updated successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 400);
    }

}

export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;

        const isRegistered = await User.findOne({ _id: id }, { email: 1, rentedBooks: 1 });

        if (!isRegistered) {
            res.response(null, 'User not registered', 400);
            return;
        }

        await User.deleteOne({ _id: id });

        await Comment.deleteMany({ idUser: id });

        await Book.updateMany({ _id: { $in: isRegistered.rentedBooks } }, { $set: { bookState: 0 } });

        res.response(null, 'User deleted successfully', 200);

    } catch (error) {
        res.response(null, error.message, 400);
    }
};

export const getBooks = async (req, res) => {
    try{
        const { id } = req.params;

        const booksUser = await User.findOne({ _id:id }, { rentedBooks: 1, purchasedBooks: 1 });
        const rentedBooks = await Book.find({ _id: { $in: booksUser.rentedBooks } }, { __v: 0 });
        const purchasedBooks = await Book.find({ _id: { $in: booksUser.purchasedBooks } }, { __v: 0 });

        res.response({ rentedBooks, purchasedBooks }, 'Books of user', 200);

    }
    catch (error) {
        console.log(error);
        res.response(null, error.message, 400);
    }
};

export const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({}, { __v: 0, password: 0 });

        res.response(users, 'Users', 200);

    } catch (error) {
        res.response(null, error.message, 400);
    }
};