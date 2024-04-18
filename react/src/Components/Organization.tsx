import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { AccountCircle, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Header = () => {
    let userData:any = localStorage.getItem("userData");
    userData = JSON.parse(userData);
    console.log("userData...",userData)
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openPopup, setOpenPopup] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            location: '',
            website: '',
            phoneNumber: '',
            email: '',
            establishedYear: '',
            numberOfEmployees: '',
            isActive: true,
            user: userData._id
        },
       
      validationSchema: yup.object({
        name: yup.string().required('Name is required'),
        description: yup.string().required('Description is required'),
        location: yup.string().required('Location is required'),
        website: yup.string().url('Invalid URL').required('Website is required'),
        phoneNumber: yup.string().required('Phone Number is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        establishedYear: yup.number().required('Established Year is required'),
        numberOfEmployees: yup.number().required('Number of Employees is required'),
    }),
        
        onSubmit: async (values) => {
            try {
                await axios.post('http://localhost:3000/api/organizations', values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then((response)=>{
                  console.log('Organization added successfully:', response);
                  if(response.data.status===true){
                    console.log("ifffffff")
                  toast.success(response.data.message)
                  setOpenPopup(false);
              
                }
                else{
                  console.log("elseeeeee")
                  alert(response.data.message)
                    toast.error(response.data.message);
                }
                })
              
               
            } catch (error) {
                console.error('Error adding organization:', error);
            }
        },
    });

    const handleMenu = (event:any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        history.push('/login');
    };

    const handleHistory = () => {
        history.push('/organizations');
    };

    const handleOpenPopup = () => {
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    <Link to="/organizations" style={{ color: 'white', textDecoration: 'none' }}>
                        <img src="https://static.vecteezy.com/system/resources/previews/000/356/550/original/organization-vector-icon.jpg" alt="Organization Logo" style={{ width: '40px', marginRight: '10px' }} />
                        Organization
                    </Link>
                </Typography>
                <div>
                    {userData ? (
                        <>
                          { userData.role == "admin"&& <IconButton color="inherit" onClick={handleOpenPopup}>
                                <Add />
                                <Typography variant="body2" component="span" sx={{ marginLeft: '2px' }}>Add Organization {userData.role}</Typography>
                            </IconButton>}
                            <IconButton color="inherit" onClick={handleMenu}>
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                            >
                                <MenuItem onClick={handleHistory}>Organizations</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                            <Typography variant="body2" component="div" sx={{ display: 'inline-block', marginLeft: '5px', color: 'white', fontSize: '0.8rem' }}>
                                Hi, {userData.username}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                                <IconButton color="inherit">
                                    Login
                                </IconButton>
                            </Link>
                            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                                <IconButton color="inherit">
                                    Register
                                </IconButton>
                            </Link>
                        </>
                    )}
                </div>
            </Toolbar>
            <Dialog open={openPopup} onClose={handleClosePopup}>
                <DialogTitle>Add Organization</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="name"
                            label="Name"
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}

                            
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            name="description"
                            label="Description"
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <TextField
                            margin="dense"
                            id="location"
                            name="location"
                            label="Location"
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.location}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />
                        <TextField
                            margin="dense"
                            id="website"
                            name="website"
                            label="Website"
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.website}
                            error={formik.touched.website && Boolean(formik.errors.website)}
                            helperText={formik.touched.website && formik.errors.website}
                        />
                        <TextField
                            margin="dense"
                            id="phoneNumber"
                            name="phoneNumber"
                            type='number'
                            label="Phone Number"
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.phoneNumber}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin="dense"
                            id="establishedYear"
                            name="establishedYear"
                            label="Established Year"
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.establishedYear}
                            error={formik.touched.establishedYear && Boolean(formik.errors.establishedYear)}
                            helperText={formik.touched.establishedYear && formik.errors.establishedYear}
                        />
                        <TextField
                            margin="dense"
                            id="numberOfEmployees"
                            name="numberOfEmployees"
                            label="Number of Employees"
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.numberOfEmployees}
                            error={formik.touched.numberOfEmployees && Boolean(formik.errors.numberOfEmployees)}
                            helperText={formik.touched.numberOfEmployees && formik.errors.numberOfEmployees}
                        />
                        {/* Add other fields here */}
                        
                        <DialogActions>
                            <Button onClick={handleClosePopup}>Cancel</Button>
                            <Button type="submit" color="primary">Add</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </AppBar>
    );
};

export default Header;
