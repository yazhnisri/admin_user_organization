import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ setToken }:any) => {
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async (values:any) => {
            try {
                const response = await axios.post('http://localhost:3000/auth/login', { email: values.email, password: values.password });
                if(response.data.status===true){
                    toast.success(response.data.message);
                    const token = response.data.token;
                    let userData:any =JSON.stringify(response.data.user);
                    setToken(token);
                    localStorage.setItem('token', token);//user
                    localStorage.setItem('userData', userData);//
                    history.push('/organizations');
                }
                else{
                    toast.error(response.data.message);
                }
                

                // Redirect or set state to logged in
            } catch (error) {
                console.error(error);
            }
        }
    });

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: '300px', border: '2px solid grey', padding: '20px', borderRadius: '10px' }}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        id="email"
                        name="email"
                        label="Email id"
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{ marginBottom: 1 }}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email ? String(formik.errors.email) : ''}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{ marginBottom: 1 }}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password ? String(formik.errors.password) : ''}
                    />
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                        <p>New user?  <Link to="/register" style={{ color: 'black', textDecoration: 'none' }}>Register here</Link> </p>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
