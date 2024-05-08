import React, { useState } from 'react'
import { useSignIn } from 'react-auth-kit';
import { useToast } from '@chakra-ui/react'
import LoginBG from '../../images/login-bg.png'
import axios from 'axios';
import { TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';

export default function RegisterComponent() {

    const backendURL = process.env.REACT_APP_BACKEND_URL;

    const toast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const signIn = useSignIn();

    const handleRegister = async (e) => {
        e.preventDefault();

        console.log(email, password, nome, sobrenome);
        console.log(confirmEmail, confirmPassword);

        if (!email || !password || !nome || !sobrenome) {
            console.log('Email or password is empty');
            return;
        }

        if (email !== confirmEmail) {
            console.log('Emails do not match');
            return;
        }

        if (password !== confirmPassword) {

            console.log('Passwords do not match');
            return;
        }

        try {
            await axios.post(`${backendURL}/auth/register`, {
                email: email,
                password: password,
                name: nome,
                surname: sobrenome
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log("Error: ", error);
            });
        }
        catch (error) {
            console.log("Erro ao conectar com o servidor: ", error);

            console.log(error);
        }
    }


    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center' style={{ backgroundImage: `url(${LoginBG})`, backgroundSize: 'cover' }} >
                <div className='bg-[#EBEBEB] w-[50%] h-3/4 rounded-[25px] flex justify-center'>
                    <div className='w-full h-full flex flex-col justify-center items-center'>
                        <div className='w-full flex justify-center py-4'>
                            <h1 className='text-[#000] text-5xl font-normal'>
                                EduCode
                            </h1>
                        </div>
                        <div className='w-full flex flex-col justify-center items-center gap-3'>
                            <div className='w-full flex flex-row justify-center items-center gap-5'>
                                <TextField
                                    className='w-[35%]'
                                    label="Nome"
                                    variant="filled"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                                <TextField
                                    className='w-[35%]'
                                    label="Sobrenome"
                                    variant="filled"
                                    value={sobrenome}
                                    onChange={(e) => setSobrenome(e.target.value)}
                                />
                            </div>
                            <div className='w-full flex flex-row justify-center items-center gap-5'>
                                <TextField
                                    className='w-[35%]'
                                    label="Email"
                                    variant="filled"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    className='w-[35%]'
                                    label="Confirmar Email"
                                    variant="filled"
                                    value={confirmEmail}
                                    onChange={(e) => setConfirmEmail(e.target.value)}
                                />
                            </div>
                            <div className='w-full flex flex-row justify-center items-center gap-5'>
                                <TextField
                                    className='w-[35%]'
                                    label="Senha"
                                    variant="filled"
                                    value={password}
                                    type='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <TextField
                                    className='w-[35%]'
                                    label="Confirmar Senha"
                                    variant="filled"
                                    value={confirmPassword}
                                    type='password'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <motion.button className='bg-[#3D5BAA] text-[#fff] rounded-[5px] w-2/5 py-2' onClick={handleRegister}>
                                Registrar
                            </motion.button>
                            <motion.button className='text-[#3D5BAA] bg-[#ddd] border-2 border-[#5a71ab] rounded-[5px] w-1/3 py-2'
                                onClick={() => window.location.href = '/login'}
                            >
                                Login
                            </motion.button>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}