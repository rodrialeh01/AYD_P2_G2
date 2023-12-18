import { User } from '../db/models/user.model.js';

export const getUser = async (req, res) => {
    try{
        const { id } = req.params;

        const dataUser = await User.findOne({ _id:id }, { __v: 0, password: 0, code: 0, verified: 0 });

        res.response(dataUser);

    } catch (error) {
        res.response(null, error.message, 400);
    }
};

export const updateInfoUser = async (req, res) => {
    
    try
    {
        const { id } = req.params;
        const { name, lastName, phone, birthDate, password } = req.body;

        //Verificar que todos los campos esten llenos
        if (!name || !lastName || !phone || !birthDate || !password) {
            res.response(null, 'All fields are required', 400);
            return;
        }

        await User.updateOne({ _id: id }, { name, lastName, phone, birthDate, password });

        const userUpdated = await User.findOne({ _id: id }, { __v: 0, password: 0, code: 0, verified: 0 });

        res.response(userUpdated, 'User updated successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 400);
    }

}

export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;

        const isRegistered = await User.findOne({ _id: id }, { email: 1});

        if (!isRegistered) {
            res.response(null, 'User not registered', 400);
            return;
        }

        await User.deleteOne({ _id: id });

        res.response(null, 'User deleted successfully', 200);

    } catch (error) {
        res.response(null, error.message, 400);
    }
};

export const getPets = async (req, res) => {
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
        const users = await User.find({}, { __v: 0, password: 0, code: 0, verified: 0 });

        res.response(users, 'Users', 200);

    } catch (error) {
        res.response(null, error.message, 400);
    }
};