import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'

function Copyright({color}) {
    return (
      <Typography variant="body1" color={color || 'textSecondary'} align="center" >
        {'Copyright © '}
        <Link color="inherit">
          TM---EXPENSE
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default Copyright