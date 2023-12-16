import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: String,
    lastName: String,
    phone: String,
    email: String,
    password: String,
    birthDate: String,
    role: Number,
    rentedBooks: Array,
    purchasedBooks: Array
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(5);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async (password, passwordDB) => {
    return bcrypt.compare(password, passwordDB);
};

export const User = model('users', userSchema);