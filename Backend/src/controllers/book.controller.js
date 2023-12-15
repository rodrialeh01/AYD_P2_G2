import { Book } from '../db/models/book.model.js';
import { bookState } from '../config/constants.js';
import { User } from '../db/models/user.model.js';


export const createBook = async (req, res) => {
        
    try {
        const { title, synopsis, purchasePrice, rentalPrice, author, editorial, yearDate } = req.body;
        
        
        const newBook = new Book({
            title,
            synopsis,
            purchasePrice,
            rentalPrice,
            author,
            editorial,
            yearDate,
            bookState: bookState.AVAILABLE
        });

        await newBook.save();

        res.response(null, 'Book created successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}


export const getBooks = async (req, res) => {
    
    try {
        const libros = await Book.find(
            { bookState: { $in: [bookState.AVAILABLE, bookState.RENTED] } },
            { __v: 0}
          );
          

        res.response(libros, 'Books retrieved successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const getAllBooks = async (req, res) => {
    
    try {
        //devuelve todos los libros
        const libros = await Book.find({}, { __v: 0 });

        res.response(libros, 'Books retrieved successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id, { __v: 0 });

        if (!book) {
            res.response(null, 'Book not found', 400);
            return;
        }

        res.response(book, 'Book retrieved successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const updateBookByID = async (req, res) => {
        
    try {
        const { id } = req.params;
        const { title, synopsis, purchasePrice, rentalPrice, author, editorial, yearDate } = req.body;

        const isRegistered = await Book.findOne({ _id: id }, { title: 1 });

        if (!isRegistered) {
            res.response(null, 'Book not registered', 400);
            return;
        }

        await Book.updateOne({ _id: id }, { title, synopsis, purchasePrice, rentalPrice, author, editorial, yearDate });

        res.response(null, 'Book updated successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }

}

export const deleteBook = async (req, res) => {
try {
    const { id } = req.params;

    const isRegistered = await Book.findOne({ _id: id }, { title: 1 });

    if (!isRegistered) {
        res.response(null, 'Book not registered', 400);
        return;
    }

    await Book.deleteOne({ _id: id });

    res.response(null, 'Book deleted successfully', 200);

} catch (error) {
    console.log(error);
    res.response(null, error.message, 500);
}
}

export const buyBook = async (req, res) => {
    try {
        const { idBook, idUser } = req.body;

        // Buscar el libro

        const isRegistered = await Book.findOne({ _id: idBook }, { title: 1, bookState: 1 });

        if (!isRegistered) {
            res.response(null, 'Book not registered', 400);
            return;
        }

        // Buscar el usuario

        const isRegisteredUser = await User.findOne({ _id: idUser }, { name: 1 });

        if (!isRegisteredUser) {
            res.response(null, 'User not registered', 400);
            return;
        }

        // Verificar que el libro este disponible

        if (isRegistered.bookState !== bookState.AVAILABLE) {
            console.log(isRegistered.bookState);
            console.log(bookState.AVAILABLE);
            res.response(null, 'Book not available', 400);
            return;
        }

        // Actualizar el estado del libro

        await Book.updateOne({ _id: idBook }, { bookState: bookState.SOLD });

        // Agregar el libro a la lista de libros comprados del usuario

        await User.updateOne({ _id: idUser }, { $push: { purchasedBooks: idBook } });

        res.response(null, 'Book purchased successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}


export const rentBook = async (req, res) => {
    try {
        const { idBook, idUser, returnDate } = req.body;

        // Buscar el libro

        const isRegistered = await Book.findOne({ _id: idBook }, { title: 1, bookState: 1 });

        if (!isRegistered) {
            res.response(null, 'Book not registered', 400);
            return;
        }

        // Buscar el usuario

        const isRegisteredUser = await User.findOne({ _id: idUser }, { name: 1 });

        if (!isRegisteredUser) {
            res.response(null, 'User not registered', 400);
            return;
        }

        // Verificar que el libro este disponible

        if (isRegistered.bookState !== bookState.AVAILABLE) {
            res.response(null, 'Book not available', 400);
            return;
        }

        // Actualizar el estado del libro

        await Book.updateOne({ _id: idBook }, { bookState: bookState.RENTED, returnDate: returnDate });

        // Agregar el libro a la lista de libros alquilados del usuario

        await User.updateOne({ _id: idUser }, { $push: { rentedBooks: idBook } });

        res.response(null, 'Book rented successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const returnBook = async (req, res) => {
    try {
        const { idBook, idUser } = req.body;

        // Buscar el libro

        const isRegistered = await Book.findOne({ _id: idBook }, { title: 1, bookState: 1 });

        if (!isRegistered) {
            res.response(null, 'Book not registered', 400);
            return;
        }

        // Buscar el usuario

        const isRegisteredUser = await User.findOne({ _id: idUser }, { name: 1 });

        if (!isRegisteredUser) {
            res.response(null, 'User not registered', 400);
            return;
        }

        // Verificar que el libro este alquilado

        if (isRegistered.bookState !== bookState.RENTED) {
            res.response(null, 'Book not rented', 400);
            return;
        }

        // Actualizar el estado del libro

        await Book.updateOne({ _id: idBook }, { bookState: bookState.AVAILABLE, returnDate: null });

        // Eliminar el libro de la lista de libros alquilados del usuario

        await User.updateOne({ _id: idUser }, { $pull: { rentedBooks: idBook } });

        res.response(null, 'Book returned successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}
