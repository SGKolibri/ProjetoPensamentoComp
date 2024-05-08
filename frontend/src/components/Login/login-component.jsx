import React, { useState } from 'react'
import { useSignIn } from 'react-auth-kit';
import { useToast } from '@chakra-ui/react'
import LoginBG from '../../images/login-bg.png'
import axios from 'axios';
import { TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginComponent() {

    const backendURL = process.env.REACT_APP_BACKEND_URL;

    const toast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = useSignIn();

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log(email, password);

        if (!email || !password) {
            console.log('Email or password is empty');
            return;
        }

        try {
            const response = await axios.post(`${backendURL}/auth/login`, {
                email: email,
                password: password
            });

            if (response.data.error !== undefined) {
                console.log("Error:", response.data.error);
                toast({
                    title: response.data.error,
                    position: "bottom-center",
                    status: "error",
                    duration: 2500,
                    isClosable: true,
                })
                return;
            }

            if (response.data.token !== undefined) {
                console.log(response);
                signIn({
                    user: response.data,
                    token: response.data.token,
                    expiresIn: 3600,
                    tokenType: 'Bearer',
                    authState: true
                });
                window.location.href = "/dashboard";
            }

        } catch (error) {
            console.log("Erro ao conectar com o servidor: ", error);
            toast({
                title: "Erro ao conectar com o servidor.",
                position: "bottom-center",
                status: "error",
                duration: 2500,
                isClosable: true,
            })
        }
    };


    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center' style={{ backgroundImage: `url(${LoginBG})`, backgroundSize: 'cover' }} >
                <div className='bg-[#EBEBEB] w-[35%] h-3/4 rounded-[25px] flex justify-center'>
                    <div className='w-full h-full flex flex-col justify-center items-center'>
                        <div className='w-full flex justify-center py-4'>
                            <h1 className='text-[#000] text-5xl font-normal'>
                                EduCode
                            </h1>
                        </div>
                        <form className='w-full flex flex-col justify-center items-center gap-[30px]'>
                            <TextField
                                className='w-[65%]'
                                label="Email"
                                variant="filled"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                className='w-[65%]'
                                label="Senha"
                                variant="filled"
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <motion.button className='bg-[#3D5BAA] text-[#fff] rounded-[5px] w-1/2 py-2' onClick={handleLogin}>
                                Entrar
                            </motion.button>
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                useOneTap
                            />
                            <motion.button className='text-[#3D5BAA] bg-[#ddd] border-2 border-[#5a71ab] rounded-[5px] w-1/3 py-2'
                                onClick={() => window.location.href = '/register'}
                            >
                                Register
                            </motion.button>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}