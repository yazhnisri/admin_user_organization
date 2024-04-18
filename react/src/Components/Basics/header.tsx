import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { AccountCircle, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    let userData:any = localStorage.getItem("userData");
    userData = JSON.parse(userData);
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openPopup, setOpenPopup] = useState(false);
    const [organizationData, setOrganizationData] = useState({
        name: '',
        description: '',
        location: '',
        website: '',
        phoneNumber: '',
        email: '',
        establishedYear: '',
        numberOfEmployees: '',
        isActive: true,
        user: userData?._id
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

    const handleAddOrganization = async () => {
        try {
            organizationData.user=userData._id;
            organizationData.isActive=true
            const response = await axios.post('http://localhost:3000/organization/add', organizationData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Organization added successfully:', response.data);
            setOpenPopup(false);
        } catch (error) {
            console.error('Error adding organization:', error);
        }
    };

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setOrganizationData({
            ...organizationData,
            [name]: value
        });
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
                           {userData.role == "user" && <IconButton color="inherit" onClick={handleOpenPopup}>
                                <Add />
                                <Typography variant="body2" component="span" sx={{ marginLeft: '2px' }}>Add Organization</Typography>
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
                                Hi, {userData.name}
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
        <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            onChange={handleChange}
        />
        <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            fullWidth
            onChange={handleChange}
        />
        <TextField
            margin="dense"
            id="location"
            name="location"
            label="Location"
            fullWidth
            onChange={handleChange}
        />
        <TextField
            margin="dense"
            id="website"
            name="website"
            label="Website"
            fullWidth
            onChange={handleChange}
        />
        <TextField
            margin="dense"
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            onChange={handleChange}
        />
        <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email"
            fullWidth
            onChange={handleChange}
        />
        <TextField
            margin="dense"
            id="establishedYear"
            name="establishedYear"
            label="Established Year"
            fullWidth
            onChange={handleChange}
        />
        <TextField
            margin="dense"
            id="numberOfEmployees"
            name="numberOfEmployees"
            label="Number of Employees"
            fullWidth
            onChange={handleChange}
        />
        {/* Add other fields as needed */}
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClosePopup}>Cancel</Button>
        <Button onClick={handleAddOrganization} color="primary">Add</Button>
    </DialogActions>
</Dialog>

        </AppBar>
    );
};

export default Header;
