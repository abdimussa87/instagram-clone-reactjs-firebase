import { Button, Input, makeStyles, Modal } from '@material-ui/core'
import React, { useState } from 'react'
import { auth } from './firebase'
import './AuthenticationModal.css'
function AuthenticationModal({ open, handleClose, signingIn }) {

    // *modalStyling
    function getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    // *states
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser =>
                authUser.user.updateProfile({ displayName: username })
            )
            .catch(err => alert(err.message));
            handleClose();
    }
    
    const signIn = (e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .catch(err=>alert(err.message));
        handleClose();
    }


    return (
        <div className='authenticationModal'>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {signingIn ?
                    (<div style={modalStyle} className={classes.paper}>
                        <center>
                            <img className='authenticationModal__logo' src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
                        </center>
                        <form className="authenticationModal__form">
                           
                            <Input
                                type='text'
                                placeholder='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                type='password'
                                placeholder='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type='submit' onClick={signIn}>Sign In</Button>
                        </form>
                    </div>) :
                    (<div style={modalStyle} className={classes.paper}>
                        <center>
                            <img className='authenticationModal__logo' src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
                        </center>
                        <form className="authenticationModal__form">
                            <Input
                                type='text'
                                placeholder='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <Input
                                type='text'
                                placeholder='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                type='password'
                                placeholder='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type='submit' onClick={signUp}>Sign Up</Button>
                        </form>
                    </div>)
                }

            </Modal>
        </div>
    )
}

export default AuthenticationModal
