import { User } from '../db/models/user.model.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

export const signUp = async (req, res) => {
    
    try {
        const { name, lastName, phone, email, birthDate, password, role } = req.body;

        //Verificar si el usuario ya esta registrado
        
        const isRegistered = await User.findOne({ email: email }, { email: 1 });
        
        if (isRegistered) {
            res.response(null, 'User already registered', 400);
            return;
        }

        //Verificar que todos los campos esten llenos

        console.log(name, lastName, phone, email, birthDate, password, role);
        
        if (!name || !lastName || !phone || !email || !birthDate || !password || !role) {
            res.response(null, 'All fields are required', 400);
            return;
        }

        //Crear codigo de primer login

        const code = generateCode();


        
        const newUser = new User({
            name,
            lastName,
            phone,
            email,
            birthDate,
            password,
            verified: 0,
            code,
            role
        });

        // Enviar correo de verificacion

        await resend.emails.send({
            from: 'Huellita Feliz <onboarding@resend.dev>',
            to: email,
            subject: 'Bienvenido a Huellita Feliz',
            html: `<h1>¡Bienvenido a Huellita Feliz!</h1>
            <p>Para poder ingresar a tu cuenta, necesitamos que confirmes tu correo electrónico.</p>
            <p>Para confirmar tu correo, ingresa el siguiente código en el apartado de password de la aplicación en el primer inicio de sesión:</p>
            <p><strong>${code}</strong></p>
            <p>Si no has solicitado este correo, puedes ignorarlo.</p>
            <p>¡Gracias!</p>`
        });


        newUser.password = await newUser.encryptPassword(newUser.password);
        newUser.code = await newUser.encryptPassword(newUser.code);
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

        const isRegistered = await User.findOne({ email: email }, { __v: 0 });
        
        if (!isRegistered) {
            res.response(null, 'User not registered', 400);
            return;
        }

        if (isRegistered.verified === 1) {
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
                birthDate: isRegistered.birthDate,
            }

            res.response(user, 'User logged in successfully', 200);

        }else{
            //Intentar iniciar sesion con el codigo de primer inicio de sesion
            //Code es el password en este caso
            const isCodeValid = await isRegistered.validatePassword(password, isRegistered.code);

            if (!isCodeValid) {
                res.response(null, 'Invalid code', 400);
                return;
            }

            const user = {
                _id: isRegistered._id,
                name: isRegistered.name,
                lastName: isRegistered.lastName,
                email: isRegistered.email,
                role: isRegistered.role,
                birthDate: isRegistered.birthDate,
            }

            //Actualizar el usuario verifeid = 1

            await User.updateOne({ _id: isRegistered._id }, { verified: 1 });


            res.response(user, 'User logged in successfully', 200);
        }

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 400);
    }
}


function generateCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < 12; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return code;
}