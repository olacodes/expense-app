
import React from 'react'
import { Toolbar, AppBar, Typography } from '@material-ui/core';


function NavBar(props) {  

    return (
    <AppBar position="fixed" >
        <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
            TM---EXPENSE
            </Typography>
        </Toolbar>
    </AppBar>

    )}

export default NavBar
