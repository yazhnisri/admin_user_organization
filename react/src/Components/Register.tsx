import React from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'user' // Default role is 'user'
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
                .required('Confirm Password is required'),
            role: Yup.string().required('Role is required')
        }),
        onSubmit: async (values) => {
            try {
                await axios.post('http://localhost:3000/auth/register', {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    role: values.role
                }
            )
            .then((reponseData)=>{
                console.log(reponseData,"reponseDatareponseData")
                if(reponseData.data.status===true){
                    toast.success(reponseData.data.message);
                    history.push('/login');

                }
                else{
                    toast.error(reponseData.data.message);
                }
            })
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
                        id="username"
                        name="username"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{ marginBottom: 1 }}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username ? String(formik.errors.username) : ''}
                    />
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
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
                    <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{ marginBottom: 1 }}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword ? String(formik.errors.confirmPassword) : ''}
                    />
                    <TextField
                        id="role"
                        name="role"
                        select
                        label="Role"
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{ marginBottom: 1 }}
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        error={formik.touched.role && Boolean(formik.errors.role)}
                        helperText={formik.touched.role && formik.errors.role ? String(formik.errors.role) : ''}
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </TextField>
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Register
                        </Button>
                        <p>Existing user? <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>Login here</Link></p>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Register;
