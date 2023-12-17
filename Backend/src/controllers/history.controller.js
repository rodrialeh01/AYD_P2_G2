import { History } from '../db/models/history.model.js';

export const setHistory = async (req, res) => {
    try{
        const { idUser, idBook, bookState } = req.body;

        const history = new History({ idUser, idBook, bookState });

        await history.save();

        res.response(history, 'History created successfully', 200);

    } catch (error) {
        res.response(null, error.message, 400);
    }
};

export const getHistory = async (req, res) => {
    try{
        const { id } = req.params;

        const history = await History.find({ idUser: id }).populate('idBook').populate('idUser', { password: 0 });

        res.response(history, 'History found successfully', 200);

    } catch (error) {
        res.response(null, error.message, 400);
    }
};