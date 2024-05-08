import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { useSignOut } from "react-auth-kit";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { motion } from 'framer-motion';

export default function Navbar() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const signOut = useSignOut();
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        signOut();
        navigate('/login');
    };

    return (
        <>
            <nav className="w-full flex justify-end py-2 fixed-top bg-[#3D5BAA]">
                <ImExit className="w-7 h-7 text-white mr-8 my-1 cursor-pointer hover:text-gray-300 transition duration-300 ease-in-out"
                    onClick={handleClickOpen}
                />
            </nav >
            <Dialog
                fullWidth
                maxWidth="xs"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Deseja realmente sair?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className='flex gap-10 px-2'>
                        <motion.button className=' text-lg' onClick={handleClose}>Cancelar</motion.button>
                        <motion.button className=' text-lg' onClick={logOut}> Sair </motion.button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    )
}