import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { GoogleLogin } from 'react-google-login';

import { ACTION_TYPES } from '../../constants/actionTypes';
import Input from './Input';
import Icon from './Icon';

import useStyles from './styles';
import { signin, signup } from '../../actions/auth';

const Auth = () => {
    const classes = useStyles();
    const initFormData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initFormData);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history))
        }

    };

    const handleChange = (e) => {
        setFormData({ ...formData,  [e.target.name]:  e.target.value });
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const googleSucces = async (res) => {
        const result = res ? res.profileObj : undefined;
        const token = res ? res.tokenId : undefined;

        try {
            dispatch({ type: ACTION_TYPES.AUTH, data: { result, token } })
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    };

    const  googleFailure = (err) => {
        console.log(err);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">{isSignup ? "s'inscrire" : "s'identifier"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <React.Fragment>
                                    <Input name="firstName" label="Prénom" handleChange={handleChange} type="text" half />
                                    <Input name="lastName" label="Nom" handleChange={handleChange} type="text" half />
                                </React.Fragment>
                            )
                        }
                        <Input name="email" label="Adresse mail" type="email" handleChange={handleChange} />
                        <Input name="password" label="mot de passe" type={showPassword ? "text" : "password"} handleChange={handleChange} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Confirmer mot de passe" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "s'inscrire" : "s'identifier"}
                    </Button>
                    <GoogleLogin
                         clientId="478476924387-dqmtue4kuf0tgvfekvqa22fe28l0m64e.apps.googleusercontent.com"
                         render={(renderProps) => (
                             <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                 Identification Google
                             </Button>
                         )}
                         onSuccess={googleSucces}
                         onFailure={googleFailure}
                         cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Vous avez déjà un compte ? S'identifier" : "Pas encore de compte ? S'inscire"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
