import { User } from '../db/models/user.model.js';

export const signUp = async (req, res) => {
    
    try {
        const { name, lastName, phone, email, birthDay, password } = req.body;
        
        const isRegistered = await User.findOne({ email: email }, { email: 1 });
        
        if (isRegistered) {
            res.response(null, 'User already registered', 400);
            return;
        }
        
        const newUser = new User({
            name,
            lastName,
            phone,
            email,
            birthDate: birthDay,
            password,
            role: 0,
        });

        newUser.password = await newUser.encryptPassword(newUser.password);
        await newUser.save();

        res.response(null, 'User created successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const signInPassword = async (req, res) => {
    
    try{
        const { email, password } = req.body;

        const isRegistered = await User.findOne({ email: email }, { __v: 0, rentedBooks: 0, purchasedBooks: 0 });
        
        if (!isRegistered) {
            res.response(null, 'User not registered', 400);
            return;
        }

        const isPasswordValid = await isRegistered.validatePassword(password, isRegistered.password);

        if (!isPasswordValid) {
            res.response(null, 'Invalid password', 400);
            return;
        }

        const user = {
            _id: isRegistered._id,
            name: isRegistered.name,
            lastName: isRegistered.lastName,
            email: isRegistered.email,
            role: isRegistered.role,
        }

        res.response(user, 'User logged in successfully', 200);

        
    } catch (error) {
        console.log(error);
        res.response(null, error.message, 400);
    }
}