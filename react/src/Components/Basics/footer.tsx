import React from 'react';
import { Typography, AppBar, Toolbar } from '@mui/material';

const Footer = () => {
    return (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, width: '100%', textAlign: 'center' }}>
            <Toolbar>
                <Typography variant="body2" color="textSecondary">
                   copyright © Since 2007
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
