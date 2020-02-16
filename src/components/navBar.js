
import React from 'react'
import { Toolbar, AppBar, Typography, Link } from '@material-ui/core';


function NavBar() { 
    return (
    <AppBar position="fixed" >
        <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
            <Link color='inherit' style={{textDecoration: 'none'}} href="https://expenses-tracker-app.netlify.com/">
                TM---EXPENSE
            </Link>
            </Typography>
        </Toolbar>
    </AppBar>

    )}

export default NavBar
