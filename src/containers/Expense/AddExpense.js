import React, { useState } from 'react'

import { 
    Container, CssBaseline, 
    Avatar, Typography, 
    TextField, Box, Button
} from "@material-ui/core";

import  LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Copyright from '../../components/copyright'
import useStyles from '../LogIn/Styles'

const axios = require('axios')

function AddExpense (props)  {

  const classes = useStyles();

  const [value, setValue] = useState('')
  const [reason, setReason] = useState('')

  const handleResaon = ((e) => setReason(e.target.value))
  const handleValue = ((e) => setValue(e.target.value))

  let user_id = localStorage.getItem('user_id')
  user_id = parseInt(user_id)
  
  const handleSubmit = ((e) => {
      e.preventDefault()
      axios.post(`https://expense-prod.herokuapp.com/api/${user_id}/expense/new/`, {
        reason: reason,
        value: value
    })
    .then(function (response){
        if(response.status >= 200 && response.status < 300){            
            props.history.push('/dashboard')
        }
    })
    .catch( (error)=> console.log(error))
  })

    return ( 
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ADD EXPENSE
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} method='post'>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="value"
              label="Value"
              type='number'
              name="value"
              autoComplete="value"
              autoFocus
              value={value}
              onChange={handleValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="reason"
              label="reason"
              size= "medium"
              type='textarea'
              id="reason"
              value={reason}
              onChange={handleResaon}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
             + Expense
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
}
 
export default AddExpense;