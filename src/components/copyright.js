import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'

function Copyright({color}) {
    return (
      <Typography variant="body2" color={color || 'textSecondary'} align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://expenses-tracker-app.netlify.com/">
          TM---EXPENSE
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default Copyright